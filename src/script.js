let apiKey = "78af43c4b86f6fe747e2eeb5803e94cd";
let units = "metric";

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let dayHour = date.getHours();
  if (dayHour < 10) {
    dayHour = `0${dayHour}`;
  }

  let dayMinutes = date.getMinutes();
  if (dayMinutes < 10) {
    dayMinutes = `0${dayMinutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayName = days[date.getDay()];
  return `${dayName}, ${dayHour}:${dayMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="36"
          />
          <div class="forecast-temperatures">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTempElement = document.querySelector("#temp-max");
  let minTempElement = document.querySelector("#temp-min");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  let description = response.data.weather[0].description;

  celsiusTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = celsiusTemperature;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", changeIcon(icon, description));
  console.log({ icon: changeIcon(icon, description) });
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function changeIcon(icon, description) {
  let iconImage = "";

  if (icon === "04n" || icon === "04d") {
    iconImage = "images/broken_clouds.svg";
  } else if (icon === "03n" || icon === "03d") {
    iconImage = "images/scattered_clouds.svg";
  } else if (icon === "13n" || icon === "13d") {
    iconImage = "images/snow.svg";
  } else if (icon === "50n" || icon === "50d") {
    iconImage = "images/mist.svg";
  } else if (icon === "02n" || icon === "02d") {
    iconImage = "images/few_clouds.svg";
  } else if (icon === "01d") {
    iconImage = "images/sun.svg";
  } else if (icon === "01n") {
    iconImage = "images/night.svg";
  } else if (icon === "09n" || icon === "09d") {
    iconImage = "images/shower_rain.svg";
  } else if (icon === "10n" || icon === "10d") {
    iconImage = "images/rain.svg";
  } else if (icon === "11n" || icon === "11d") {
    iconImage = "images/thunderstorm.svg";
  } else if (description === "tornado") {
    iconImage = "images/mist.svg";
  } else if (
    description === "thunderstorm with light rain" ||
    description === "thunderstorm with rain" ||
    description === "thunderstorm with heavy rain" ||
    description === "thunderstorm with heavy drizzle"
  ) {
    iconImage = "images/thunderstorm.svg";
  }

  return iconImage;
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}
getCurrentLocation();

function convertToFahrenheit(event) {
  event.preventDefault();
  if (units === "metric") {
    units = "imperial";
    updateWeatherInfo(event);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }
}

function convertToCelsius(event) {
  event.preventDefault();
  if (units === "imperial") {
    units = "metric";
    updateWeatherInfo(event);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }
}

function updateWeatherInfo(event) {
  let cityInputValue = getCityInputValue();
  if (cityInputValue) {
    searchCity(event);
  } else {
    getCurrentLocation();
  }
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function searchCity(event) {
  event.preventDefault();
  let cityInputValue = getCityInputValue();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCityInputValue() {
  let searchCityInput = document.querySelector("#search-city-input");
  let cityInputValue = searchCityInput.value;
  return cityInputValue;
}

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", searchCity);
