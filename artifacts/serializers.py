from rest_framework import serializers
from .models import Set, Artifact, ArtifactLevel, Bonus, Race


class ArtifactLevelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ArtifactLevel
        fields = ('art_level',)


class BonusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bonus
        fields = ('bon_name',)


class RaceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Race
        fields = ('race_name',)


class ArtifactSerializer(serializers.HyperlinkedModelSerializer):
    bonus1 = serializers.StringRelatedField(source='artifact_bonus_1.bon_name', read_only=True)
    race1 = serializers.StringRelatedField(source='artifact_bonus_1_race.race_name', read_only=True)
    bonus2 = serializers.StringRelatedField(source='artifact_bonus_2.bon_name', read_only=True)
    race2 = serializers.StringRelatedField(source='artifact_bonus_2_race.race_name', read_only=True)

    class Meta:
        model = Artifact
        fields = ('artifact_img', 'artifact_number', 'artifact_name', 'bonus1', 'race1', 'bonus2', 'race2')


class SetSerializer(serializers.HyperlinkedModelSerializer):
    setLevel = serializers.StringRelatedField(source='set_level', read_only=True)
    artifact1 = ArtifactSerializer(source='set_art_1')
    artifact2 = ArtifactSerializer(source='set_art_2')
    artifact3 = ArtifactSerializer(source='set_art_3')
    artifact4 = ArtifactSerializer(source='set_art_4')
    artifact5 = ArtifactSerializer(source='set_art_5')
    artifact6 = ArtifactSerializer(source='set_art_6')
    bonus1 = serializers.StringRelatedField(source='set_bonus_1.bon_name', read_only=True)
    race1 = serializers.StringRelatedField(source='set_bonus_1_race.race_name', read_only=True)
    value1 = serializers.StringRelatedField(source='set_bonus_1_value', read_only=True)
    bonus2 = serializers.StringRelatedField(source='set_bonus_2.bon_name', read_only=True)
    race2 = serializers.StringRelatedField(source='set_bonus_2_race.race_name', read_only=True)
    value2 = serializers.StringRelatedField(source='set_bonus_2_value', read_only=True)
    bonus3 = serializers.StringRelatedField(source='set_bonus_3.bon_name', read_only=True)
    race3 = serializers.StringRelatedField(source='set_bonus_3_race.race_name', read_only=True)
    value3 = serializers.StringRelatedField(source='set_bonus_3_value', read_only=True)
    bonus4 = serializers.StringRelatedField(source='set_bonus_4.bon_name', read_only=True)
    race4 = serializers.StringRelatedField(source='set_bonus_4_race.race_name', read_only=True)
    value4 = serializers.StringRelatedField(source='set_bonus_4_value', read_only=True)
    bonus5 = serializers.StringRelatedField(source='set_bonus_5.bon_name', read_only=True)
    race5 = serializers.StringRelatedField(source='set_bonus_5_race.race_name', read_only=True)
    value5 = serializers.StringRelatedField(source='set_bonus_5_value', read_only=True)
    bonus6 = serializers.StringRelatedField(source='set_bonus_6.bon_name', read_only=True)
    race6 = serializers.StringRelatedField(source='set_bonus_6_race.race_name', read_only=True)
    value6 = serializers.StringRelatedField(source='set_bonus_6_value', read_only=True)

    class Meta:
        model = Set
        fields = ('set_name', 'set_arts_number', 'setLevel',
                  'artifact1', 'artifact2', 'artifact3', 'artifact4', 'artifact5', 'artifact6',
                  'bonus1', 'race1', 'value1',
                  'bonus2', 'race2', 'value2',
                  'bonus3', 'race3', 'value3',
                  'bonus4', 'race4', 'value4',
                  'bonus5', 'race5', 'value5',
                  'bonus6', 'race6', 'value6')
