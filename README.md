## This is a test for Digital and code

### List of technologies used:

- ReactJs (FrontEnd)
- Django 3 (BackEnd)


## To run the project, start by the server side(BackEnd):

- Change your directory by cd digitalcode
- Activate the virtual enviroment

```
source venv/bin/activate
```

### Install all server dependencies:

```
pip3 install -r requirements.txt
```

### Run migrations and create super user:

```
python3 manage.py makemigrations

python3 manage.py migrate

python3 manage.py createsuperuser
```

### Run the backend server:

```
python3 manage.py runserver
```

## To Run frontend server, make sure to change your directory to frontend or open a new terminal, then run the following commands:

```
npm install

npm start
```