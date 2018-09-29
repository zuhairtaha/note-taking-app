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
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };
  $.fn.reverse = [].reverse;
  /**
   * @class
   *
   */

  var FloatingActionButton =
  /*#__PURE__*/
  function (_Component) {
    _inherits(FloatingActionButton, _Component);

    /**
     * Construct FloatingActionButton instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FloatingActionButton(el, options) {
      var _this;

      _classCallCheck(this, FloatingActionButton);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FloatingActionButton).call(this, FloatingActionButton, el, options));
      _this.el.M_FloatingActionButton = _assertThisInitialized(_assertThisInitialized(_this));
      /**
       * Options for the fab
       * @member FloatingActionButton#options
       * @prop {Boolean} [direction] - Direction fab menu opens
       * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
       * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
       */

      _this.options = $.extend({}, FloatingActionButton.defaults, options);
      _this.isOpen = false;
      _this.$anchor = _this.$el.children('a').first();
      _this.$menu = _this.$el.children('ul').first();
      _this.$floatingBtns = _this.$el.find('ul .btn-floating');
      _this.$floatingBtnsReverse = _this.$el.find('ul .btn-floating').reverse();
      _this.offsetY = 0;
      _this.offsetX = 0;

      _this.$el.addClass("direction-".concat(_this.options.direction));

      if (_this.options.direction === 'top') {
        _this.offsetY = 40;
      } else if (_this.options.direction === 'right') {
        _this.offsetX = -40;
      } else if (_this.options.direction === 'bottom') {
        _this.offsetY = -40;
      } else {
        _this.offsetX = 40;
      }

      _this._setupEventHandlers();

      return _this;
    }

    _createClass(FloatingActionButton, [{
      key: "destroy",

      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();

        this.el.M_FloatingActionButton = undefined;
      }
      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);

        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener('mouseenter', this._handleOpenBound);
          this.el.addEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.addEventListener('click', this._handleFABClickBound);
        }
      }
      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener('mouseenter', this._handleOpenBound);
          this.el.removeEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.removeEventListener('click', this._handleFABClickBound);
        }
      }
      /**
       * Handle FAB Click
       */

    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
      /**
       * Handle Document Click
       * @param {Event} e
       */

    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(this.$menu).length) {
          this.close();
        }
      }
      /**
       * Open FAB
       */

    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }

        this.isOpen = true;
      }
      /**
       * Close FAB
       */

    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }

        if (this.options.toolbarEnabled) {
          window.removeEventListener('scroll', this._handleCloseBound, true);
          document.body.removeEventListener('click', this._handleDocumentClickBound, true);

          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }

        this.isOpen = false;
      }
      /**
       * Classic FAB Menu open
       */

    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        var _this2 = this;

        this.$el.addClass('active');
        var time = 0;
        this.$floatingBtnsReverse.each(function (el) {
          anim({
            targets: el,
            opacity: 1,
            scale: [0.4, 1],
            translateY: [_this2.offsetY, 0],
            translateX: [_this2.offsetX, 0],
            duration: 275,
            delay: time,
            easing: 'easeInOutQuad'
          });
          time += 40;
        });
      }
      /**
       * Classic FAB Menu close
       */

    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        var _this3 = this;

        this.$floatingBtnsReverse.each(function (el) {
          anim.remove(el);
          anim({
            targets: el,
            opacity: 0,
            scale: 0.4,
            translateY: _this3.offsetY,
            translateX: _this3.offsetX,
            duration: 175,
            easing: 'easeOutQuad',
            complete: function complete() {
              _this3.$el.removeClass('active');
            }
          });
        });
      }
      /**
       * Toolbar transition Menu open
       */

    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this4 = this;

        var scaleFactor;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $('<div class="fab-backdrop"></div>');
        var fabColor = this.$anchor.css('background-color');
        this.$anchor.append(backdrop);
        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width; // Set initial state

        this.$el.addClass('active');
        this.$el.css({
          'text-align': 'center',
          width: '100%',
          bottom: 0,
          left: 0,
          transform: 'translateX(' + this.offsetX + 'px)',
          transition: 'none'
        });
        this.$anchor.css({
          transform: 'translateY(' + -this.offsetY + 'px)',
          transition: 'none'
        });
        backdrop.css({
          'background-color': fabColor
        });
        setTimeout(function () {
          _this4.$el.css({
            transform: '',
            transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
          });

          _this4.$anchor.css({
            overflow: 'visible',
            transform: '',
            transition: 'transform .2s'
          });

          setTimeout(function () {
            _this4.$el.css({
              overflow: 'hidden',
              'background-color': fabColor
            });

            backdrop.css({
              transform: 'scale(' + scaleFactor + ')',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });

            _this4.$menu.children('li').children('a').css({
              opacity: 1
            }); // Scroll to close.


            _this4._handleDocumentClickBound = _this4._handleDocumentClick.bind(_this4);
            window.addEventListener('scroll', _this4._handleCloseBound, true);
            document.body.addEventListener('click', _this4._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }
      /**
       * Toolbar transition Menu close
       */

    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this5 = this;

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find('.fab-backdrop');
        var fabColor = this.$anchor.css('background-color');
        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom; // Hide backdrop

        this.$el.removeClass('active');
        this.$el.css({
          'background-color': 'transparent',
          transition: 'none'
        });
        this.$anchor.css({
          transition: 'none'
        });
        backdrop.css({
          transform: 'scale(0)',
          'background-color': fabColor
        });
        this.$menu.children('li').children('a').css({
          opacity: ''
        });
        setTimeout(function () {
          backdrop.remove(); // Set initial state.

          _this5.$el.css({
            'text-align': '',
            width: '',
            bottom: '',
            left: '',
            overflow: '',
            'background-color': '',
            transform: 'translate3d(' + -_this5.offsetX + 'px,0,0)'
          });

          _this5.$anchor.css({
            overflow: '',
            transform: 'translate3d(0,' + _this5.offsetY + 'px,0)'
          });

          setTimeout(function () {
            _this5.$el.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s'
            });

            _this5.$anchor.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(_getPrototypeOf(FloatingActionButton), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function get() {
        return _defaults;
      }
    }]);

    return FloatingActionButton;
  }(Component);

  M.FloatingActionButton = FloatingActionButton;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }
})(cash, M.anime);