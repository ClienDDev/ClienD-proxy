var fs = require('fs');
var path = require('path');
var base = require('./base');

module.exports = {
    check: base.check,
    write: base.write,
    remove: base.remove,
    label_str: base.label_str,
    get_path: function(){
        return path.normalize(process.env.HOME + '/.bashrc');
    },
    get_code: function(){
        var str = "http://" + global.config.edu_login + ":" + global.config.edu_pass + "@" + global.config.proxy_host + ":" + global.config.proxy_port + "/";
        
        var full = "\n" +
            this.label_str + "\n" +
            "export http_proxy='" + str + "'\n" +
            "export ftp_proxy='" + str + "'\n" +
            this.label_str + "\n";
            
        return full;
    }
}
