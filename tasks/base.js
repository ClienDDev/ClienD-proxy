var fs = require('fs');
var path = require('path');
var wait = require('wait.for');

module.exports = {
    label_str: '# ClienD proxy',
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
			if(typeof this.before_write !== 'undefined')
				this.before_write();
				
            var filepath = this.get_path();
            
            if (!fs.existsSync(filepath)) {
                fs.writeFileSync(filepath, "");
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
