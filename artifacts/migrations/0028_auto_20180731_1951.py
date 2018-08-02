# Generated by Django 2.0.7 on 2018-07-31 19:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0027_set_set_level'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='set',
            options={'ordering': ['set_name', '-set_level_id']},
        ),
        migrations.AddField(
            model_name='set',
            name='set_tech_name',
            field=models.CharField(default=set, max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='set',
            name='set_level',
            field=models.ForeignKey(default=6, on_delete=django.db.models.deletion.CASCADE, related_name='set_level', to='artifacts.ArtifactLevel'),
        ),
    ]
