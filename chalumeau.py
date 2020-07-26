#!/usr/bin/env python
import os
import sys


if not os.path.exists('.env'):
    os.system('cp Sample.env .env')
def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.base_settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    if 'runserver' not in sys.argv and not len(sys.argv) == 1:
        execute_from_command_line(sys.argv)
    else:
        execute_from_command_line([__file__,"runserver","0.0.0.0:8000"])


if __name__ == '__main__':
    main()
