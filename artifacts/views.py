from .models import HitCount, Set, SetType, Artifact, ArtifactLevel, Bonus, Race
from rest_framework import viewsets
from .serializers import HitCountSerializer, SetTypeSerializer, SetSerializer, ArtifactSerializer, ArtifactLevelSerializer, \
    BonusSerializer, RaceSerializer
from django.db.models import F
from django.http import JsonResponse


class HitCountViewSet(viewsets.ModelViewSet):
    queryset = HitCount.objects.all()
    serializer_class = HitCountSerializer

    # Getting visitor counter and increment it after GET request
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        HitCount.objects.filter(pk=instance.id).update(visits=F('visits') + 1)
        serializer = self.get_serializer(instance)
        return JsonResponse(serializer.data)


class SetTypeViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows sets types to be viewed.
        """
    queryset = SetType.objects.all()
    serializer_class = SetTypeSerializer


class SetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sets to be viewed.
    """
    queryset = Set.objects.all()
    serializer_class = SetSerializer


class ArtifactViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows artifacts to be viewed.
    """
    queryset = Artifact.objects.all()
    serializer_class = ArtifactSerializer


class ArtifactLevelViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows artifacts levels to be viewed.
    """
    queryset = ArtifactLevel.objects.all()
    serializer_class = ArtifactLevelSerializer


class BonusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows bonus to be viewed.
    """
    queryset = Bonus.objects.all()
    serializer_class = BonusSerializer


class RaceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows races to be viewed.
    """
    queryset = Race.objects.all()
    serializer_class = RaceSerializer
