import playList from './playList.js';
import { greetingsList, dayTimes, placeholders, settingsTitles } from './sets.js';
import {
  date, time, greeting, nameInput, body, prevBtn, nextBtn, cityInput, weatherIcon, weatherError,
  temperature, humidity, weatherDescription, windSpeed, settingsList, settingsBlock, settingsCloseBtn,
  settingsBtn, settingsSwitchBtns, switchableBlocks, player, playPauseBtn, prevButton, nextButton,
  timeline, progress, trackCurrentTime, trackName, trackLength, volumeBtn, volume,
  volumeSlider, itemsList, itemsListBtns, quote, quoteAuthor, changeQuote, langBtns
} from './constants.js';

let userSettings = {
  player: true,
  weather: true,
  quotes: true,
  time: true,
  date: true,
  greeting: true,
  todo: true
}


let currentLanguage = localStorage.getItem('lang') || 'en';
let bgSettings = JSON.parse(localStorage.getItem('bg-settings')) || { github: true, unsplash: false, flickr: false };


// ---------------TRANSLATION---------------

function changeLanguage() {
  for (let i = 0; i < langBtns.length; i++) {
    if (langBtns[i].checked) {
      currentLanguage = langBtns[i].getAttribute('id');
      getWeather();
      showCurrentDate();
      getQuotes();
      changeSettingLang();
      nameInput.setAttribute('placeholder', placeholders.name[currentLanguage]);
      cityInput.setAttribute('placeholder', placeholders.city[currentLanguage]);
      todoInput.setAttribute('placeholder', placeholders.todo[currentLanguage])
      if (cityInput.value === placeholders.defaultСity.en || cityInput.value === placeholders.defaultСity.ru) {
        cityInput.value = placeholders.defaultСity[currentLanguage];
      }

    }
  }
}

function changeSettingLang() {
  for (let key in settingsTitles[currentLanguage]) {
    let settingItem = document.querySelector(`[setting-name="${key}"]`);
    if (settingItem) {
      settingItem.innerHTML = settingsTitles[currentLanguage][key];
    }
  }
}
changeSettingLang();

langBtns.forEach(el => el.addEventListener('click', changeLanguage));

function getCurrentLanguage() {
  for (let i = 0; i < langBtns.length; i++) {
    if (langBtns[i].getAttribute('id') === currentLanguage) {
      langBtns[i].setAttribute('checked', '');
    }
  }
}
getCurrentLanguage();

// ---------------SETTINGS---------------

function setUserSettings(event) {
  let target = event.target;
  if (target.classList.contains('settings-switch')) {
    let name = target.getAttribute('switch-name');
    target.classList.toggle('visible');
    for (let i = 0; i < switchableBlocks.length; i++) {
      if (switchableBlocks[i].getAttribute('block-name') === name) {
        if (!target.classList.contains('visible')) {
          switchableBlocks[i].classList.add('hidden');
          userSettings[name] = false;
        }
        else {
          switchableBlocks[i].classList.remove('hidden');
          userSettings[name] = true;
        }
      }
    }
  }
}


function getUserSettings() {
  for (let key in userSettings) {
    for (let i = 0; i < settingsSwitchBtns.length; i++) {
      if (settingsSwitchBtns[i].getAttribute('switch-name') === key) {
        if (userSettings[key] === true) {
          settingsSwitchBtns[i].classList.add('visible');
        }
        else {
          settingsSwitchBtns[i].classList.remove('visible');
        }
      }
    }
    for (let j = 0; j < switchableBlocks.length; j++) {
      if (switchableBlocks[j].getAttribute('block-name') === key) {
        if (userSettings[key] === true) {
          switchableBlocks[j].classList.remove('hidden');
        }
        else {
          switchableBlocks[j].classList.add('hidden');
        }
      }
    }
  }
}

settingsBtn.addEventListener('click', () => {
  settingsBlock.classList.toggle('visible-settings');
});

settingsCloseBtn.addEventListener('click', () => {
  settingsBlock.classList.remove('visible-settings');
});


