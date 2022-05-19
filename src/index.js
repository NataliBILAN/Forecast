const currentDateNode = document.querySelector("#today");
const searchForm = document.querySelector(".search-form");
const inputNode = document.querySelector(".search-input");
const searchButtonNode = document.querySelector(".search-button");
const temperature = document.querySelector(".temperature");
const currentCityNode = document.querySelector(".current-city");
const humidityNode = document.querySelector("#humidity");
const windNode = document.querySelector("#wind");
const weatherDescNode = document.querySelector("#weather-desc");
const currentDayIconNode = document.querySelector("#current-day-icon");
const forecastNode = document.querySelector("#forecast");

const apiKey = "317060cebfc3d71d209b91e26b8129c0";
let celsiusTemperature = null;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatCurrentDate(date) {
  let dayIndex = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${days[dayIndex]} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayIndex = date.getDay();

  return `${days[dayIndex]}`;
}

function convertTempToCelsius(e) {
  e.preventDefault();
  temperature.innerHTML = "20";
}
function convertTempToFahrenheit(e) {
  e.preventDefault();
  temperature.innerHTML = "68";
}
currentDateNode.innerHTML = `${formatCurrentDate(new Date())}`;

function displayForecast(response) {
  const forecastData = response.data.daily;

  let forecastHTML = `<ul class="forecast-list">`;
  forecastData.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <li class="forecast-day">
        <p class="weak-day">${formatDate(day.dt)}</p>

        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />

        <div class="forecast-temperatures">
          <span class="forecast-temperature-max"> ${Math.round(
            day.temp.max
          )}° </span>
          <span class="forecast-temperature-min"> ${Math.round(
            day.temp.min
          )}° </span>
        </div>
      </li>
  `;
    }
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastNode.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    getForecast(response.data.coord);

    const data = response.data.main;
    celsiusTemperature = data.temp;
    currentCityNode.innerHTML = `${response.data.name}`;
    temperature.innerHTML = `${Math.round(celsiusTemperature)}`;
    humidityNode.innerHTML = `${data.humidity} %`;
    windNode.innerHTML = `${response.data.wind.speed} km/h`;
    weatherDescNode.innerHTML = `${response.data.weather[0].description}`;
    currentDayIconNode.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    currentDayIconNode.setAttribute(
      "alt",
      response.data.weather[0].description
    );
  });
}

function onSearchButtonClick(event) {
  event.preventDefault();
  const city = `${inputNode.value}`;
  currentCityNode.innerHTML = city;
  getData(city);
}

searchForm.addEventListener("submit", onSearchButtonClick);

getData("Lviv");
