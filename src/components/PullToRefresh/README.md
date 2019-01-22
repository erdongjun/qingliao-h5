# PullToRefresh 下拉刷新以及上拉加载组件

`0.0.1`

## 未来

- 支持加载图标 ❌
- 修复微信浏览器下拉问题 ✅

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| lan | 语言文案 | Object | `{ refreshing: '正在刷新', refresh: '松手即刷新', nomore: '没有更多了' , loading: '努力加载中...' }` |
| onRefresh | 下拉刷新后的回调函数  | Function（Promise函数）看例子 | null |
| onLoadData | 上拉加载分页数据回调函数  | Function（Promise函数）看例子 | null |
| onScroll | 监听滚动时滚动条高度 top参数 代表当前滚动条高度 | Function 看例子 | null |

### 如何使用

如果`onRefresh or onLoadData `未设置对应的回调函数 则无法使用该组件对应的功能

```bash
import Layout from '@components/PullToRefresh'

// 语言文案参数

const lan = { refreshing: '正在刷新', refresh: '松手即刷新', nomore: '没有更多了' }

...

// 模拟接口请求
handlePromise() {
  console.log('开始请求数据')
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('请求数据完毕')
      resolve({ code: 200 })
    }, 2000)
  })
}

handleRefresh() {
  return new Promise(resolve => {
    this.handlePromise().then(res => {
      console.log(res)
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

// 滚动回调  top 距顶部的距离
handleScroll(top) {
  console.log(top)
}

...

<PullToRefresh onRefresh={this.handleRefresh}  onLoadData={this.handleRefresh}  onScroll={this.handleScroll}   lan={lan}>
  children
</PullToRefresh>

...

```
