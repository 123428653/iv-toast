"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// import toast from './Toast'
// import './index.css'
var Toast = {};
var instance;
var timer = null;

Toast.install = function (Vue) {
  var $Toast = function $Toast(options) {
    if (!instance) {
      instance = new (Vue.extend({
        data: function data() {
          return {
            message: '',
            show: false,
            type: '',
            className: '',
            mask: true,
            closed: function closed() {}
          };
        },
        render: function render(h) {
          var show = this.show,
              message = this.message,
              mask = this.mask;
          this.className = this.type === 'text' ? 'iv-toast-' + this.type : '';
          var isLoading = this.type === 'loading';
          return h('transition', {
            attrs: {
              name: 'iv-fade'
            }
          }, [h('div', {
            directives: [{
              name: 'show',
              value: show
            }]
          }, [h('div', {
            directives: [{
              name: 'show',
              value: isLoading && mask
            }],
            attrs: {
              "class": 'iv-overlay'
            }
          }), h('div', {
            "class": ['iv-toast', this.className]
          }, [h('div', {}, [h('span', {
            directives: [{
              name: 'show',
              value: isLoading
            }],
            "class": 'circularBox'
          }, [h('svg', {
            attrs: {
              'viewBox': '25 25 50 50',
              "class": 'circular'
            }
          }, [h('circle', {
            attrs: {
              style: 'stroke:#ffff',
              cx: "50",
              cy: "50",
              r: "20",
              fill: "none",
              "class": "path"
            }
          })])])]), h('span', {
            "class": 'iv-toast__text',
            domProps: {
              innerHTML: message
            }
          })])])]);
        }
      }))();
      document.body.appendChild(instance.$mount().$el);
    }

    if (timer) {
      clearTimeout(timer);
      timer = null;
      instance.show = false;
    }

    var time = 3000;
    var isObj = Object.prototype.toString.call(options) === '[object Object]' && options !== null;

    if (typeof options === 'string') {
      instance.message = options;
      instance.type = 'text';
    } else if (isObj) {
      var message = options.message,
          duration = options.duration,
          type = options.type,
          mask = options.mask,
          closed = options.closed;
      console.log(mask);
      instance.type = type || 'text';
      instance.message = message;

      instance.closed = closed || function () {};

      instance.mask = typeof mask !== 'undefined' ? mask : instance.mask;
      time = duration || 3000;
    } else {
      return;
    } // instance.openOverlay()


    instance.show = true;

    if (options.duration == 0) {} else {
      timer = setTimeout(function () {
        _close();
      }, time);
    }

    instance.close = function () {
      _close();
    };

    function _close() {
      instance.show = false;
      clearTimeout(timer);
      timer = null;
      instance.closed();

      instance.closed = function () {};
    }

    return instance;
  };

  Vue.prototype.$toast = $Toast;
};

var _default = Toast;
exports["default"] = _default;