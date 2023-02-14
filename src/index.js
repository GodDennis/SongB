import birdsData from './data.js';
import './nullstyle.css';
import './index.css';
const navItem = document.querySelectorAll('.nav__link');
const warmup = document.querySelector('.wurmap');
const passerines = document.querySelector('.passerines');
const forest = document.querySelector('.forest');
const singing = document.querySelector('.singing');
const dangerous = document.querySelector('.dangerous');
const sea = document.querySelector('.sea');
const birdImage = document.querySelector('.bird-image');
const audio = document.querySelector('.audio');
const bird = document.querySelectorAll('.answer-item');
const cardBody = document.querySelector('.card-body');
const cardImage = document.querySelector('.card-image');
const itemName = document.querySelector('.item-name');
const famaly = document.querySelector('.famaly');
const audioChoice = document.querySelector('.audio-choice');
const text = document.querySelector('.text');
const discripItem = document.querySelectorAll('.discrip-item');
const playbar = document.querySelectorAll('.playbar');
const TimebarCircle = document.querySelectorAll('.timebar-circle');
const current = document.querySelectorAll('.current');
const durationplay = document.querySelectorAll('.durationplay');
const timebarBar = document.querySelectorAll('.timebar-bar');
const BirdImage = document.querySelector('.bird-image');
const NameItem = document.querySelector('.name-item');
const wasted = document.querySelector('.wasted');
const win = document.querySelector('.win');
const score = document.querySelector('.count-score');
const change = document.querySelector('.change');
let index = 0;
let randomIndex = Math.floor(Math.random() * 6);
//  Добавление названиия птиц в блок answer

let acc = 0;
let res;

function counts() {
  return a++;
}
warmup.addEventListener('click', () => {
  index = 0;
  rename();
  init();
});
passerines.addEventListener('click', () => {
  index = 1;
  rename();
  init();
});
forest.addEventListener('click', () => {
  index = 2;
  rename();
  init();
});
singing.addEventListener('click', () => {
  index = 3;
  rename();
  init();
});
dangerous.addEventListener('click', () => {
  index = 4;
  rename();
  init();
});
sea.addEventListener('click', () => {
  index = 5;
  rename();
  init();
});

let b = counts;
function init() {
  for (let i = 0; i < bird.length; i++) {
    audio.src = birdsData[index][randomIndex].audio;
    bird[i].textContent = birdsData[index][i].name;
    bird[i].addEventListener('click', function () {
      audioChoice.classList.remove('play');
      audioChoice.src = birdsData[index][i].audio;
      if (bird[i].textContent == birdsData[index][i].name) {
        cardImage.src = birdsData[index][i].image;
        famaly.textContent = birdsData[index][i].species;
        itemName.textContent = birdsData[index][i].name;
        text.textContent = birdsData[index][i].description;
        discripItem[0].style.display = 'none';
        discripItem[1].style.display = 'none';
        cardBody.style.display = 'flex';
      }
    });

    // TODO check status
    bird[i].addEventListener('click', () => {
      if (birdsData[index][randomIndex].name == bird[i].textContent) {
        NameItem.textContent = birdsData[index][randomIndex].name;
        BirdImage.src = birdsData[index][randomIndex].image;
        // win.play();
        bird[i].style.backgroundColor = 'green';
        setTimeout(() => {
          bird[i].style.backgroundColor = '#303030';
        }, 1500);
      } else {
        bird[i].style.backgroundColor = 'red';
        setTimeout(() => {
          bird[i].style.backgroundColor = '#303030';
        }, 1500);
        // wasted.play();
      }
    });
  }

  // nav next
  for (let i = 0; i < navItem.length; i++) {
    if (i === index) {
      navItem[i].classList.add('active');
    } else {
      navItem[i].classList.remove('active');
    }
  }
}
//count score

// Play and pause

function PlaySong() {
  audio.classList.add('play');
  audio.play();
  PauseSongAudioChoice();
}

function PauseSong() {
  audio.classList.remove('play');
  audio.pause();
}
function play(item) {
  item.addEventListener('click', () => {
    const isPlay = audio.classList.contains('play');
    if (isPlay) {
      PauseSong();
    } else {
      PlaySong();
    }
  });
}
play(playbar[0]);

// hidden player
function PlaySongAudioChoice() {
  audioChoice.classList.add('play');
  audioChoice.play();
  PauseSong();
}

function PauseSongAudioChoice() {
  audioChoice.classList.remove('play');
  audioChoice.pause();
}
function playAudioChoice(item) {
  item.addEventListener('click', () => {
    const isPlay = audioChoice.classList.contains('play');
    if (isPlay) {
      PauseSongAudioChoice();
    } else {
      PlaySongAudioChoice();
    }
  });
}
playAudioChoice(playbar[1]);

//ProgresBar

function timebar(elem, dur, curr) {
  let currentMinutes = Math.floor(elem.currentTime / 60);
  let currentSeconds = Math.floor(elem.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(elem.duration / 60);
  let durationSeconds = Math.floor(elem.duration - durationMinutes * 60);
  if (!isNaN(elem.duration)) {
    if (currentSeconds < 10) {
      currentSeconds = '0' + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = '0' + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = '0' + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = '0' + durationMinutes;
    }
    curr.textContent = currentMinutes + ':' + currentSeconds;
    dur.textContent = durationMinutes + ':' + durationSeconds;
  }
}

//move circle in bar

function updatebar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressduration = (currentTime / duration) * 100;
  TimebarCircle[0].style.left = `${progressduration}%`;
  timebar(audio, durationplay[0], current[0]);
}
audio.addEventListener('timeupdate', updatebar);

//move circle in hidder bar

function updatebarChoice(e) {
  const { duration, currentTime } = e.srcElement;
  const progressduration = (currentTime / duration) * 100;
  TimebarCircle[1].style.left = `${progressduration}%`;
  timebar(audioChoice, durationplay[1], current[1]);
}
audioChoice.addEventListener('timeupdate', updatebarChoice);

//culc progress in bar

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
timebarBar[0].addEventListener('click', setProgress);

function setProgressChoice(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioChoice.duration;
  audioChoice.currentTime = (clickX / width) * duration;
}
timebarBar[1].addEventListener('click', setProgressChoice);

init();
// NEXT LVL
function rename() {
  NameItem.textContent = '*******';
  BirdImage.src = 'img/bird.06a46938.jpg';
}
change.addEventListener('click', () => {
  audioChoice.classList.remove('play');
  index++;
  if (index == 6) {
    index = 0;
  }
  rename();
  init();
  discripItem[0].style.display = 'block';
  discripItem[1].style.display = 'block';
  cardBody.style.display = 'none';
  audio.pause();
  audioChoice.pause();
});
