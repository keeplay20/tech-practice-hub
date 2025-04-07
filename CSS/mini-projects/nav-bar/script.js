const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Optional: Sticky nav shadow on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    nav.classList.add("shadow");
  } else {
    nav.classList.remove("shadow");
  }
});

// Theme toggle (light/dark switch)
let dark = true;
themeToggle.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.style.setProperty(
    "--bg",
    dark ? "#121212" : "#ffffff"
  );
  document.documentElement.style.setProperty(
    "--text",
    dark ? "#ffffff" : "#121212"
  );
  document.documentElement.style.setProperty(
    "--accent",
    dark ? "#00bcd4" : "#ff4081"
  );
  themeToggle.textContent = dark ? "🌙" : "☀️";
});
