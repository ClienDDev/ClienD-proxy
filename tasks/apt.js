var fs = require('fs');
var path = require('path');
var base = require('./base');

module.exports = {
    check: base.check,
    write: base.write,
    remove: base.remove,
    label_str: base.label_str,
    get_path: function(){
        return path.normalize('/etc/apt/apt.conf.d/00cliendproxy');
    },
    before_write: this.remove,
    get_code: function(){
        var str = "http://" + global.config.edu_login + ":" + global.config.edu_pass + "@" + global.config.proxy_host + ":" + global.config.proxy_port + "/";
        
        var full = 
			this.label_str + "\n" +
            "Acquire::http::proxy \"" + str + "\";\n" +
            "Acquire::https::proxy \"" + str + "\";\n" +
            "Acquire::ftp::proxy \"" + str + "\";\n" +
            "Acquire::socks::proxy \"" + str + "\";\n" + 
            "Acquire::::Proxy \"true\";\n" +
            this.label_str + "\n";
        return full;
    },
    remove: function(){
		var filepath = this.get_path();
        fs.unlinkSync(filepath);
		return true;
    }
}
