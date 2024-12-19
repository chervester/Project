// Automatically update the current year in the footer
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("currentyear");
  const lastModifiedElement = document.getElementById("lastModified");

  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }

  if (lastModifiedElement) {
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = `Last Updated: ${lastModified}`;
  }
});
