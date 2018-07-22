# EF-Artifacts-Builder

Require python >= 3.6

virtualenv venv -p python3 --no-site-package

. venv/bin/activate

pip install -r requirements.txt 

touch EFArtifacts/local_settings.py

Add a secret key to local_settings.py (e.g SECRET_KEY='HeyImASecretKey')

python manage.py migrate

python manage.py createsuperuser

python manage.py runserver