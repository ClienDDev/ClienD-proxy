// системные модули
var fs = require('fs');
var argv = require('optimist').argv;
var read = require('read');
var async = require('async');

// задачи
var tasks = {
    bashrc: require('./tasks/bashrc'),
}

// загрузка конфигурации
try{
    global.config = require('./config.json');
}
catch(e){
    console.error('Не удалось прочитать config.json - синтаксическая ошибка:');
    console.log(e);
    process.exit();
}

// проверка конфигурации 
if (typeof global.config.proxy_host === 'undefined' || typeof global.config.proxy_port === 'undefined') {
    console.error("Ошибка: не указаны данные прокси-сервера. Укажите их в config.json");
    process.exit();
}

async.series([ // предотвращаем асинхронность
    function(callback){
        // получаем логин и пароль от пользователя с помощью ввода
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
                
                global.config.edu_login = login;
                global.config.edu_pass = pass;
                
                process.stdin.destroy();
                
                callback();
            });
        });
    },
    function (callback) {
        console.log('Конфигурация загружена, начинаем...');

        var operation;
        var task = '*';
        
        if (typeof argv._[0] !== 'undefined' && (argv._[0] == 'write' || argv._[0] == 'check' || argv._[0] == 'remove')) {
            operation = argv._[0];
            
            if (typeof argv._[1] !== 'undefined') 
                task = argv._[1];
        }
        else
            task = 'write';
        
        if (task === '*') 
            task[operation]();
        else{
			for(var key in tasks) // пробегаемся по массиву задач и выполняем их
				tasks[key][operation]();
        }
    }
]);