settingsList.addEventListener('click', (event) => {
  setUserSettings(event);
});

// ---------------local storage and placeholders---------------
function setLocalStorage() {
  localStorage.setItem('name', nameInput.value);
  localStorage.setItem('city', cityInput.value);
  localStorage.setItem('userSettings', JSON.stringify(userSettings));
  localStorage.setItem('lang', currentLanguage);
}

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    nameInput.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('userSettings')) {
    userSettings = JSON.parse(localStorage.getItem('userSettings'));
  }
  if (localStorage.getItem('city')) {
    cityInput.value = localStorage.getItem('city');
  }
  else if (!cityInput.value) {
    cityInput.value = placeholders.defaultСity[currentLanguage];

  }
  getWeather();
}


function setPlaceholder(event, placeholderValue) {
  if (!event.target.value) {
    event.target.setAttribute('placeholder', placeholderValue);
  }
}
cityInput.addEventListener('input', (event) => {
  setPlaceholder(event, `${placeholders.city[currentLanguage]}`);
});

nameInput.addEventListener('input', (event) => {
  setPlaceholder(event, `${placeholders.name[currentLanguage]}`);
});


// ---------------CLOCK---------------
function showCurrentTime() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  time.innerHTML = currentTime;
  getTimeOfDay();
  textContent();
  setTimeout(showCurrentTime, 1000);
}

showCurrentTime();

// ---------------DATE---------------
function showCurrentDate() {
  const newDate = new Date();
  const dateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
    timeZone: 'UTC'
  };
  const currentDate = newDate.toLocaleDateString(`${currentLanguage}`, dateOptions);
  date.innerHTML = currentDate;
}

showCurrentDate();

// ---------------GREETING---------------

function getTimeOfDay() {
  const date = new Date();
  const hour = date.getHours();
  const minutes = hour * 60 + date.getMinutes();
  let timeOfDay;

  if (minutes <= 359 || minutes === 1440) {
    timeOfDay = 0;
  }
  else if (minutes >= 360 && minutes < 720) {
    timeOfDay = 1;
  }
  else if (minutes >= 720 && minutes < 1080) {
    timeOfDay = 2;
  }
  else if (minutes >= 1080 && minutes < 1439) {
    timeOfDay = 3;
  }

  return timeOfDay;
}

function textContent() {
  const dayTime = getTimeOfDay();
  greeting.innerHTML = `${greetingsList[currentLanguage][dayTime]},`;
}


// ---------------BACKGROUND---------------
const changeBgBtns = document.querySelectorAll('.background-btn');

// random number for github images
let randomNum;
let min = 1;
let max = 20;

function getRandom() {
  randomNum = Math.floor(Math.random() * (max - min + 1) + min);
}
getRandom();

// get images from GitHub
function getLinkGitHub() {
  const img = new Image();
  const bgNum = randomNum.toString().padStart(2, '0');
  const dayTime = getTimeOfDay();
  const bgSet = dayTimes[dayTime];
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${bgSet}/${bgNum}.jpg`;

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  })
}
// get images from Unsplash API
async function getLinkUnsplash() {
  const dayTime = getTimeOfDay();
  const bgSet = dayTimes[dayTime];
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature-${bgSet}&client_id=W39_ghpGd1W4LcOt7Rh53oW-EtT8XyE-FS8EUWQCvb0`;
  const res = await fetch(url);
  const data = await res.json();
  const imageLink = data.urls.regular;
  const img = new Image();
  img.src = imageLink;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  })
}

//
async function getLinkFlickr() {
  const dayTime = getTimeOfDay();
  const bgSet = dayTimes[dayTime];
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=571449004fe14762a2a51b103326825c&tags=${bgSet}&extras=url_h&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    await fetch(url);
  }
  const min = 0;
  const max = data.photos.photo.length - 1;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  const imageLink = data.photos.photo[random].url_h;
  const img = new Image();
  img.src = imageLink;
  img.addEventListener('load', () => {
    body.style.backgroundImage = `url(${img.src})`;
  })
}

