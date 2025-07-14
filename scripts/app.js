// --------------------
// Courses Array
// --------------------
const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 231", name: "Frontend Development II", credits: 2, completed: false },
  { code: "CSE 121b", name: "JavaScript Language", credits: 2, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
  { code: "CSE 222a", name: "Data Structures", credits: 2, completed: false }
];

// --------------------
// DOM Elements
// --------------------
const courseList = document.getElementById("course-cards");
const totalCredits = document.getElementById("totalCredits");

// --------------------
// Render Courses
// --------------------
function renderCourses(courseArray) {
  courseList.innerHTML = "";

  let credits = 0;

  courseArray.forEach(course => {
    credits += course.credits;

    const card = document.createElement("div");
    card.className = "course-card";
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p aria-label="${course.completed ? "Course completed" : "Course not completed"}">
        ${course.completed ? "✅ Completed" : "❌ Not Completed"}
      </p>
    `;

    courseList.appendChild(card);
  });

  totalCredits.textContent = credits;
}

// --------------------
// Filter Buttons
// --------------------
document.getElementById("allBtn").addEventListener("click", () => {
  renderCourses(courses);
});

document.getElementById("wddBtn").addEventListener("click", () => {
  renderCourses(courses.filter(c => c.code.startsWith("WDD")));
});

document.getElementById("cseBtn").addEventListener("click", () => {
  renderCourses(courses.filter(c => c.code.startsWith("CSE")));
});

// --------------------
// Initial Render
// --------------------
renderCourses(courses);

// --------------------
// Footer Info
// --------------------
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// --------------------
// Hamburger Toggle
// --------------------
document.getElementById("hamburger").addEventListener("click", () => {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("open");

  // Optional: Update ARIA state
  const expanded = nav.classList.contains("open");
  document.getElementById("hamburger").setAttribute("aria-expanded", expanded);
});
