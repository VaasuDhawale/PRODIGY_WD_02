const API_KEY = 'ef3143635c1386b3b1c6649a30fe70e0';
const weatherBox = document.getElementById("weather");
const loader = document.getElementById("loader");

function showLoader(show) {
  loader.classList.toggle("hidden", !show);
  weatherBox.style.opacity = show ? 0.5 : 1;
}

function displayWeather(data) {
  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherBox.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <img src="${iconUrl}" alt="Weather icon">
    <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
    <p>🌡️ Temp: ${main.temp}°C | Feels Like: ${main.feels_like}°C</p>
    <p>💧 Humidity: ${main.humidity}%</p>
    <p>🌬️ Wind: ${wind.speed} m/s</p>
  `;
}

async function getWeather(url) {
  try {
    showLoader(true);
    const res = await fetch(url);
    const data = await res.json();
    showLoader(false);
    if (data.cod !== 200) {
      weatherBox.innerHTML = `<p>⚠️ ${data.message}</p>`;
      return;
    }
    displayWeather(data);
  } catch (err) {
    showLoader(false);
    weatherBox.innerHTML = `<p>❌ Could not fetch weather. Check your internet or try again later.</p>`;
  }
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    weatherBox.innerHTML = `<p>⚠️ Please enter a city name.</p>`;
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  getWeather(url);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      getWeather(url);
    }, () => {
      weatherBox.innerHTML = `<p>⚠️ Location access denied.</p>`;
    });
  } else {
    weatherBox.innerHTML = `<p>⚠️ Geolocation is not supported in this browser.</p>`;
  }
}
