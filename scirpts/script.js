
const searchBtn = document.getElementById("searchBtn");

async function GetWeather() {
    const city = document.getElementById("cityInput").value;

    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=hu`)
    const geoData = await geoResponse.json();

    const lat = geoData.results[0].latitude
    const lon = geoData.results[0].longitude
    
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto&hourly=relative_humidity_2m`)
    const weatherData = await weatherResponse.json();

    console.log(getKmh(weatherData.current_weather.windspeed))
    console.log(weatherData.current_weather)

}

searchBtn.addEventListener("click", GetWeather);


function getKmh(mph){
    const changeNumber = 1.609344;
    return Math.floor(mph * changeNumber);
}