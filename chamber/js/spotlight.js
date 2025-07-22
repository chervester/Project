const spotlightContainer = document.getElementById("spotlight-container");

async function loadSpotlights() {
  try {
    const response = await fetch("data/spotlight-members.json");
    if (!response.ok) throw new Error("Members data not available");

    const data = await response.json();

    // Filter gold or silver members (case-insensitive)
    const goldSilverMembers = data.members.filter(member =>
      member.membership.toLowerCase() === "gold" || member.membership.toLowerCase() === "silver"
    );

    if (goldSilverMembers.length === 0) {
      spotlightContainer.innerHTML = '<p>No spotlight members found.</p>';
      return;
    }

    const count = Math.min(goldSilverMembers.length, 3);
    const selectedIndices = new Set();

    // Randomly select unique members
    while (selectedIndices.size < count) {
      const randIndex = Math.floor(Math.random() * goldSilverMembers.length);
      selectedIndices.add(randIndex);
    }

    const selectedMembers = Array.from(selectedIndices).map(i => goldSilverMembers[i]);

    // Build HTML
    spotlightContainer.innerHTML = selectedMembers.map(member => `
      <div class="spotlight-card" role="listitem">
        <img src="${member.logo}" alt="${member.name} logo" />
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>Phone: ${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        <p class="membership">${member.membership} Member</p>
      </div>
    `).join('');

  } catch (error) {
    console.error('Spotlight loading error:', error);
    spotlightContainer.innerHTML = '<p>Error loading spotlights.</p>';
  }
}

loadSpotlights();
