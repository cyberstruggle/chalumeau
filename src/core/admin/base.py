# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.contrib import admin
from django.apps import apps
from src.core.models import *



@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ("host_name", "host_arch", "host_domain", "host_username","created","guid")
    search_fields = ("guid",)
    def get_readonly_fields(self, request, obj=None):
        return [f.name for f in self.model._meta.fields]


@admin.register(DumpedCredentials)
class DumpedCredentialsAdmin(admin.ModelAdmin):
    list_display = ("type", "machine", "username","created")
    search_fields = ("guid","username")
    def get_readonly_fields(self, request, obj=None):
        return [f.name for f in self.model._meta.fields]
