const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');
const api_key = "bc39be13050bd648e0957b3cf0198308";

citySearchButton.addEventListener("click", () => {
    let cityName = citySearchInput.value;
    getcityWeather(cityName);
})

navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    console.log(position);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`).then((response) => response.json()).then((data) => displayWeather(data))
},
    (err) => {
        if (err.code === 1) {
            alert("Geolocalização negada pelo usuário. Busque manualmente por uma cidade atrás da barra de pesquisa.")
        } else {
            console.log(err);
        }
    }
)

function getcityWeather(cityName) {

    weatherIcon.src = `/assets/loading-icon.svg`;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`).then((response) => response.json()).then((data) => displayWeather(data))
}

function displayWeather(data) {
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
    } = data;

    currentDate.textContent = formatDate(dt);
    cityName.textContent = name;
    weatherIcon.src = `/assets/${icon}.svg`;
    weatherDescription.textContent = description;
    currentTemperature.textContent = temp;
    windSpeed.textContent = speed;
    feelsLikeTemperature.textContent = feels_like;
    currentHumidity.textContent = humidity;
    sunriseTime.textContent = sunrise;
    sunsetTime.textContent = sunset;
}

function formatDate (epochTime){
    let date = new Date(epochTime * 1000);
    return date;
}