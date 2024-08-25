此目录存放课堂作业，可以在此文件添加作作业思路和对题目的看法

### Ajax与axios库

#### URL
**URL:** 统一资源定位符，简称网址
**组成：** 协议：/域名/资源路径，例如：https:/www.baidu.com/api

#### XMLHttpRequest原理
**XHR对象：** 用于与服务器交互，axios底层也是封装后的XMLHttpRequest对象
**作用：** 简化代码体积
```js
const xhr = new XMLHttpRequest()
xhr.open(method, url)
xhr.addEventListener('loadend' () => {
    const response = xhr.response // 服务器返回的响应
})
// 发起请求
xhr.send()
```

