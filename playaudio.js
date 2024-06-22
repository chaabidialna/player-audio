// Constants
const PROGRESS_BAR_WIDTH = 100;
const VOLUME_DEFAULT = 0.5;

// Selectors
const audioElement = document.getElementById('audio-element');
const progressBar = document.getElementById('progress-bar');
const progressStart = document.getElementById('progress-start');
const progressEnd = document.getElementById('progress-end');
const volumeSlider = document.getElementById('volume-slider');

// Récupérer les éléments HTML
const songImage = document.getElementById('song-image');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songDuration = document.getElementById('song-duration');

// Définir les détails de la chanson
if (songImage) {
  songImage.src = 'http://chemin de l'image';
}
if (songTitle) {
  songTitle.textContent = 'Titre de la chanson';
}
if (songArtist) {
  songArtist.textContent = 'Nom de l'artiste';
}

// Charger le fichier audio
if (audioElement) {
  audioElement.src = 'http://chemin du fichier mp3';
}

// Fonction pour formatter le temps en minutes et secondes
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Mettre à jour la durée de la chanson
audioElement.addEventListener('loadedmetadata', () => {
  if (songDuration) {
    songDuration.textContent = formatTime(audioElement.duration);
  }
});

// Audio player class
class AudioPlayer {
  constructor(audioElement) {
    this.audioElement = audioElement;
    this.progressIndicator = document.getElementById('progress-indicator');
    this.progressStartTime = document.getElementById('progress-start-time');
    this.progressEndTime = document.getElementById('progress-end-time');
    this.songDuration = document.getElementById('song-duration');
  }

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }

  stop() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
  }

  updateSongDuration() {
    if (this.songDuration) {
      this.songDuration.textContent = formatTime(this.audioElement.duration);
    }
  }

  updateProgressBar() {
    const progress = (this.audioElement.currentTime / this.audioElement.duration) * 100;
    if (this.progressIndicator) {
      this.progressIndicator.style.width = `${progress}%`;
    }
    if (this.progressStartTime) {
      this.progressStartTime.textContent = formatTime(this.audioElement.currentTime);
    }
    if (this.progressEndTime) {
      this.progressEndTime.textContent = formatTime(this.audioElement.duration);
    }
  }
}

// Create audio player instance
const audioPlayer = new AudioPlayer(audioElement);

// Add event listeners
audioElement.addEventListener('timeupdate', () => {
  audioPlayer.updateProgressBar();
});
audioElement.addEventListener('loadedmetadata', () => {
  audioPlayer.updateSongDuration();
  audioPlayer.updateProgressBar();
});

// Set default volume
audioElement.volume = VOLUME_DEFAULT;
volumeSlider.value = VOLUME_DEFAULT;

// Add event listener for volume slider
volumeSlider.addEventListener('input', () => {
  audioElement.volume = volumeSlider.value;
});

// Add event listener for play button
document.getElementById('play-button').addEventListener('click', () => {
  audioPlayer.play();
});

// Add event listener for pause button
document.getElementById('pause-button').addEventListener('click', () => {
  audioPlayer.pause();
});

// Add event listener for stop button
document.getElementById('stop-button').addEventListener('click', () => {
  audioPlayer.stop();
});
