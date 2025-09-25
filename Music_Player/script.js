const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const touchBtn = document.getElementById('touch-btn');
const player = document.getElementById('player');
const seek = document.getElementById('seek');
const nowPlaying = document.getElementById('now-playing');
const durationEl = document.getElementById('duration');

let isPlaying = false;
let seeking = false;


const track = {
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  src: 'music/blinding-lights.mp3'
};

audio.src = track.src;


audio.addEventListener('loadedmetadata', () => {
  seek.max = Math.floor(audio.duration);
  durationEl.textContent = `Duration: 0:00 / ${formatTime(audio.duration)}`;
});


audio.addEventListener('timeupdate', () => {
  if (!seeking) seek.value = Math.floor(audio.currentTime);
  durationEl.textContent = `Duration: ${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});


seek.addEventListener('input', () => { seeking = true; });
seek.addEventListener('change', () => {
  audio.currentTime = seek.value;
  seeking = false;
});


function togglePlay() {
  if (!isPlaying) {
    audio.play();
    playBtn.textContent = '⏸️';
    touchBtn.textContent = 'Pause Music';
    player.classList.add('playing');
    nowPlaying.textContent = `Now Playing: ${track.title} by ${track.artist}`;
    isPlaying = true;
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
    touchBtn.textContent = 'Play Music';
    player.classList.remove('playing');
    nowPlaying.textContent = `Paused: ${track.title}`;
    isPlaying = false;
  }
}


audio.addEventListener('ended', () => {
  playBtn.textContent = '▶️';
  touchBtn.textContent = 'Play Music';
  player.classList.remove('playing');
  nowPlaying.textContent = `Finished: ${track.title}`;
  isPlaying = false;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

playBtn.addEventListener('click', togglePlay);
touchBtn.addEventListener('click', togglePlay);
