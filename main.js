/*
 var define;

 (function (root, document) {
 */
/*define = function (id, deps, factory) {
 if (typeof id !== 'string') {
 factory = deps;
 deps = id;
 id = null;
 }
 if(factory == null){

 }
 }*//*


 //存储已经加载好的模块
 var moduleCache = {};

 var Module = function () {
 this.status = 'loading'; //只具有loading与loaded两个状态
 this.depCount = 0; //模块依赖项
 this.value = null; //define函数回调执行的返回
 };


 var loadScript = function (url, callback) {

 };

 var config = function () {

 };

 var require = function (deps, callback) {

 };

 require.config = function (cfg) {

 };

 var define = function (deps, callback) {

 };


 function define() {

 };
 root.define = define;
 define.amd = {};
 })(window, document);
 */


(function () {
    'use strict';

    //存储已经加载好的模块
    var moduleCache = {},
        proto = Object.prototype.toString;

    var require = function (deps, callback) {
        var params = [];
        var depCount = 0;
        var i, len, isEmpty = false, modName;

        //获取当前正在执行的js代码段，这个在onLoad事件之前执行
        modName = document.currentScript && document.currentScript.id || 'main';

        //匿名模块
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        if(deps != undefined){
            if (deps.length) {
                for (i = 0, len = deps.length; i < len; i++) {
                    (function (i) {
                        //依赖加一
                        depCount++;
                        //这块回调很关键
                        loadMod(deps[i], function (param) {
                            params[i] = param;
                            depCount--;
                            if (depCount == 0) {
                                saveModule(modName, params, callback);
                            }
                        });
                    })(i);
                }
            } else {
                isEmpty = true;
            }
        }else{
            isEmpty = true;
        }

        if (isEmpty) {
            setTimeout(function () {
                saveModule(modName, null, callback);
            }, 0);
        }
    };

    //考虑最简单逻辑即可
    var _getPathUrl = function (modName) {
        var url = modName;

        //不严谨
        if (url.indexOf('.js') == -1) url = url + '.js';
        return url;

    };

    //模块加载
    var loadMod = function (modName, callback) {
        var url = _getPathUrl(modName), fs, mod;

        //如果该模块已经被加载
        if (moduleCache[modName]) {
            mod = moduleCache[modName];
            if (mod.status == 'loaded') {
                setTimeout(callback(this.params), 0);
            } else {

                //如果未到加载状态直接往onLoad插入值，在依赖项加载好后会解除依赖
                mod.onload.push(callback);
            }

        } else {

            /*
            这里重点说一下Module对象
            status代表模块状态
            onLoad事实上对应requireJS的事件回调，该模块被引用多少次变化执行多少次回调，通知被依赖项解除依赖
            */
            mod = moduleCache[modName] = {
                modName: modName,
                status: 'loading',
                export: null,
                onload: [callback]
            };

            var _script = document.createElement('script');
            _script.id = modName;
            _script.type = 'text/javascript';
            _script.charset = 'utf-8';
            _script.async = true;
            _script.src = url;

            //这段代码在这个场景中意义不大，注释了
            //      _script.onload = function (e) {};
            fs = document.getElementsByTagName('script')[0];
            fs.parentNode.insertBefore(_script, fs);
        }
    };


    var saveModule = function (modName, params, callback) {

        var mod, fn;
        if (moduleCache.hasOwnProperty(modName)) {

            mod = moduleCache[modName];
            mod.status = 'loaded';

            //输出项
            mod.export = callback ? callback(params) : null;

            //解除父类依赖，这里事实上使用事件监听较好
            while (fn = mod.onload.shift()) {
                fn(mod.export);
            }

        } else {
            callback && callback.apply(window, params);
        }
    };

    //判断方法
    function isFunction(o) {
        return proto.call(o) === '[object Function]';
    }

    //判断数组
    function isArray(o) {
        return proto.call(o) === '[object Array]';
    }

    window.require = require;
    window.define = require;
})
();
