"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

(function ($, anim) {
  'use strict';

  var _defaults = {
    throttle: 100,
    scrollOffset: 200,
    // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function getActiveElement(id) {
      return 'a[href="#' + id + '"]';
    }
  };
  /**
   * @class
   *
   */

  var ScrollSpy =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ScrollSpy, _Component);

    /**
     * Construct ScrollSpy instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function ScrollSpy(el, options) {
      var _this;

      _classCallCheck(this, ScrollSpy);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollSpy).call(this, ScrollSpy, el, options));
      _this.el.M_ScrollSpy = _assertThisInitialized(_assertThisInitialized(_this));
      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [throttle=100] - Throttle of scroll handler
       * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
       * @prop {String} [activeClass='active'] - Class applied to active elements
       * @prop {Function} [getActiveElement] - Used to find active element
       */

      _this.options = $.extend({}, ScrollSpy.defaults, options); // setup

      ScrollSpy._elements.push(_assertThisInitialized(_assertThisInitialized(_this)));

      ScrollSpy._count++;
      ScrollSpy._increment++;
      _this.tickId = -1;
      _this.id = ScrollSpy._increment;

      _this._setupEventHandlers();

      _this._handleWindowScroll();

      return _this;
    }

    _createClass(ScrollSpy, [{
      key: "destroy",

      /**
       * Teardown component
       */
      value: function destroy() {
        ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);

        ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);

        ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);

        ScrollSpy._count--;

        this._removeEventHandlers();

        $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = undefined;
      }
      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);

        if (ScrollSpy._count === 1) {
          window.addEventListener('scroll', this._handleWindowScrollBound);
          window.addEventListener('resize', this._handleThrottledResizeBound);
          document.body.addEventListener('click', this._handleTriggerClick);
        }
      }
      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy._count === 0) {
          window.removeEventListener('scroll', this._handleWindowScrollBound);
          window.removeEventListener('resize', this._handleThrottledResizeBound);
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
      }
      /**
       * Handle Trigger Click
       * @param {Event} e
       */

    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target);

        for (var i = ScrollSpy._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy._elements[i];

          if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;
            anim({
              targets: [document.documentElement, document.body],
              scrollTop: offset - scrollspy.options.scrollOffset,
              duration: 400,
              easing: 'easeOutCubic'
            });
            break;
          }
        }
      }
      /**
       * Handle Window Scroll
       */

    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        // unique tick id
        ScrollSpy._ticks++; // viewport rectangle

        var top = M.getDocumentScrollTop(),
            left = M.getDocumentScrollLeft(),
            right = left + window.innerWidth,
            bottom = top + window.innerHeight; // determine which elements are in view

        var intersections = ScrollSpy._findElements(top, right, bottom, left);

        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;

          if (lastTick < 0) {
            // entered into view
            scrollspy._enter();
          } // update tick id


          scrollspy.tickId = ScrollSpy._ticks;
        }

        for (var _i = 0; _i < ScrollSpy._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;

          if (_lastTick >= 0 && _lastTick !== ScrollSpy._ticks) {
            // exited from view
            _scrollspy._exit();

            _scrollspy.tickId = -1;
          }
        } // remember elements in view for next tick


        ScrollSpy._elementsInView = intersections;
      }
      /**
       * Find elements that are within the boundary
       * @param {number} top
       * @param {number} right
       * @param {number} bottom
       * @param {number} left
       * @return {Array.<ScrollSpy>}   A collection of elements
       */

    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);

          if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }

        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this2 = this;

        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });

        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
          ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (el) {
            return el.attr('id') != _this2.$el.attr('id');
          });

          if (ScrollSpy._visibleElements[0]) {
            // Check if empty
            $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(_getPrototypeOf(ScrollSpy), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];

        for (var i = 0; i < ScrollSpy._elements.length; i++) {
          var scrollspy = ScrollSpy._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;

          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top,
                elLeft = scrollspy.$el.offset().left,
                elRight = elLeft + scrollspy.$el.width(),
                elBottom = elTop + scrollspy.$el.height();
            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);

            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }

        return hits;
      }
    }, {
      key: "defaults",
      get: function get() {
        return _defaults;
      }
    }]);

    return ScrollSpy;
  }(Component);
  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */


  ScrollSpy._elements = [];
  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */

  ScrollSpy._elementsInView = [];
  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<cash>}
   */

  ScrollSpy._visibleElements = [];
  /**
   * @static
   * @memberof ScrollSpy
   */

  ScrollSpy._count = 0;
  /**
   * @static
   * @memberof ScrollSpy
   */

  ScrollSpy._increment = 0;
  /**
   * @static
   * @memberof ScrollSpy
   */

  ScrollSpy._ticks = 0;
  M.ScrollSpy = ScrollSpy;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }
})(cash, M.anime);