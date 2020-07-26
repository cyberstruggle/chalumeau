# -*- encoding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _
from django.db import models
from uuid import uuid4

class GuidModel(models.Model):
	guid = models.UUIDField(unique=True, default=uuid4, editable=False, verbose_name=_("Unique ID"),
		help_text=_("This field is automatically determined by the system, do not interfere.")
	)
	class Meta:
		abstract = True
	def getuid(self):
		return str(self.guid)