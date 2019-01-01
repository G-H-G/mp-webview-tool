var uaAdapt = {
    ua: '',
    getUA: function () {
        return navigator.userAgent.toLowerCase();
    },
    isAndroid: function (ua) {
        var isAndr = false;
        if (ua.indexOf('android') !== -1) {
            isAndr = true;
        }
        return isAndr;
    },
    isHuawei: function (ua) {
        if (ua.indexOf('huawei')  !== -1 && ua.indexOf('qqbrowser') === -1 && ua.indexOf('ucbrowser') === -1) {
            return true;
        } else {
            return false;
        }
    },
    getIOSVersion: function (ua) {
        var versionNum = 20;
        if (ua.indexOf('cpu iphone os') !== -1) {
            var iosVersionString = ua.substring(ua.indexOf('cpu iphone os'));
            iosVersionString = iosVersionString.substring(0, iosVersionString.indexOf('_'));
            versionNum = parseInt(iosVersionString.split(' ')[3], 10);
        }
        return versionNum;
    }
};

module.exports = uaAdapt;