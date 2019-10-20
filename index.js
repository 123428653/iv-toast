import toast from './Toast.js'
import './index.css'
const Toast = { }
let instance
let timer = null

Toast.install = (Vue) => {
  let $Toast = (options) => {
    
    if (!instance) {
      instance = new (Vue.extend(toast))()
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
      let {message, duration, type, mask} = options
      instance.type = type || 'text'
      instance.message = message
      instance.closed = closed || function () {}
      instance.mask = mask || true
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
    }
    
    return instance
  }
  Vue.prototype.$toast = $Toast
}

export default Toast