# Generated by Django 2.0.7 on 2019-02-16 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0033_auto_20180816_1515'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='set',
            options={'ordering': ['set_type', 'set_name', 'set_tech_name', '-set_level_id']},
        ),
        migrations.RemoveField(
            model_name='set',
            name='set_type_order',
        ),
        migrations.AddField(
            model_name='set',
            name='set_total_arts_number',
            field=models.IntegerField(default=6),
            preserve_default=False,
        ),
    ]
