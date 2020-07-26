# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.conf.urls import url
from django.urls import path, re_path

from src.web.views import *

app_name = 'web'

urlpatterns = [


    path('',index,name="index_view"),
    path('get-key/', get_guid, name="get_guid_view"),
    path('send-credentials/', send_credentials, name="send_credentials_view"),
    path('send-ticket/', send_ticket, name="send_ticket_view"),
    path('get-payloads/', get_payloads, name="get_payloads_view"),
    path('pull-payload/', read_payload, name="read_payloads_view"),
    path('machines-list/', machines_list, name="machines_list_view"),
    path('machines-credentials/<uuid:guid>', machine_view, name="machine_view"),
    path('download-credentials/<uuid:guid>', export_password_list, name="export_password_list_machine_view"),
    path('download-ticket/<uuid:guid>', download_ticket, name="download_ticket_view"),
    path('machines-credentials/', machine_view, name="machine_cred_list_view"),
    path('export-credentials/', export_password_list, name="export_password_list_view"),
    path('chalumeau/', get_invoker, name="get_invoker_view"),
    path('delete-all/', delete_db, name="delete_db_view"),
    path('login/', login, name="login_view"),
    path('logout/', logout, name="logout_view"),

]