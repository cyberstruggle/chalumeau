# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.db import models
from uuid import uuid4
import os
from django.utils.text import slugify
from src.core.utils.cryptography import sha1
from django.urls import reverse

class ChalumeauBase(models.Model):
    class Meta:
        abstract = True

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    guid = models.UUIDField(unique=True, default=uuid4, editable=False, verbose_name=_("Unique ID"),
        help_text=_("This field is automatically determined by the system, do not interfere.")
    )

    @property
    def isedited(self):
        return False if self.created.strftime('%Y-%m-%d %H:%M:%S') == self.modified.strftime('%Y-%m-%d %H:%M:%S') else True


class Machine(ChalumeauBase):
    class Meta:
        verbose_name = _("Machine")
        verbose_name_plural = _("Machines")
        ordering = ("-created",)

    host_ip         = models.CharField(_("Host IP"), max_length=700, null=True, blank=True)
    host_local_ip   = models.CharField(_("Host local IP"), max_length=700, null=True, blank=True)
    host_name       = models.CharField(_("Host Name"), max_length=700, null=True, blank=True)
    host_arch       = models.CharField(_("Host Arch"), max_length=700, null=True, blank=True)
    host_domain     = models.CharField(_("Host Domain"), max_length=700, null=True, blank=True)
    host_username   = models.CharField(_("Host Name"), max_length=700, null=True, blank=True)

    def credsurl(self):
        return reverse("web:machine_view",args=[self.guid])

    def downloadcredsurl(self):
        return reverse("web:export_password_list_machine_view",args=[self.guid])

    def __str__(self):
        return "{} {}".format(self.host_ip,self.host_name)

def _handle_file(instance, filename):
    fn, fx = os.path.splitext(filename)
    fw = "{}-{}".format(instance.guid,instance.machine)
    return "{0}/{1}".format("dumpedtickets", "{0}{1}".format(slugify(sha1(fw)), fx))


class DumpedCredentials(ChalumeauBase):
    class Meta:
        verbose_name = _("Dumped Credentials")
        verbose_name_plural = _("Dumped Credentials")
        ordering = ("-created",)

    HASH    = "HASH"
    NORMAL  = "NORMAL"
    TICKET  = "TICKET"

    CredentialsType = (
        (HASH,   _("Dumped Hash"),),
        (NORMAL, _("Clear Text"),),
        (TICKET, _("Dumped Ticket"),),
    )

    ticketfile      = models.FileField(_("Ticket File"), upload_to=_handle_file, null=True, blank=True)
    type            = models.CharField(_("Credential Type"), max_length=32, default=NORMAL, choices=CredentialsType)
    username        = models.CharField(_("Username"), max_length=700, null=True, blank=True)
    password        = models.CharField(_("Password/Secret"), max_length=700, null=True, blank=True)
    machine         = models.ForeignKey(Machine, on_delete=models.CASCADE , null=True, blank=True)

    def __str__(self):
        return "{} {}".format(self.machine, self.type)


