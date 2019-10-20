## 引入

#### 在main.js中引入
```js
import Vue from 'vue'
import 'iv-toast/lib/index.css'
import Toast from 'iv-toast'

VUe.use(Toast)
```

#### app.vue
```html
<template>
  <div class="app">
      <div class="nav">
        <a href="javascript:;" @click="text">普通文字提示</a>
        <a href="javascript:;" @click="loading">Loading</a>
        <a href="javascript:;" @click="open('带回调方法')">Toast</a>
        <a href="javascript:;" @click="close">手动隐藏Toast</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toast: null
    }
  },
  methods: {
    text () {
      // 普通调用
      this.toast = this.$toast('普通文字提示')
    },
    loading () {
      // Loading提示，永不关闭
      this.toast = this.$toast({
        type: 'loading',
        duration: 0,
        mask: false,
        message: 'Loading...'
      })
    },
    openText (msg) {
      // 携带参数的文字提示
      this.toast = this.$toast({
        type: 'text',
        message: msg,
        closed: function(){
          // 关闭后回调
          console.log('关闭完成')
        }
      })
    },
    close () {
      // 手动关闭提示弹窗
      this.toast && this.toast.close()
      this.toast = null
    }
  }
}
</script>
```


## API

#### 提供两个方法

1. Toast          // 主方法
2. Toast.close    // 关闭提示方法


## Options

|   参数    | 说明                        |  类型        |  默认值  |
|  :----   | :-----                      | :-----      |  :----   |
| type     | 提示类型,可选 loading / text  |  string     |   text
| message  | 提示内容                     |  string      |  -
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 |  number    |  3000
| mask     | 是否显示背景遮罩层             |  boolean    |  false
| closed   | 关闭后回调方法                |  Function    |  -
