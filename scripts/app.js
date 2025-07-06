// Courses array
const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 231", name: "Frontend Development II", credits: 2, completed: false },
  { code: "CSE 121b", name: "JavaScript Language", credits: 2, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
  { code: "CSE 222a", name: "Data Structures", credits: 2, completed: false }
];

const courseList = document.getElementById("course-cards");
const totalCredits = document.getElementById("totalCredits");

function renderCourses(courseArray) {
  courseList.innerHTML = "";
  let credits = courseArray.reduce((sum, course) => sum + course.credits, 0);

  courseArray.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p>${course.completed ? "✅ Completed" : "❌ Not Completed"}</p>
    `;
    courseList.appendChild(card);
  });

  totalCredits.textContent = credits;
}

document.getElementById("allBtn").addEventListener("click", () => {
  renderCourses(courses);
});

document.getElementById("wddBtn").addEventListener("click", () => {
  renderCourses(courses.filter(c => c.code.startsWith("WDD")));
});

document.getElementById("cseBtn").addEventListener("click", () => {
  renderCourses(courses.filter(c => c.code.startsWith("CSE")));
});

// Initial render
renderCourses(courses);

// Footer info
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("open");
});
