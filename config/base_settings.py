from __future__ import absolute_import, unicode_literals
from django.utils.translation import ugettext_lazy as _
import os, environ

ROOT_DIR = environ.Path(__file__) - 2  
APPS_DIR = ROOT_DIR.path('src')
CONF_DIR = ROOT_DIR.path('config')
SCRIPTS_DIR = ROOT_DIR.path('chalumeau-power')
PAYLOADS_DIR = SCRIPTS_DIR.path('payloads')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

env = environ.Env()
env.read_env('.env')

SECRET_KEY = env("SECRET_KEY", default='chalumeau')

DEBUG = env.bool("DEBUG", True)

SITE_ID = int(env("SITE_ID", default='1'))
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['*'])

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'src.core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [str(APPS_DIR.path('templates')),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'src.core.context_processors.site',
            ],
        },
    },
]

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

WSGI_APPLICATION = 'config.wsgi.application'

ROOT_URLCONF = 'config.urls'

LOGIN_URL = "/login/"

ADMIN_URL = env('ADMIN_URL', default="admin/")

LOCALE_PATHS = (str(APPS_DIR('locale')), str(CONF_DIR('locale')),)

LANGUAGE_CODE = env('LANGUAGE_CODE', default="en")

LANGUAGES = (
    ('en', _('English')),
)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

DATABASES = {
    'default': env.db('DEVDB_URL', default='sqlite:///db.sqlite3')
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

SITE_TITLE  = "Chalumeau"
SITE_HEADER = "Chalumeau Panel"
INDEX_TITLE = "Chalumeau Panel"

from django.contrib.messages import constants as message_constants
MESSAGE_TAGS = {
    message_constants.DEBUG: 'info',
    message_constants.INFO: 'info',
    message_constants.SUCCESS: 'success',
    message_constants.WARNING: 'warning',
    message_constants.ERROR: 'danger',
}

STATIC_ROOT = str(ROOT_DIR('public/static'))

STATIC_URL = '/static/'

STATICFILES_DIRS = (str(APPS_DIR.path('static', )),)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

MEDIA_ROOT = str(ROOT_DIR('public/media'))

MEDIA_URL = '/media/'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },

    },
}