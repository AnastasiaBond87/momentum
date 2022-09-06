// ---------------CONSTANTS---------------
// date and time
const date = document.querySelector('.date');
const time = document.querySelector('.time');

// greeting
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');

// background
const body = document.querySelector('.body');
const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');

// weather
const cityInput = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');

// settings
const settingsList = document.querySelector('.settings-list');
const settingsBlock = document.querySelector('.settings-container');
const settingsCloseBtn = document.querySelector('.settings-close');
const settingsBtn = document.querySelector('.settings-icon');
const settingsSwitchBtns = document.querySelectorAll('[switch-name]');
const switchableBlocks = document.querySelectorAll('[block-name]');

// player
const player = document.querySelector('.player');
const playPauseBtn = document.querySelector('.play');
const prevButton = document.querySelector('.play-prev');
const nextButton = document.querySelector('.play-next');
const timeline = document.querySelector('.timeline');
const progress = document.querySelector('.progress');
const trackCurrentTime = document.querySelector('.current-time');
const trackName = document.querySelector('.track-name');
const trackLength = document.querySelector('.length');
const volumeBtn = document.querySelector('.volume-button');
const volume = document.querySelector('.volume-percentage');
const volumeSlider = document.querySelector('.volume-slider');
const itemsList = document.getElementsByClassName('play-item');
const itemsListBtns = document.getElementsByClassName('play-item__btn');


// quotes
const quote = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

// language 
const langBtns = document.getElementsByName('language');

export {
  date, time, greeting, nameInput, body, prevBtn, nextBtn, cityInput, weatherIcon, weatherError,
  temperature, humidity, weatherDescription, windSpeed, settingsList, settingsBlock, settingsCloseBtn,
  settingsBtn, settingsSwitchBtns, switchableBlocks, player, playPauseBtn, prevButton, nextButton,
  timeline, progress, trackCurrentTime, trackName, trackLength, volumeBtn, volume,
  volumeSlider, itemsList, itemsListBtns, quote, quoteAuthor, changeQuote, langBtns
}