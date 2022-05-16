const currentDateNode = document.querySelector("#today");
const searchForm = document.querySelector(".search-form");
const inputNode = document.querySelector(".search-input");
const searchButtonNode = document.querySelector(".btn-info");
const temperature = document.querySelector(".temperature");
const currentPossitionButton = document.querySelector(".js-current-possition");
const currentCityNode = document.querySelector(".current-city");
const humidityNode = document.querySelector("#humidity");
const windNode = document.querySelector("#wind");

const apiKey = "317060cebfc3d71d209b91e26b8129c0";

const days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thuesday",
  "Friday",
  "Saterday"
];

function formatDate(date) {
  let dayIndex = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function convertTempToCelsius(e) {
  e.preventDefault();
  temperature.innerHTML = "20";
}
function convertTempToFahrenheit(e) {
  e.preventDefault();
  temperature.innerHTML = "68";
}
currentDateNode.innerHTML = `${formatDate(new Date())}`;

function getData(url) {
  axios.get(url).then((response) => {
    console.log(response);
    const data = response.data.main;
    currentCityNode.innerHTML = `${response.data.name}`;
    temperature.innerHTML = `${data.temp}`;
    humidityNode.innerHTML = `${data.humidity}`;
    windNode.innerHTML = `${response.data.wind.speed}`;
  });
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  getData(url);
}

function onSearchButtonClick(event) {
  event.preventDefault();
  const city = `${inputNode.value}`;
  currentCityNode.innerHTML = city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  getData(url);
}

const onCurrentPossitionButtonClick = () =>
  navigator.geolocation.getCurrentPosition(showPosition);

currentPossitionButton.addEventListener("click", onCurrentPossitionButtonClick);

searchForm.addEventListener("submit", onSearchButtonClick);
