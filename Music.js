const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume');
const volumeBtn = document.getElementById('volume-btn');

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Update progress bar and time as audio plays
audio.addEventListener('timeupdate', () => {
    const current = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (current / duration) * 100;
    
    progressBar.value = progressPercent;
    currentTimeEl.textContent = formatTime(current);
    
    if (duration) {
        durationEl.textContent = formatTime(duration);
    }
});

// Seek to position when progress bar is changed
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Volume control
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
    volumeBtn.textContent = audio.volume > 0.5 ? '🔊' : audio.volume > 0 ? '🔉' : '🔇';
});

// Auto-pause button text on load
audio.addEventListener('ended', () => {
    playPauseBtn.textContent = 'Play';
});

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Load metadata when audio is ready
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});
