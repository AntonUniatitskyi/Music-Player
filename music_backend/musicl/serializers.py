from rest_framework import serializers
from .models import Track, Playlist
from django.contrib.auth.models import User

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = "__all__"
        read_only_fields = ('title', 'artist')

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = "__all__"

class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only = True)
    password2 = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({"password": "Паролі не збігаються!"})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password1']
        )
        return user