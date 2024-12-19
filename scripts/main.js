// Dynamic Footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentyear");
  const lastModified = document.getElementById("lastModified");

  // Set the current year
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;

  // Set last modified date
  const modifiedDate = new Date(document.lastModified);
  lastModified.textContent = `Last Updated: ${modifiedDate.toLocaleDateString()} ${modifiedDate.toLocaleTimeString()}`;
});

// Smooth Scroll for Navigation
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
