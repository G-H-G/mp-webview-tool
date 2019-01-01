require('./index.css');
const wx = require('weixin-js-sdk');
const template = require('./template.html');
const UaAdapt = require('../util/ua-adapt.js');

// 小程序嵌套定制化
const mpWebviewTool = {
    config: {},
    bindBackHome: function (config) {
        var div = document.createElement('div');
        div.innerHTML = template;
        const target = div.firstChild;
        document.body.appendChild(target);
        var homePath = config.path || '/pages/index/main';
        var pathType = config.pathType || 'tab';
        setTimeout(function () {
            var btnBack = document.querySelector('.component-mp-webview-tool [node-type="btn-mp-back"]');
            // HACK: 华为P9、MATE7 虚拟键挡住部分内容
            var ua = UaAdapt.getUA();
            if (UaAdapt.isAndroid(ua) && UaAdapt.isHuawei(ua)) {
                btnBack.classList.add('hack-huawei');
            }
            if (config.style) {
                var styleKey;
                for (styleKey in config.style) {
                    if (config.style.hasOwnProperty(styleKey)) {
                        btnBack.style[styleKey] = config.style[styleKey];
                    }
                }
            }
            btnBack.classList.remove('hide');
            btnBack.addEventListener('click', function (e) {
                if (pathType === 'tab') {
                    wx.miniProgram.switchTab({
                        url: homePath
                    });
                } else if (pathType === 'page') {
                    wx.miniProgram.navigateTo({
                        url: homePath
                    });
                }
            });
        }, 300);
    },
    postMessage: function (message) {
        wx.miniProgram.postMessage({
            data: message
        });
    },
    mpCustom: function () {
        if (window.__wxjs_environment === 'miniprogram') {
            this.bindBackHome(this.config);
            if (this.config.message && JSON.stringify(this.config.message) !== '{}') {
                this.postMessage(this.config.message);
            }
        }
    },
    init: function (config) {
        const that = this;
        that.config = config || {};
        const mpCustom = that.mpCustom.bind(that);
        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
            document.addEventListener('WeixinJSBridgeReady', mpCustom, false)
        } else {
            mpCustom();
        }
    }
};

module.exports = mpWebviewTool;