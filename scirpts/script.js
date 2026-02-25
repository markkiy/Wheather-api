
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperatureValue = document.getElementById("temperature");
const windValue = document.getElementById("wind"); 

async function GetWeather() {
    const cityInput = document.getElementById("cityInput").value;

    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=10&language=hu`)
    const geoData = await geoResponse.json();

    const lat = geoData.results[0].latitude
    const lon = geoData.results[0].longitude
    
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&hourly=relative_humidity_2m`)
    const weatherData = await weatherResponse.json();

    console.log(getKmh(weatherData.current_weather.windspeed))
    console.log(weatherData.current_weather)

    const city = geoData.results[0].name;
    const humidity = weatherData.hourly.relative_humidity_2m[0];
    const wind = getKmh(weatherData.current_weather.windspeed);
    const temp = weatherData.current_weather.temperature;
    writeData(city, temp, humidity, wind)

}

searchBtn.addEventListener("click", GetWeather);


function writeData(city, temp, hum, wind) {
    cityName.innerHTML = city;
    temperatureValue.innerHTML = `${temp}°C`;
    windValue.innerHTML = `${wind}km/h`;
    

}

function getKmh(mph){
    const changeNumber = 1.609344;
    return Math.floor(mph * changeNumber);
}