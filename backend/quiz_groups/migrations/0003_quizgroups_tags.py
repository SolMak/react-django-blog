# Generated by Django 3.0.3 on 2020-04-08 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('quiz_groups', '0002_quizgroups_quizzes'),
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizgroups',
            name='tags',
            field=models.ManyToManyField(blank=True, to='tags.Tags'),
        ),
    ]
