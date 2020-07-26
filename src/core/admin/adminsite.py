# -*- coding: utf-8 -*-
from django.utils.translation import ugettext_lazy as _
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.conf import settings

from django.contrib.auth.models import User
from django.contrib.auth.models import Group

admin.site.unregister(User)
admin.site.unregister(Group)

AdminSite.site_title = settings.SITE_TITLE
AdminSite.site_header = settings.SITE_HEADER
AdminSite.index_title = settings.INDEX_TITLE