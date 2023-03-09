### Отчет по дз react

Хамид Карим

Сделаны все пункты задания. Единственное, что не получилось, это то, что после нажатия на кнопку "Выйти", нужно самому перезагружать страницу. Если нужно получить доступ к базе данных, то нужно перейти по localhost:8000/admin и войти по данным ниже. Этими данными также можно входить в react (было бы странно если нельзя было бы).

Для тестирования приложения, данные от пользователя:
```
username: karimhamid
password: 123
```
---
Для запуска всего проекта, в корневой папке достаточно прописать docker-compose up.
Frontend будет доступен по 
```shell
http://localhost:3000/
```
---
В качестве backend использовался django rest framework и sqlite3.

Для начала, создам проект frontend react.

```shell
npx create-react-app frontend
```

Затем создам проект backend django.
```shell
python3 -m venv venv
source venv/bin/activate
pip3 install django djangorestframework django-cors-headers
django-admin startproject api_project
cd api_project
django-admin startapp main
```
Делаем миграцию и запускаем сервер по localhost:8000.
```shell
python3 manage.py migrate
python3 manage.py runserver
```
Запустим сервер react.
```shell
cd frontend
npm start
```
Теперь, чтобы общаться между серверами, нужно настроить CORS. Для этого в файле settings.py в api_project добавим:
```python
INSTALLED_APPS = [
    'rest_framework',
    'corsheaders',
    'main',
]
```

Далее, создал модель продуктов в файле models.py в api_project/main.
Сделал миграции
```shell
python3 manage.py makemigrations
python3 manage.py migrate
```
Создал суперпользователя 
```shell
python3 manage.py createsuperuser
```

Далее, нужно заполнить бд случайными данными
```shell
pip3 install django-seed
python3 manage.py seed main --number=132
```

Далее, написал hook в файле ProductsPage для загрузки данных по API с сервера и сделал кнопку "загрузить еще" во frontend. Также, добавлено сообщение об ошибке в случае ошибки подключения.

В django добавляю api для авторизации по путям
```shell
/api/token/login/
/api/token/logout
```
Написал функцию CSRFToken для получения csrf токена с сервера для страниц, использующих post запросы.

Для установки cookie в react использую
```shell
npm install react-cookie
```
Это нужно чтобы установить токен, полученый при авторизации от сервера.

Добавил стилей и добавил спиннер загрузки элементов. Элементы загружаются около 2-3 секунд(специально установлен timeout для наглядности). В бд 25 записей продуктов, поэтому можно листнуть два раза на странице продуктов.