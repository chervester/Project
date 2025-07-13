document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const directory = document.getElementById("directory");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const menuBtn = document.getElementById("menu");
const navLinks = document.querySelector(".nav-links");

// Toggle Navigation (Mobile)
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// View Toggle
gridBtn.addEventListener("click", () => {
  directory.classList.add("grid");
  directory.classList.remove("list");
});
listBtn.addEventListener("click", () => {
  directory.classList.add("list");
  directory.classList.remove("grid");
});

// Fetch and display members
async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  directory.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p><strong>Membership:</strong> ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
    `;

    directory.appendChild(card);
  });
}

getMembers();
