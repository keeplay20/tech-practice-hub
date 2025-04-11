const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

let likeCount = 0;
const likeBtn = document.getElementById("like-btn");
const likeCountDisplay = document.getElementById("like-count");

likeBtn.addEventListener("click", () => {
  likeCount++;
  likeCountDisplay.textContent = likeCount;
});
