const songs = [
    {
        title: "Shadow Walk",
        artist: "Sigma Beats",
        src: "songs/Shadow Walk.mp3",
        cover: "image/album.jfif"
    },
    {
        title: "Savage Path",
        artist: "Sigma Beats",
        src: "songs/Savage Path.mp3",
        cover: "image/album.jfif"
    },
    {
        title: "Lone Wolf",
        artist: "Sigma Beats",
        src: "songs/Lone Wolf.mp3",
        cover: "image/album.jfif"
    },
    {
        title: "Cold Blood",
        artist: "Sigma Beats",
        src: "songs/Cold Blood.mp3",
        cover: "image/album.jfif"
    },
    {
        title: "Dark Aura",
        artist: "Sigma Beats",
        src: "songs/Dark Aura.mp3",
        cover: "image/album.jfif"
    },
    {
        title: "Rise Alone",
        artist: "Sigma Beats",
        src: "songs/Rise Alone.mp3",
        cover: "image/album.jfif"
    }
];

const audio = document.getElementById("audio");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const albumArt = document.getElementById("albumArt");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationTimeEl = document.getElementById("durationTime");

const volumeBar = document.getElementById("volumeBar");
const playlistToggle = document.getElementById("playlistToggle");
const playlistEl = document.getElementById("playlist");

let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.cover;
    highlightActiveSong();
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

function nextSong() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active-btn", isShuffle);
});

repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active-btn", isRepeat);
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener("loadedmetadata", () => {
    durationTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
});
audio.volume = volumeBar.value / 100; // set default volume

audio.addEventListener("ended", () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

playlistToggle.addEventListener("click", () => {
    playlistEl.classList.toggle("active");
});

function renderPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            currentIndex = index;
            loadSong(currentIndex);
            playSong();
        });
        playlistEl.appendChild(li);
    });
    highlightActiveSong();
}

function highlightActiveSong() {
    const items = playlistEl.querySelectorAll("li");
    items.forEach((item, index) => {
        item.classList.toggle("playing", index === currentIndex);
    });
}

loadSong(currentIndex);
renderPlaylist();
