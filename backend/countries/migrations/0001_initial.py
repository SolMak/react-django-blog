# Generated by Django 3.0.3 on 2020-03-19 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Countries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numeric_code', models.IntegerField()),
                ('two_code', models.CharField(max_length=20)),
                ('three_code', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=100)),
            ],
        ),
    ]
