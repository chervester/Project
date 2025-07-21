const apiKey = 'f680ec08c7e0fbda88c6eb9c9cdbdad0';
const city = 'Lilongwe';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const weatherContainer = document.getElementById('weather-container');

async function fetchWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data fetch failed');

    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherContainer.innerHTML = `
      <p><strong>${city}</strong></p>
      <p>${temperature.toFixed(1)}°C - ${description}</p>
      <img src="${iconUrl}" alt="${description}" />
    `;
  } catch (error) {
    weatherContainer.innerHTML = `<p>Unable to load weather data at this time.</p>`;
    console.error(error);
  }
}

fetchWeather();
