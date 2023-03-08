### Отчет по дз react

Хамид Карим

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

Буду использовать bootstrap 5 для стилей. Установим его в файле App.css
```
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css';
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

karimhamid \
123

Далее, нужно заполнить бд
```shell
pip3 install django-seed
python3 manage.py seed main --number=132
```

Далее, написал hook в файле ProductsPage для загрузки данных по API с сервера и сделал кнопку "загрузить еще" во frontend. Также, добавлено сообщение об ошибке в случае ошибки подключения

В django добавляю api для авторизации по путям
```shell
/api/auth/login
/api/auth/sign-up
/api/auth/logout
```
Написал функцию CSRFToken для получения csrf токена с сервера для страниц, использующих post запросы.

Для установки cookie использую
```shell
npm install react-cookie
```
