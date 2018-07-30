from django.db import models


# Create your models here.


class Race(models.Model):
    race_name = models.CharField(max_length=200)

    class Meta:
        ordering = ['race_name']

    def __str__(self):
        return self.race_name


class Bonus(models.Model):
    bon_name = models.CharField(max_length=100)

    class Meta:
        ordering = ['bon_name']

    def __str__(self):
        return str(self.bon_name)


class ArtifactLevel(models.Model):
    art_level = models.CharField(max_length=5)

    def __str__(self):
        return self.art_level


class Artifact(models.Model):
    artifact_img = models.CharField(max_length=200)
    artifact_number = models.IntegerField(default=0, unique=True)
    artifact_level = models.ForeignKey(ArtifactLevel, on_delete=models.CASCADE, default=2)
    artifact_name = models.CharField(max_length=100)
    artifact_bonus_1 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='art_bonus_1', default=0)
    artifact_bonus_1_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='art_bonus_1_race',
                                              blank=True, null=True)
    artifact_bonus_2 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='art_bonus_2', default=0)
    artifact_bonus_2_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='art_bonus_2_race',
                                              blank=True, null=True)

    class Meta:
        ordering = ['artifact_number']

    def __str__(self):
        return str(self.artifact_number) + ' ' + str(self.artifact_level) + ' ' + str(self.artifact_name)


class Set(models.Model):
    set_name = models.CharField(max_length=100)
    set_level = models.ForeignKey(ArtifactLevel, on_delete=models.CASCADE, related_name='set_level', default=6)
    set_arts_number = models.IntegerField()
    set_art_1 = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name='set_art_1', blank=True, null=True)
    set_art_2 = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name='set_art_2', blank=True, null=True)
    set_art_3 = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name='set_art_3', blank=True, null=True)
    set_art_4 = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name='set_art_4', blank=True, null=True)
    set_art_5 = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name='set_art_5', blank=True, null=True)
    set_art_6 = models.ForeignKey(Artifact, on_delete=models.CASCADE, related_name='set_art_6', blank=True, null=True)
    set_bonus_1 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='set_bonus_1', default=0)
    set_bonus_1_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='set_bonus_1_race', blank=True,
                                         null=True)
    set_bonus_1_value = models.CharField(max_length=20, blank=True, null=True)
    set_bonus_2 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='set_bonus_2', default=0)
    set_bonus_2_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='set_bonus_2_race', blank=True,
                                         null=True)
    set_bonus_2_value = models.CharField(max_length=20, blank=True, null=True)
    set_bonus_3 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='set_bonus_3', blank=True, null=True)
    set_bonus_3_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='set_bonus_3_race', blank=True,
                                         null=True)
    set_bonus_3_value = models.CharField(max_length=20, blank=True, null=True)
    set_bonus_4 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='set_bonus_4', blank=True, null=True)
    set_bonus_4_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='set_bonus_4_race', blank=True,
                                         null=True)
    set_bonus_4_value = models.CharField(max_length=20, blank=True, null=True)
    set_bonus_5 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='set_bonus_5', blank=True, null=True)
    set_bonus_5_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='set_bonus_5_race', blank=True,
                                         null=True)
    set_bonus_5_value = models.CharField(max_length=20, blank=True, null=True)
    set_bonus_6 = models.ForeignKey(Bonus, on_delete=models.CASCADE, related_name='set_bonus_6', blank=True, null=True)
    set_bonus_6_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='set_bonus_6_race', blank=True,
                                         null=True)
    set_bonus_6_value = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        ordering = ['set_level', 'set_name', 'set_arts_number']

    def __str__(self):
        return str(self.set_level) + ' ' + str(self.set_name)