// set background 

function setBg() {
  for (let key in bgSettings) {
    if (key === 'github' && bgSettings[key]) {
      document.getElementById(`${key}`).classList.add('background-btn-active');
      getLinkGitHub();
    }
    if (key === 'unsplash' && bgSettings[key]) {
      document.getElementById(`${key}`).classList.add('background-btn-active');
      getLinkUnsplash();
    }
    if (key === 'flickr' && bgSettings[key]) {
      document.getElementById(`${key}`).classList.add('background-btn-active');
      getLinkFlickr();
    }
  }
}
setBg();



// bg slider
function getNextSlide() {
  if (bgSettings.github) {
    if (randomNum < 20) {
      randomNum++;
    }
    else if (randomNum === 20) {
      randomNum = 1;
    }
  }
  setBg();
}

function getPrevSlide() {
  if (bgSettings.github) {
    if (randomNum > 1) {
      randomNum--;
    }
    else if (randomNum === 1) {
      randomNum = 20;
    }
  }
  setBg();
}

nextBtn.addEventListener('click', getNextSlide);
prevBtn.addEventListener('click', getPrevSlide);

function changeBgSrc(event) {
  changeBgBtns.forEach(el => {
    let btnName = el.getAttribute('id');
    bgSettings[btnName] = false;
    el.classList.remove('background-btn-active');
  })
  let targetName = event.target.getAttribute('id');
  event.target.classList.add('background-btn-active');
  bgSettings[targetName] = true;
  setBg(event.target);
  localStorage.setItem('bg-settings', JSON.stringify(bgSettings));
}

changeBgBtns.forEach(el => {
  el.addEventListener('click', (event) => {
    if (!el.classList.contains('background-btn-active')) {
      changeBgSrc(event);
    }
  });
})

function setActiveBtn() {
  changeBgBtns.forEach(el => el.classList.remove('background-btn-active'));
  for (let key in bgSettings) {
    for (let i = 0; i < changeBgBtns.length; i++) {
      if (bgSettings[key] && changeBgBtns[i].getAttribute('id') === key) {
        changeBgBtns[i].classList.add('background-btn-active');
      }
    }
  }
}


// ---------------WEATHER---------------
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${currentLanguage}&appid=46b8ac36daebc5bc6d2d60f501fcdd1b&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherError.innerHTML = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherDescription.innerHTML = `${(data.weather[0].description)}`;
    let temp = 'Temperature';
    let hum = 'Humidity';
    let wind = 'Wind speed';
    if (currentLanguage === 'ru') {
      temp = 'Температура';
      hum = 'Влажность';
      wind = 'Скорость ветра';
    }
    temperature.innerHTML = `${temp}: ${Math.round(data.main.temp)}℃`;
    humidity.innerHTML = `${hum}: ${Math.round(data.main.humidity)}%`;
    windSpeed.innerHTML = `${wind}: ${Math.round(data.wind.speed)} m/s`;
  }
  catch (err) {
    if (currentLanguage === 'ru') {
      weatherError.innerHTML = 'Ошибка! Город не найден';
    }
    else {
      weatherError.innerHTML = 'Error! City not found';
    }
    weatherDescription.innerHTML = '';
    temperature.innerHTML = '';
    humidity.innerHTML = '';
    windSpeed.innerHTML = '';
  }
}

cityInput.addEventListener('change', getWeather);

// ---------------PLAYER---------------

let trackIndex = 0;
let isAudioPaused = true;
const audio = new Audio();

playPauseBtn.addEventListener('click', () => {
  isAudioPaused = player.classList.contains('paused');
  if (isAudioPaused) {
    pauseMusic();
  }
  else {
    playMusic();
  }
});

// load first track
function loadMusic(index) {
  trackName.textContent = `${playList[index].artist} - ${playList[index].title}`;
  trackLength.textContent = playList[index].duration;
  audio.src = `../assets/sounds/${playList[index].src}.mp3`;
  audio.volume = 0.5;
}

