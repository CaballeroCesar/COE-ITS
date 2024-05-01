// weather.js

const fetch = require('node-fetch'); 
 
async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=42.03726&longitude=-88.2810994&temperature_unit=fahrenheit&current=temperature_2m,weather_code`);
        const data = await response.json();
        const currentWeather = data.current;
        return currentWeather;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return {};
    }
}

function getWeatherInfo(weatherCode) {
  let weatherInfo = { description: "", iconURL: "" };
    switch (weatherCode) {
    case 0:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/sun.png?v=1709930234861";
      weatherInfo.description = "Clear Sky";
      break;
    case 1:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/cloudy-day.png?v=1709932101533";
      weatherInfo.description = "Mainly Clear";
      break;
    case 2:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/cloud.png?v=1709932329700";
      weatherInfo.description = "Partly Cloudy";
      break;
    case 3:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/clouds.png?v=1709932326888";
      weatherInfo.description = "Overcast";
      break;
    case 45:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/fog.png?v=1709930239648";
      weatherInfo.description = "Fog";
      break;
    case 48:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/fog.png?v=1709930239648";
      weatherInfo.description = "Depositing Rime Fog";
      break;
    case 51:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Light Drizzle";
      break;
    case 53:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Moderate Drizzle";
      break;
    case 55:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Dense Drizzle";
      break;
    case 56:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Light Freezing Drizzle";
      break;
    case 57:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Dense Freezing Drizzle";
      break;
    case 61:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Slight Rain";
      break;
    case 63:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Moderate Rain";
      break;
    case 65:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Heavy Rain";
      break;
    case 66:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Light Freezing Rain";
      break;
    case 67:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Heavy Freezing Rain";
      break;
    case 71:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/snow.png?v=1709930252520";
      weatherInfo.description = "Slight Snow Fall";
      break;
    case 73:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/snow.png?v=1709930252520";
      weatherInfo.description = "Moderate Snow Fall";
      break;
    case 75:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/snow.png?v=1709930252520";
      weatherInfo.description = "Heavy Snow Fall";
      break;
    case 77:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/snow.png?v=1709930252520";
      weatherInfo.description = "Snow Grains";
      break;
    case 80:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Slight Rain Shower";
      break;
    case 81:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Moderate Rain Shower";
      break;
    case 82:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/raining.png?v=1709930243726";
      weatherInfo.description = "Violent Rain Showers";
      break;
    case 85:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/snow.png?v=1709930252520";
      weatherInfo.description = "Slight Snow Showers";
      break;
    case 86:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/snow.png?v=1709930252520";
      weatherInfo.description = "Heavy Snow Showers";
      break;
    case 95:
      weatherInfo.iconURL = "https://cdn.glitch.global/66406a35-bb99-486f-9247-3506ecef87ea/storm.png?v=1709930247578";
      weatherInfo.description = "Thunderstorm";
      break;
    default:
      weatherInfo.iconURL = "";
      weatherInfo.description = "";
  }
  return weatherInfo;
}

module.exports = { fetchWeatherData, getWeatherInfo };
