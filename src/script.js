function displayTemperature(response) {
  console.log(response.data.main);
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#temp-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let maxTempElement = document.querySelector("#temp-max");
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let minTempElement = document.querySelector("#temp-min");
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
}

function getApiInformation() {
  let apiKey = "78af43c4b86f6fe747e2eeb5803e94cd";
  let city = "London";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(apiUrl);
}

getApiInformation();