// add playlist
function createPlaylist(playlist) {
  const playItems = document.querySelector('.play-list');
  let item = '';
  for (let key in playlist) {
    item += `<li class="play-item">
    <span class="play-item__btn material-icons md-18" item-index="${key}">play_circle</span>
    <span class="play-item__title">${playlist[key].artist} - ${playlist[key].title} / ${playlist[key].duration}</span>
   </li>`;
    playItems.innerHTML = item;
  }
}

// play music
function playMusic() {
  for (let i = 0; i < itemsListBtns.length; i++) {
    itemsListBtns[i].textContent = 'play_circle';
    itemsList[i].classList.remove('playing');
  }
  player.classList.add('paused');
  playPauseBtn.classList.add('pause');
  itemsListBtns[trackIndex].textContent = 'pause_circle';
  itemsList[trackIndex].classList.add('playing');
  audio.play();
}

// stop music
function pauseMusic() {
  player.classList.remove('paused');
  playPauseBtn.classList.remove('pause');
  itemsListBtns[trackIndex].textContent = 'play_circle';
  audio.pause();
}

// play next track
function playNextTrack() {
  trackIndex++;
  if (trackIndex < playList.length) {
    trackIndex = trackIndex;
  }
  else {
    trackIndex = 0;
  }
  loadMusic(trackIndex);
  playMusic();
}

nextButton.addEventListener('click', () => {
  playNextTrack();
});

// play previos track
function playPrevTrack() {
  trackIndex--;
  if (trackIndex >= 0) {
    trackIndex = trackIndex;
  }
  else {
    trackIndex = playList.length - 1;
  }
  loadMusic(trackIndex);
  playMusic();
}

prevButton.addEventListener('click', () => {
  playPrevTrack();
});

// update progress bar  
audio.addEventListener('timeupdate', (event) => {
  let currentTime = event.target.currentTime;
  let duration = event.target.duration;
  progress.style.width = `${(currentTime / duration) * 100}%`;
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
  trackCurrentTime.textContent = `${currentMin}:${currentSec}`;
});

timeline.addEventListener('click', (event) => {
  let trackDuration = audio.duration;
  let timelineWidth = timeline.clientWidth;
  let clickedOffSetX = event.offsetX;
  audio.currentTime = (clickedOffSetX / timelineWidth) * trackDuration;
  playMusic();
})

// playlist looping
audio.addEventListener('ended', () => {
  playNextTrack();
})


// off/on sound 
let currentVolume = audio.volume;
let currentVolumeWidth = `50%`;


function soundOff() {
  console.log(currentVolumeWidth);
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeBtn.classList.add('sound-off');
    volume.style.width = '0';
  }
  else {
    audio.volume = currentVolume;
    volumeBtn.classList.remove('sound-off');
    volume.style.width = currentVolumeWidth;
  }
}
volumeBtn.addEventListener('click', soundOff);


volumeSlider.addEventListener('click', (event) => {
  let clickedOffSetX = event.offsetX;
  let volumeSliderWidth = volumeSlider.clientWidth;
  audio.volume = clickedOffSetX / volumeSliderWidth;
  currentVolume = audio.volume;
  currentVolumeWidth = `${(clickedOffSetX / volumeSliderWidth) * 100}%`;
  volume.style.width = currentVolumeWidth;
  if (audio.volume) {
    volumeBtn.classList.remove('sound-off');
  }
  else {
    volumeBtn.classList.add('sound-off');
  }
})



function playNow(button) {
  let itemIndex = button.getAttribute('item-index');
  if (itemIndex === trackIndex && !audio.paused) {
    pauseMusic();
  }
  else {
    trackIndex = itemIndex;
    loadMusic(trackIndex);
    playMusic();
  }
}

// ---------------QUOTES---------------

async function getQuotes() {
  const quotesSrc = `../assets/quotes/quotes-${currentLanguage}.json`;
  const res = await fetch(quotesSrc);
  const data = await res.json();
  const randomQuote = getRandomQuote(0, data.length - 1);
  quote.textContent = `"${data[randomQuote].text}"`;
  quoteAuthor.textContent = data[randomQuote].from;
}

