from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Track, Playlist
from .serializers import TrackSerializer, PlaylistSerializer, RegisterSerializer
from rest_framework.permissions import AllowAny

# Create your views here.

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]