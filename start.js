var fs = require('fs');
var argv = require('optimist').argv;
var read = require('read');
var async = require('async');

try{
    var config = require('./config.json');
}
catch(e){
    console.error('Не удалось прочитать config.json - синтаксическая ошибка:');
    console.log(e);
    process.exit();
}

if (typeof config.proxy_host === 'undefined' || typeof config.proxy_port === 'undefined') {
    console.error("Ошибка: не указаны данные прокси-сервера. Укажите их в config.json");
    process.exit();
}

async.series([
    function(callback){
        read({ prompt : 'Введите логин от edu.tatar.ru: ' }, function (err, login) {
            if (typeof login === 'undefined' || login == '') {
                console.error('Для работы программы необходим логин от edu.tatar.ru');
                process.exit();
            }
            
            read({
                prompt : 'Введите пароль от edu.tatar.ru (введенные символы не показываются):',
                silent : true
            }, function (err, pass) {
                if (typeof pass === 'undefined' || pass == '') {
                    console.error('Для работы программы необходим пароль от edu.tatar.ru');
                    process.exit();
                }
                
                config.edu_login = login;
                config.edu_pass = pass;
                
                process.stdin.destroy();
                
                callback();
            });
        });
    },
    function (callback) {
        console.log('Конфигурация загружена, начинаем...');

        config.tasks.forEach(function(task){
            switch (task) {
                case 'bashrc':
                        
                    break;
                default:
                        console.error('Задача', task, 'не найдена');
                    break;
            }
        });
    }
]);




