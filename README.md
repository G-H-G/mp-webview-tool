# mp-webview-tool

适用于需要在微信小程序中展示的移动端页面，提供返回小程序首页按钮、向小程序传参等方法

## 安装

```bash
npm i -S mp-webview-tool
```

## 使用

```javascript
const mpWebviewTool = require('mp-webview-tool');

mpWebviewTool.init({
    message: {
        // 向小程序传参，如自定义页面分享标题
        title: 'Title'
    },
    style: {
        // 返回首页按钮z-index
        zIndex: 999
    },
    path: '/pages/index/main' // 小程序首页路径
});
```

## 参数

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|[`message`](#message)|`Object`|`undefined`|向小程序传递的参数|
|`style`|`Object`|`undefined`|返回首页按钮样式|
|`path`|`String`|`'/pages/index/main'`|小程序首页路径|
|`pathType`|`String`|`'tab'`|小程序首页类型：`{'tab'|'page'}`，分别表示 tabBar 页面和非 tabBar 页面|

### `message`
当`message`不为空时，通过`wx.miniProgram.postMessage`向小程序传递`message`，可用作分享标题自定义等

> 参见[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)
