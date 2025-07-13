async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  const container = document.getElementById('members-container');
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

document.getElementById('grid-view').addEventListener('click', () => {
  document.getElementById('members-container').classList.add('grid');
  document.getElementById('members-container').classList.remove('list');
});

document.getElementById('list-view').addEventListener('click', () => {
  document.getElementById('members-container').classList.remove('grid');
  document.getElementById('members-container').classList.add('list');
});

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

getMembers();
