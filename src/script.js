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

function displayTemperature(response) {
  console.log(response.data.main);
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTempElement = document.querySelector("#temp-max");
  let minTempElement = document.querySelector("#temp-min");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getApiInformation() {
  let apiKey = "78af43c4b86f6fe747e2eeb5803e94cd";
  let city = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(apiUrl);
}

getApiInformation();