function getRandomQuote(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
}
changeQuote.addEventListener('click', getQuotes);

// ---------------ToDo---------------
const todoBlock = document.querySelector('.todo-wrapper');
const todoCloseBtn = document.querySelector('.todo-close');
const todoBtn = document.querySelector('.todo-icon');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoFilters = document.querySelectorAll('.todo-filters-item');
let editIndex;
let isEdited = false;
let todo = JSON.parse(localStorage.getItem('todo-list'));

function showTodoItems(filter) {
  let li = '';
  if (todo) {
    todo.forEach((el, index) => {
      li += `<li class="todo-item">
                <label for="${index}">
                  <input type="checkbox" id="${index}" class="todo-checkbox">
                  <p>${el.name}</p>
                </label>
                <div class="todo-item-controls">
                  <span class="material-icons item-delete">delete_forever</span>
                  <span class="material-icons item-edit" index="${index}">edit</span>
                </div>
             </li>`;
      todoList.innerHTML = li;
    })
  }
}
showTodoItems();


function changeItemStatus(item) {
  let nameTask = item.nextElementSibling;
  if (item.checked) {
    nameTask.classList.add('checked');
    todo[item.id].status = 'completed';
    item.classList.add('completed');

  }
  else {
    nameTask.classList.remove('checked');
    todo[item.id].status = 'pending';
    if (item.classList.contains('completed')) {
      item.classList.remove('completed');
    }
  }
  localStorage.setItem('todo-list', JSON.stringify(todo));
}

function deleteItem(item) {
  todo.splice(item.index, 1);
  localStorage.setItem('todo-list', JSON.stringify(todo));
  item.parentNode.parentNode.remove();
}
function editItem(item, index) {
  editIndex = index;
  isEdited = true;
  todoInput.value = todo[index].name;
  todo[index].name = todoInput.value;
  item.parentNode.previousElementSibling.lastElementChild.innerHTML = todoInput.value;
}


body.addEventListener('click', (event) => {
  if (event.target.classList.contains('item-delete')) {
    deleteItem(event.target);
  }
  if (event.target.classList.contains('todo-checkbox')) {
    changeItemStatus(event.target);
  }
  if (event.target.classList.contains('item-edit')) {
    editItem(event.target, event.target.getAttribute('index'));
  }
  if (event.target.classList.contains('play-item__btn')) {
    playNow(event.target);
  }
})

todoInput.addEventListener('keyup', (event) => {
  let newTask = todoInput.value.trim();
  if (event.key === 'Enter' && newTask) {
    if (!isEdited) {
      if (!todo) {
        todo = [];
      }
      let taskInfo = {
        name: newTask,
        status: 'pending',
      }
      todo.push(taskInfo);
      localStorage.setItem('todo-list', JSON.stringify(todo));
    }
    else {
      todo[editIndex].name = newTask;
    }
    showTodoItems();
    todoInput.value = '';
  }
})

todoFilters.forEach(el => {
  el.addEventListener('click', () => {
    document.querySelector('.todo-filters-item.active').classList.remove('active');
    el.classList.add('active');
    showTodoItems(el.id);
  })
})

todoBtn.addEventListener('click', (event) => {
  todoBlock.classList.toggle('visible-todo');
});

todoCloseBtn.addEventListener('click', () => {
  todoBlock.classList.remove('visible-todo');
});

window.addEventListener('load', () => {
  getQuotes();
  loadMusic(trackIndex);
  setActiveBtn();
});

window.addEventListener('beforeunload', setLocalStorage);
document.addEventListener('DOMContentLoaded', () => {
  getLocalStorage();
  getUserSettings();
  createPlaylist(playList);
  if (!nameInput.value) {
    nameInput.setAttribute('placeholder', `${placeholders.name[currentLanguage]}`);
  }
  if (!todoInput.value) {
    todoInput.setAttribute('placeholder', `${placeholders.todo[currentLanguage]}`);
  }
});
