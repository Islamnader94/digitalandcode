# Generated by Django 3.1.5 on 2021-01-27 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='email',
            field=models.CharField(blank=True, max_length=300, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='first_name',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='last_name',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='phone_number',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='profile_picture',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='room_number',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
