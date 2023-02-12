// Variables
const musicTitle = document.querySelector(".music-info");

// playpause previous next
const prevBtn = document.querySelector(".previous-btn-wrapper");
const nextBtn = document.querySelector(".next-btn-wrapper");
const playPauseBtn = document.querySelector(".play-pause-btn-wrapper");
const addSongBtn = document.querySelectorAll(".add-song-btn-wrapper");
console.log(addSongBtn);

// timer config
let currentTime = document.querySelector(".current-time");
let musicSlider = document.querySelector(".music-slider");
let endTime = document.querySelector(".total-duration");

// volume
let volumeSlider = document.querySelector(".volume-slider");

// length of music
let length = 1;
// flag for play pause
let isPlaying = false;

// create new music object and set default music
let musicObj = document.createElement("audio");
musicObj.src =
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3";

// Update music slider
setInterval(updateMusicSlider, 500);

// update color for prev and next btn
changePrevNextColor();

/* ** Event Listner for various events ** */

// add song to playlist

addSongBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-song-btn-wrapper")) {
    console.log(e.target.innerHTML);
  }
});

// addSongBtn.addEventListener("click", () => {
//   let songName = document.querySelectorAll(".song-name");
//   let songUrl = document.querySelectorAll(".song-path");
//   //dll.push(songName, length++, songUrl);
//   console.log(songName[1].textContent, songUrl[1].textContent);
//   dll.display();
// });

// event listner for play pause
playPauseBtn.addEventListener("click", () => {
  //console.log(musicObj.duration);
  playpauseTrack();
});

// event listner for next music button
nextBtn.addEventListener("click", () => {
  isPlaying = false;
  const resultObj = dll.traverse(1);

  if (resultObj != 0) {
    musicObj.src = resultObj.path;
    playpauseTrack();
  }
  changeMusicTitle(resultObj.name);
  changePrevNextColor();
});

// event listner for previous button
prevBtn.addEventListener("click", () => {
  isPlaying = false;
  const resultObj = dll.traverse(-1);

  if (resultObj != 0) {
    musicObj.src = resultObj.path;
    playpauseTrack();
  }
  changeMusicTitle(resultObj.name);
  changePrevNextColor();
});

// event listner for changing volume of music
volumeSlider.addEventListener("change", () => {
  musicObj.volume = volumeSlider.value / 100;
});

// event listner for changing position of music
musicSlider.addEventListener("change", () => {
  changeMusicPos();
});
