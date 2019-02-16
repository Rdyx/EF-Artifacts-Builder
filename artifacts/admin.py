from django.contrib import admin

# Register your models here.

from .models import HitCount, Race, Bonus, Artifact, ArtifactLevel, Set, SetType


class SetAdmin(admin.ModelAdmin):
    fields = (('set_type', 'set_level'),
              ('set_name', 'set_tech_name'),
              ('set_arts_number', 'set_total_arts_number'),
              ('set_art_1', 'set_art_2', 'set_art_3', 'set_art_4', 'set_art_5', 'set_art_6'),
              ('set_bonus_1', 'set_bonus_1_race', 'set_bonus_1_value'),
              ('set_bonus_2', 'set_bonus_2_race', 'set_bonus_2_value'),
              ('set_bonus_3', 'set_bonus_3_race', 'set_bonus_3_value'),
              ('set_bonus_4', 'set_bonus_4_race', 'set_bonus_4_value'),
              ('set_bonus_5', 'set_bonus_5_race', 'set_bonus_5_value'),
              ('set_bonus_6', 'set_bonus_6_race', 'set_bonus_6_value'))

    search_fields = ['set_tech_name', 'set_name']
    save_as = True


class ArtifactAdmin(admin.ModelAdmin):
    fields = (('artifact_img', 'artifact_level'), ('artifact_number', 'artifact_name'),
              ('artifact_bonus_1', 'artifact_bonus_1_race'),
              ('artifact_bonus_2', 'artifact_bonus_2_race'))

    search_fields = ['artifact_name', 'artifact_number']
    save_as = True


admin.site.register(Race)
admin.site.register(Bonus)
admin.site.register(Artifact, ArtifactAdmin)
admin.site.register(Set, SetAdmin)
admin.site.register(ArtifactLevel)
admin.site.register(SetType)
# In case needing initialisation from admin
# admin.site.register(HitCount)