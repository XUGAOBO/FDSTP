/**
 * 开发版本的文件导入
 */
(function () {
    var paths = [
            'ueditor.js'
        ],
        baseURL = 'static/ueditor/_src/';
    var scriptDomArr = [];
    scriptDomArr.push('static/ueditor/ueditor.config.js');
    for (var i = 0, pi; pi = paths[i++];) {
        scriptDomArr.push(baseURL + pi);
    }
    scriptDomArr.push('static/ueditor/lang/zh-cn/zh-cn.js');
    for (var i = 0, pi; pi = scriptDomArr[i++];) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = pi;
        document.write('<script type="text/javascript" src="' + pi + '"></script>');
    }
})();
