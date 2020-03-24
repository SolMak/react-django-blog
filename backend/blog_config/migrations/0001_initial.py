# Generated by Django 3.0.3 on 2020-03-24 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogConfig',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('owned_by', models.CharField(blank=True, max_length=255)),
                ('meta_desc', models.TextField(blank=True)),
                ('youtube_url', models.CharField(blank=True, max_length=255)),
                ('facebook_url', models.CharField(blank=True, max_length=255)),
                ('instagram_url', models.CharField(blank=True, max_length=255)),
                ('donation_url', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'verbose_name': 'Blog Config',
                'verbose_name_plural': 'Blog Config',
            },
        ),
    ]
