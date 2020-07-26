# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.contrib import messages
from django.utils import timezone as djtz
from django.utils.dateformat import DateFormat
from django.db.models import Q
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

import re, string, random

def timestamp2datetime(timestamp):
    return djtz.datetime.fromtimestamp(float(timestamp)/1000.0)

def readabledateformat(datetime):
    return DateFormat(datetime).format("d F Y H:i")

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def paginate(objects, per_page=24, page=1):
    paginator = Paginator(objects, per_page)
    try:
        paginated_objects = paginator.page(page)
    except PageNotAnInteger:
        paginated_objects = paginator.page(1)
    except EmptyPage:
        paginated_objects = paginator.page(paginator.num_pages)
    return paginated_objects

def normalize_query(query_string, findterms=re.compile(r'"([^"]+)"|(\S+)').findall, normspace=re.compile(r'\s{2,}').sub):
    ''' Splits the query string in invidual keywords, getting rid of unecessary spaces
        and grouping quoted words together.
        Example:
        
        >>> normalize_query('  some random  words "with   quotes  " and   spaces')
        ['some', 'random', 'words', 'with quotes', 'and', 'spaces']
    
    '''
    return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]

def get_query(query_string, search_fields):
    ''' Returns a query, that is a combination of Q objects. That combination
        aims to search keywords within a model by testing the given search fields.
    
    '''
    query = None # Query to search for every search term        
    terms = normalize_query(query_string)
    for term in terms:
        or_query = None # Query to search for a given term in each field
        for field_name in search_fields:
            q = Q(**{"%s__icontains" % field_name: term})
            if or_query is None:
                or_query = q
            else:
                or_query = or_query | q
        if query is None:
            query = or_query
        else:
            query = query & or_query
    if not terms:
        query = Q(**{"%s__icontains" % search_fields[0]: ""})
    return query

def display_form_validations(form, request, message_type=messages.ERROR):
    for field_name, errors in form.errors.items():
        field = form.fields.get(field_name)
        field_name = field.label if field else field_name
        messages.add_message(request, message_type, "<b>{}</b>: {}".format(field_name, ", ".join(errors)))
