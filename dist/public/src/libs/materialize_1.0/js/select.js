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
    classes: '',
    dropdownOptions: {}
  };
  /**
   * @class
   *
   */

  var FormSelect =
  /*#__PURE__*/
  function (_Component) {
    _inherits(FormSelect, _Component);

    /**
     * Construct FormSelect instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    function FormSelect(el, options) {
      var _this;

      _classCallCheck(this, FormSelect);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FormSelect).call(this, FormSelect, el, options)); // Don't init if browser default version

      if (_this.$el.hasClass('browser-default')) {
        return _possibleConstructorReturn(_this);
      }

      _this.el.M_FormSelect = _assertThisInitialized(_assertThisInitialized(_this));
      /**
       * Options for the select
       * @member FormSelect#options
       */

      _this.options = $.extend({}, FormSelect.defaults, options);
      _this.isMultiple = _this.$el.prop('multiple'); // Setup

      _this.el.tabIndex = -1;
      _this._keysSelected = {};
      _this._valueDict = {}; // Maps key to original and generated option element.

      _this._setupDropdown();

      _this._setupEventHandlers();

      return _this;
    }

    _createClass(FormSelect, [{
      key: "destroy",

      /**
       * Teardown component
       */
      value: function destroy() {
        this._removeEventHandlers();

        this._removeDropdown();

        this.el.M_FormSelect = undefined;
      }
      /**
       * Setup Event Handlers
       */

    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this2 = this;

        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.addEventListener('click', _this2._handleOptionClickBound);
        });
        this.el.addEventListener('change', this._handleSelectChangeBound);
        this.input.addEventListener('click', this._handleInputClickBound);
      }
      /**
       * Remove Event Handlers
       */

    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this3 = this;

        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.removeEventListener('click', _this3._handleOptionClickBound);
        });
        this.el.removeEventListener('change', this._handleSelectChangeBound);
        this.input.removeEventListener('click', this._handleInputClickBound);
      }
      /**
       * Handle Select Change
       * @param {Event} e
       */

    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }
      /**
       * Handle Option Click
       * @param {Event} e
       */

    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest('li')[0];
        var key = option.id;

        if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup') && key.length) {
          var selected = true;

          if (this.isMultiple) {
            // Deselect placeholder option if still selected.
            var placeholderOption = $(this.dropdownOptions).find('li.disabled.selected');

            if (placeholderOption.length) {
              placeholderOption.removeClass('selected');
              placeholderOption.find('input[type="checkbox"]').prop('checked', false);

              this._toggleEntryFromArray(placeholderOption[0].id);
            }

            selected = this._toggleEntryFromArray(key);
          } else {
            $(this.dropdownOptions).find('li').removeClass('selected');
            $(option).toggleClass('selected', selected);
          } // Set selected on original select option
          // Only trigger if selected state changed


          var prevSelected = $(this._valueDict[key].el).prop('selected');

          if (prevSelected !== selected) {
            $(this._valueDict[key].el).prop('selected', selected);
            this.$el.trigger('change');
          }
        }

        e.stopPropagation();
      }
      /**
       * Handle Input Click
       */

    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();

          this._setSelectedStates();
        }
      }
      /**
       * Setup dropdown
       */

    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this4 = this;

        this.wrapper = document.createElement('div');
        $(this.wrapper).addClass('select-wrapper ' + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);

        if (this.el.disabled) {
          this.wrapper.classList.add('disabled');
        } // Create dropdown


        this.$selectOptions = this.$el.children('option, optgroup');
        this.dropdownOptions = document.createElement('ul');
        this.dropdownOptions.id = "select-options-".concat(M.guid());
        $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : '')); // Create dropdown structure.

        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is('option')) {
              // Direct descendant option.
              var optionEl;

              if (_this4.isMultiple) {
                optionEl = _this4._appendOptionWithIcon(_this4.$el, el, 'multiple');
              } else {
                optionEl = _this4._appendOptionWithIcon(_this4.$el, el);
              }

              _this4._addOptionToValueDict(el, optionEl);
            } else if ($(el).is('optgroup')) {
              // Optgroup.
              var selectOptions = $(el).children('option');
              $(_this4.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);
              selectOptions.each(function (el) {
                var optionEl = _this4._appendOptionWithIcon(_this4.$el, el, 'optgroup-option');

                _this4._addOptionToValueDict(el, optionEl);
              });
            }
          });
        }

        this.$el.after(this.dropdownOptions); // Add input dropdown

        this.input = document.createElement('input');
        $(this.input).addClass('select-dropdown dropdown-trigger');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', 'true');
        this.input.setAttribute('data-target', this.dropdownOptions.id);

        if (this.el.disabled) {
          $(this.input).prop('disabled', 'true');
        }

        this.$el.before(this.input);

        this._setValueToInput(); // Add caret


        var dropdownIcon = $('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]); // Initialize dropdown

        if (!this.el.disabled) {
          var dropdownOptions = $.extend({}, this.options.dropdownOptions); // Add callback for centering selected option when dropdown content is scrollable

          dropdownOptions.onOpenEnd = function (el) {
            var selectedOption = $(_this4.dropdownOptions).find('.selected').first();

            if (selectedOption.length) {
              // Focus selected option in dropdown
              M.keyDown = true;
              _this4.dropdown.focusedIndex = selectedOption.index();

              _this4.dropdown._focusFocusedItem();

              M.keyDown = false; // Handle scrolling to selected option

              if (_this4.dropdown.isScrollable) {
                var scrollOffset = selectedOption[0].getBoundingClientRect().top - _this4.dropdownOptions.getBoundingClientRect().top; // scroll to selected option


                scrollOffset -= _this4.dropdownOptions.clientHeight / 2; // center in dropdown

                _this4.dropdownOptions.scrollTop = scrollOffset;
              }
            }
          };

          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }

          this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
        } // Add initial selections


        this._setSelectedStates();
      }
      /**
       * Add option to value dict
       * @param {Element} el  original option element
       * @param {Element} optionEl  generated option element
       */

    }, {
      key: "_addOptionToValueDict",
      value: function _addOptionToValueDict(el, optionEl) {
        var index = Object.keys(this._valueDict).length;
        var key = this.dropdownOptions.id + index;
        var obj = {};
        optionEl.id = key;
        obj.el = el;
        obj.optionEl = optionEl;
        this._valueDict[key] = obj;
      }
      /**
       * Remove dropdown
       */

    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $(this.wrapper).find('.caret').remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }
      /**
       * Setup dropdown
       * @param {Element} select  select element
       * @param {Element} option  option element from select
       * @param {String} type
       * @return {Element}  option element added
       */

    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.disabled ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = this.isMultiple ? "<label><input type=\"checkbox\"".concat(disabledClass, "\"/><span>").concat(option.innerHTML, "</span></label>") : option.innerHTML;
        var liEl = $('<li></li>');
        var spanEl = $('<span></span>');
        spanEl.html(multipleCheckbox);
        liEl.addClass("".concat(disabledClass, " ").concat(optgroupClass));
        liEl.append(spanEl); // add icons

        var iconUrl = option.getAttribute('data-icon');

        if (!!iconUrl) {
          var imgEl = $("<img alt=\"\" src=\"".concat(iconUrl, "\">"));
          liEl.prepend(imgEl);
        } // Check for multiple type.


        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }
      /**
       * Toggle entry from option
       * @param {String} key  Option key
       * @return {Boolean}  if entry was added or removed
       */

    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(key) {
        var notAdded = !this._keysSelected.hasOwnProperty(key);
        var $optionLi = $(this._valueDict[key].optionEl);

        if (notAdded) {
          this._keysSelected[key] = true;
        } else {
          delete this._keysSelected[key];
        }

        $optionLi.toggleClass('selected', notAdded); // Set checkbox checked value

        $optionLi.find('input[type="checkbox"]').prop('checked', notAdded); // use notAdded instead of true (to detect if the option is selected or not)

        $optionLi.prop('selected', notAdded);
        return notAdded;
      }
      /**
       * Set text value to input
       */

    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var values = [];
        var options = this.$el.find('option');
        options.each(function (el) {
          if ($(el).prop('selected')) {
            var text = $(el).text();
            values.push(text);
          }
        });

        if (!values.length) {
          var firstDisabled = this.$el.find('option:disabled').eq(0);

          if (firstDisabled.length && firstDisabled[0].value === '') {
            values.push(firstDisabled.text());
          }
        }

        this.input.value = values.join(', ');
      }
      /**
       * Set selected state of dropdown to match actual select element
       */

    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        this._keysSelected = {};

        for (var key in this._valueDict) {
          var option = this._valueDict[key];
          var optionIsSelected = $(option.el).prop('selected');
          $(option.optionEl).find('input[type="checkbox"]').prop('checked', optionIsSelected);

          if (optionIsSelected) {
            this._activateOption($(this.dropdownOptions), $(option.optionEl));

            this._keysSelected[key] = true;
          } else {
            $(option.optionEl).removeClass('selected');
          }
        }
      }
      /**
       * Make option as selected and scroll to selected position
       * @param {jQuery} collection  Select options jQuery element
       * @param {Element} newOption  element of the new option
       */

    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find('li.selected').removeClass('selected');
          }

          var option = $(newOption);
          option.addClass('selected');
        }
      }
      /**
       * Get Selected Values
       * @return {Array}  Array of selected values
       */

    }, {
      key: "getSelectedValues",
      value: function getSelectedValues() {
        var selectedValues = [];

        for (var key in this._keysSelected) {
          selectedValues.push(this._valueDict[key].el.value);
        }

        return selectedValues;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(_getPrototypeOf(FormSelect), "init", this).call(this, this, els, options);
      }
      /**
       * Get Instance
       */

    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FormSelect;
      }
    }, {
      key: "defaults",
      get: function get() {
        return _defaults;
      }
    }]);

    return FormSelect;
  }(Component);

  M.FormSelect = FormSelect;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, 'formSelect', 'M_FormSelect');
  }
})(cash);