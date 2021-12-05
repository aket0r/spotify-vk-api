# spotify-vk-api

Установка:
1. Установить NodeJs библиотеку Spotify, k-io и colors
2. Получить токен ВК и Spotify
3. Вставить в getMe.js токен ВК и Spotify (Большими буквами всё указано)
4. В index.js вставить clientId и clientSecret


$ npm install spotify-web-api-node --save
$ npm install vk-io --save
$ npm install colors --save

# Ссылки:

Spotify web api
https://developer.spotify.com/documentation/web-api/

Создать приложение Spotify (В нём вы получите clientId & clientSecret)
https://developer.spotify.com/dashboard/

Получить токен вк:
https://vkhost.github.io/


# Запуск
1. Запускаем index.js в cmd (node index.js)
2. Заходим в браузере по ссылке http://localhost:8888/login
3. Ждем пока не будет надпись 'Success! You can now close the window.'
4. В коноли копируем access_token (Всё что после ':')
5. Вставляем в getMe.js, строчка 4.
6. Если не вставили токен ВК на строке 10 (getMe.js) вставьте (ссылка на токены выше)
7. Закрыть cmd и открыть новую в той же директории (папке со скриптом getMe.js)
8. Вводим команду node getMe.js

# Вопросы

1. Статус меняет с задержкой в *длинна трека - прогресс трека + 5000ms*
2. Если длинна трека 1.27м, а текущий прогресс 0.27 то задержка будет: 1.27 - 0.27 + 5;
