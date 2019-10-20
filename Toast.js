// import { PopupMixin } from './Popup';
export default {
  // mixins: [PopupMixin],
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
  render () {
    let { show, message, mask } = this
    this.className = this.type === 'text' ? 'iv-toast-' + this.type : ''
    let isLoading = this.type === 'loading'
    return (
      <transition name="iv-fade">
        <div v-show={show}>
          <div v-show={isLoading && mask} class="iv-overlay"></div>
          <div class={'iv-toast ' + this.className}>
            <div>
              <span v-show={isLoading} class="circularBox">
                <svg viewBox="25 25 50 50" class="circular">
                  <circle style="stroke:#fff;" cx="50" cy="50" r="20" fill="none" class="path"></circle>
                </svg>
              </span>
            </div>
            <span class="iv-toast__text">{message}</span>
          </div>
        </div>
      </transition>
    )
  }
}