var fs = require('fs');
var path = require('path');
var base = require('./base');

module.exports = {
    check: base.check,
    write: base.write,
    remove: base.remove,
    label_str: base.label_str,
    get_path: function(){
        return path.normalize('/etc/chromium-browser/default');
    },
    get_code: function(){
        var str = "http://" + global.config.edu_login + ":" + global.config.edu_pass + "@" + global.config.proxy_host + ":" + global.config.proxy_port + "/";
        
        var full = "\n" +
            this.label_str + "\n" +
            'CHROMIUM_FLAGS="-proxy-server=' + global.config.proxy_host + ':' + global.config.proxy_port + '"' + "\n" +
            this.label_str + "\n";
            
        return full;
    }
}
