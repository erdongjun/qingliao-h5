# Layout H5布局容器

`0.0.1`

## 何处使用

H5客户端迭代。

### 处理的问题

- Body Max Width
- Rem Layout
- fetch
- babel-polyfill
- viewport-units-buggyfill
- es6-promise
- whatwg-fetch
- Fastclick
- Viewport Fix ([Viewport Units Buggyfill](https://github.com/rodneyrehm/viewport-units-buggyfill))

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bodyMaxWidth | body 最大宽度 (px) | Number | 425 |
| designWidth | 设计稿宽度 (px)| Number | 750 |

### 如何使用

```bash
import Layout from '@components/Layout'

// 自定义页面最大宽度以及设计图宽度

const layoutArgs = {
  bodyMaxWidth: 425,
  designWidth: 750,
}

...

 <Layout {...layoutArgs} />

...

```