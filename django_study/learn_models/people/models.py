from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
    
    def __unicode__(self): # use def __str__(self) in python3
        return self.name