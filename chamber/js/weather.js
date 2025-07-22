const apiKey = 'f680ec08c7e0fbda88c6eb9c9cdbdad0';
const city = 'Lilongwe';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

const weatherContainer = document.getElementById('weather-container');

async function fetchWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Forecast fetch failed');

    const data = await response.json();

    // Get 3 midday forecasts
    const threeDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    // Header
    let forecastHTML = `<h3>${city} - 3 Day Forecast</h3>`;
    forecastHTML += `<div class="forecast-grid">`;

    // Each day's forecast
    threeDays.forEach(day => {
      const date = new Date(day.dt_txt);
      const temperature = day.main.temp;
      const description = day.weather[0].description;
      const icon = day.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      forecastHTML += `
        <div class="forecast-card">
          <p><strong>${date.toDateString()}</strong></p>
          <img src="${iconUrl}" alt="${description}" />
          <p>${temperature.toFixed(1)}°C</p>
          <p>${description}</p>
        </div>
      `;
    });

    forecastHTML += `</div>`; // close grid
    weatherContainer.innerHTML = forecastHTML;

  } catch (error) {
    weatherContainer.innerHTML = `<p>Unable to load forecast data at this time.</p>`;
    console.error(error);
  }
}

fetchWeather();
