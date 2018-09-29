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

(function ($) {
  'use strict';

  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };
  /**
   * @class
   *
   */

  var Pushpin =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Pushpin, _Component);

    /**
     * Construct Pushpin instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function Pushpin(el, options) {
      var _this;

      _classCallCheck(this, Pushpin);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Pushpin).call(this, Pushpin, el, options));
      _this.el.M_Pushpin = _assertThisInitialized(_assertThisInitialized(_this));
      /**
       * Options for the modal
       * @member Pushpin#options
       */

      _this.options = $.extend({}, Pushpin.defaults, options);
      _this.originalOffset = _this.el.offsetTop;

      Pushpin._pushpins.push(_assertThisInitialized(_assertThisInitialized(_this)));

      _this._setupEventHandlers();

      _this._updatePosition();

      return _this;
    }

    _createClass(Pushpin, [{
      key: "destroy",

      /**
       * Teardown component
       */
      value: function destroy() {
        this.el.style.top = null;

        this._removePinClasses();

        this._removeEventHandlers(); // Remove pushpin Inst


        var index = Pushpin._pushpins.indexOf(this);

        Pushpin._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;

        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains('pinned')) {
          this._removePinClasses();

          this.el.style.top = "".concat(this.options.offset, "px");
          this.el.classList.add('pinned'); // onPositionChange callback

          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pinned');
          }
        } // Add pin-top (when scrolled position is above top)


        if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
          this._removePinClasses();

          this.el.style.top = 0;
          this.el.classList.add('pin-top'); // onPositionChange callback

          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-top');
          }
        } // Add pin-bottom (when scrolled position is below bottom)


        if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
          this._removePinClasses();

          this.el.classList.add('pin-bottom');
          this.el.style.top = "".concat(this.options.bottom - this.originalOffset, "px"); // onPositionChange callback

          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-bottom');
          }
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        // IE 11 bug (can't remove multiple classes in one line)
        this.el.classList.remove('pin-top');
        this.el.classList.remove('pinned');
        this.el.classList.remove('pin-bottom');
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(_getPrototypeOf(Pushpin), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin._pushpins) {
          var pInstance = Pushpin._pushpins[elIndex];

          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function get() {
        return _defaults;
      }
    }]);

    return Pushpin;
  }(Component);
  /**
   * @static
   * @memberof Pushpin
   */


  Pushpin._pushpins = [];
  M.Pushpin = Pushpin;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }
})(cash);