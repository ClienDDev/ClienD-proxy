var fs = require('fs');
var path = require('path');
var base = require('./base');
var bashrc = require('./bashrc');

module.exports = {
    check: base.check,
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
            else{
				content = content.replace("#!/bin/bash", "#!/bin/bash\n" + this.get_code() + "\n");
				fs.writeFileSync(filepath, content);
				//fs.appendFileSync(filepath, this.get_code());
			}
            return true;
        }
    },
    remove: base.remove,
    label_str: base.label_str,
    get_path: function(){
        return path.normalize('/usr/bin/google-chrome');
    },
    get_code: bashrc.get_code
}
