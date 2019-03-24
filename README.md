## Welcome to Endless Frontier Artifacts Builder !

### UPDATE 2019/03/24
Now using Google Cloud to provide data with a direct json as static file. I still use this back end locally to generate json data but this part is not online anymore.

This part is the backend, it uses Python with Django and Django REST framework.

Feel free to report bugs !

Require python >= 3.6

Set of commands to make it run

```console
# Building up virtual environnement and getting libraires
virtualenv venv -p python3 --no-site-package
. venv/bin/activate
pip install -r requirements.txt

# Create local_settings
touch EFArtifacts/local_settings.py
echo "SECRET_KEY='HeyImASecretKey'" > EFArtifacts/local_settings.py

# Then setup the database
python manage.py makemigrations
python manage.py migrate

# Create user and start server
python manage.py createsuperuser
python manage.py runserver
```

As simple as this, you'll have to add data by yourself to make it work ;)
