// scripts/data.js
export async function fetchUniversities() {
  try {
    const res = await fetch('data/universities.json');
    if (!res.ok) throw new Error(`Network response ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetchUniversities error:', err);
    throw err;
  }
}
