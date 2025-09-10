from django.db import models
import os
from django.contrib.auth.models import User

# Create your models here.
class Track(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=True)
    artist = models.CharField(max_length=200, blank=True)
    audio_file = models.FileField(upload_to='tracks/')
    cover_image = models.ImageField(upload_to='covers/', null=True, blank=True)

    def __str__(self):
        return f"{self.title} - {self.artist}"

    def save(self, *args, **kwargs):
        if self.audio_file and not self.title and not self.artist:
            filename = os.path.splitext(os.path.basename(self.audio_file.name))[0]
            try:
                if ' - ' in filename:
                    artist, title = filename.split(' - ', 1)
                    self.artist = artist.strip()
                    self.title = title.strip()
                elif '-' in filename:
                    artist, title = filename.split('-', 1)
                    self.artist = artist.strip()
                    self.title = title.strip()
                elif ' by ' in filename:
                    title, artist = filename.split(' by ', 1)
                    self.artist = artist.strip()
                    self.title = title.strip()
                else:
                    self.artist = 'Unknown Artist'
                    self.title = filename
            except Exception as e:
                self.artist = 'Unknown Artist'
                self.title = filename
                print(f"Error parsing filename: {e}")
        super().save(*args, **kwargs)

class Playlist(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    tracks = models.ManyToManyField(Track, blank=True)

    def __str__(self):
        return self.name