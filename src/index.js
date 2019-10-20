// import toast from './Toast'
// import './index.css'
const Toast = { }
let instance
let timer = null

Toast.install = (Vue) => {
  let $Toast = (options) => {
    
    if (!instance) {
      instance = new (Vue.extend({
        data () {
          return {
            message: '',
            show: false,
            type: '',
            className: '',
            mask: true,
            closed: function () {}
          }
        },
        render (h) {
          let { show, message, mask } = this
          this.className = this.type === 'text' ? 'iv-toast-' + this.type : ''
          let isLoading = this.type === 'loading'
          return h('transition', {
            attrs: {name: 'iv-fade'}
          },[
            h('div',{
              directives:[ {
                name: 'show',
                value: show
              }]
            },[
              h('div', {
                directives:[ {
                  name: 'show',
                  value: isLoading && mask
                }],
                attrs: {
                  class: 'iv-overlay'
                }
              }),
              h('div', {
                class: ['iv-toast', this.className]
              },[
                h('div',{}, [
                  h('span', {
                    directives:[ {
                      name: 'show',
                      value: isLoading
                    }],
                    class: 'circularBox'
                  },[
                    h('svg', {
                      attrs: {
                        'viewBox': '25 25 50 50',
                        class: 'circular'
                      }
                    },[
                      h('circle', {
                        attrs: {
                          style: 'stroke:#ffff',
                          cx: "50",
                          cy: "50",
                          r: "20",
                          fill: "none",
                          class: "path"
                        }
                      })
                    ])
                  ])
                ]),
                h('span', {
                  class: 'iv-toast__text',
                  domProps: {
                    innerHTML: message
                  }
                })
              ])
            ])
          ])
        }
      }))()
      document.body.appendChild(instance.$mount().$el)
    }
    
    if (timer) {
      clearTimeout(timer)
      timer = null
      instance.show = false
    }
  
    let time = 3000
    let isObj = Object.prototype.toString.call(options) === '[object Object]' && options !== null
    if (typeof options === 'string') {
      instance.message = options
      instance.type = 'text'
    } else if (isObj) {
      let {message, duration, type, mask, closed} = options
      console.log(mask)
      instance.type = type || 'text'
      instance.message = message
      instance.closed = closed || function () {}
      instance.mask = typeof mask !== 'undefined' ? mask : instance.mask
      time = duration || 3000
    } else {
      return
    }
    // instance.openOverlay()
    instance.show = true
    if (options.duration == 0) {
    } else {
      timer = setTimeout(() => {
        _close()
      }, time)
    }
    

    instance.close = function () {
      _close()
    }

    function _close () {
      instance.show = false
      clearTimeout(timer)
      timer = null
      instance.closed()
      instance.closed = function () {}
    }
    
    return instance
  }
  Vue.prototype.$toast = $Toast
}

export default Toast