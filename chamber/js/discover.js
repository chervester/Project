// Load JSON data and render cards with lazy loading images
fetch("data/discover.json")
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(data => {
    const container = document.getElementById("places-container");
    data.forEach(place => {
      const card = document.createElement("div");
      card.classList.add("place-card");

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button" aria-label="Learn more about ${place.name}">Learn More</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load places data:", error);
  });

// Last visit message using localStorage with formatted date
const visitMsg = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMsg.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysDiff < 1) {
    visitMsg.textContent = "Back so soon! Awesome!";
  } else if (daysDiff === 1) {
    visitMsg.textContent = "You last visited 1 day ago.";
  } else {
    visitMsg.textContent = `You last visited ${daysDiff} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
