// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.onscroll = function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

backToTopButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Dynamic Footer Year
document.getElementById('footer-year').textContent = new Date().getFullYear();

// FAQ Toggle (Optional Example)
function toggleAnswer(question) {
    const answer = question.querySelector('p');
    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
}
