var fs = require('fs');
var path = require('path');

module.exports = {
    label_str: '# ClienD proxy',
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
    },
    check: function(){
        var filepath = this.get_path();
        
        if(!fs.existsSync(filepath))
            return false;
        else{
            var content = fs.readFileSync(filepath).toString();
            
            if(content.indexOf(this.label_str) !== -1){
                if(content.indexOf(this.get_code()) !== -1)
                    return true;
                else
                    return false;
            }
            else
                return false;
        }
    },
    write: function(){
        if (this.check()) 
            return true;
        else{
            var filepath = this.get_path();
            
            if (!fs.existsSync(filepath)) {
                if(!fs.writeFileSync(filepath, "\n")){
                    console.error("Не удалось создать файл", filepath, '. Запустите скрипт с правами администратора');
                    return false;
                }
            }
            
            var content = fs.readFileSync(filepath).toString();
            
            if(content.indexOf(this.label_str) !== -1){
				var start = content.indexOf(this.label_str);
				var end = content.indexOf(this.label_str, start + 1);
				
				var old = "\n" + content.substring(start, end + this.label_str.length) + "\n";
				
				content = content.replace(old, this.get_code());
				fs.writeFileSync(filepath, content);
			}
            else
				fs.appendFileSync(filepath, this.get_code());
            return true;
        }
    },
    remove: function(){
		var filepath = this.get_path();
        var content = fs.readFileSync(filepath).toString();
            
		if(content.indexOf(this.label_str) !== -1){
			var start = content.indexOf(this.label_str);
			var end = content.indexOf(this.label_str, start + 1);
			
			var old = "\n" + content.substring(start, end + this.label_str.length) + "\n";
			
			content = content.replace(old, "");
			fs.writeFileSync(filepath, content);
		}
		return true;
    }
}
