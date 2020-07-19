#### Single Page Application для работы со списком студентов: добавлением, удалением, получением.

В основе Express.js, React, MongoDB.

####Запуск приложения
Для запуска приложения необходима установка MongoDB.
Как установить MongoDB:  
  
```
    sudo apt update  
    sudo apt install -y mongodb
```
Далее запускаем приложение:

Устанавливаем зависимости:
```
    npm install
```
Компиляция next.js приложения в dist/
```
    npm run build
```

Инициализация базы данных (не обязательно)
```
    npm run initdb
```
Запускаем сервис локально в режиме разработки:
```
    npm run dev
```
И открываем в браузере: http://localhost:3000/


####Развёртывание (на Heroku)
Устанавливаем Heroku по инструкции, затем авторизуемся и создаём приложение:
    
    npm run heroku-init


Размещаем статику в Surge CDN (в первый раз вводим почту и пароль):

    npm run surge

Далее размещаем приложение:

    npm run heroku

В дальнейшем всё это можно выполнить одной командой:

    npm run deploy

Доступные команды

| Команда	  |      Действие |
| ------------- |:------------------:|
| build	      |  Сборка приложения |
| lint:css	| Проверка css файлов на codestyle |
| lint:deps	| Проверка зависимостей на уязвимости |
| lint:es	| Проверка JavaScript файлов на codestyle |
| initdb | Инициализация базы данных |
| dev | Запуск приложения в режиме разработки |
