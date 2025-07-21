// index.js
const weatherApiKey = 'f680ec08c7e0fbda88c6eb9c9cdbdad0'; 
const chamberLocation = {
  city: 'Lilongwe',
  lat: -13.9626,
  lon: 33.7741,
};

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Load weather data and display
async function loadWeather() {
  const weatherTodayDiv = document.getElementById('weather-today');
  const weatherForecastDiv = document.getElementById('weather-forecast');

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${chamberLocation.lat}&lon=${chamberLocation.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${weatherApiKey}`
    );

    if (!response.ok) throw new Error('Weather data not available');

    const data = await response.json();

    // Current weather
    const temp = Math.round(data.current.temp);
    const desc = data.current.weather[0].description;
    weatherTodayDiv.innerHTML = `<p><strong>${chamberLocation.city}:</strong> ${temp}°C, ${desc}</p>`;

    // 3-day forecast
    // The daily array includes today as first item, so skip first, show next 3 days
    const forecastDays = data.daily.slice(1, 4);

    weatherForecastDiv.innerHTML = ''; // Clear

    forecastDays.forEach(day => {
      const date = new Date(day.dt * 1000);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const dayStr = date.toLocaleDateString(undefined, options);
      const maxTemp = Math.round(day.temp.max);
      const minTemp = Math.round(day.temp.min);
      const weatherDesc = day.weather[0].main;

      const dayDiv = document.createElement('div');
      dayDiv.classList.add('forecast-day');
      dayDiv.innerHTML = `
        <p><strong>${dayStr}</strong></p>
        <p>${weatherDesc}</p>
        <p>High: ${maxTemp}°C</p>
        <p>Low: ${minTemp}°C</p>
      `;
      weatherForecastDiv.appendChild(dayDiv);
    });
  } catch (error) {
    weatherTodayDiv.innerHTML = '<p>Unable to load weather data at this time.</p>';
    weatherForecastDiv.innerHTML = '';
    console.error(error);
  }
}

// Load and display spotlight members
async function loadSpotlights() {
  const container = document.getElementById('spotlights-container');

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Members data not available');

    const data = await response.json();

    // Filter gold or silver members
    const goldSilver = data.members.filter(
      m => m.membershipLevel.toLowerCase() === 'gold' || m.membershipLevel.toLowerCase() === 'silver'
    );

    // Randomly pick 2 or 3 members
    const count = Math.min(goldSilver.length, 3);
    const selected = [];

    while (selected.length < count) {
      const randIndex = Math.floor(Math.random() * goldSilver.length);
      if (!selected.includes(goldSilver[randIndex])) {
        selected.push(goldSilver[randIndex]);
      }
    }

    container.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" />
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>Phone: ${member.phone}</p>
        <p>Membership: ${member.membershipLevel}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = '<p>Unable to load member spotlights at this time.</p>';
    console.error(error);
  }
}

// Run on page load
loadWeather();
loadSpotlights();
