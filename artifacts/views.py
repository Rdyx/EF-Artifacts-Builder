from .models import Set, Artifact, ArtifactLevel, Bonus, Race
from rest_framework import viewsets
from rest_framework.decorators import api_view
from .serializers import SetSerializer, ArtifactSerializer, ArtifactLevelSerializer, BonusSerializer, RaceSerializer

# @api_view(['GET'])
# def my_api_view(request, format=None):


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
