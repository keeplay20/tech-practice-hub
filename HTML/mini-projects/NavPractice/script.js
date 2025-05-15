const hamburger = document.getElementById("hamburgerId");
const navLinks = document.getElementById("navLinks");
const navbar = document.querySelector(".navbar");
const dropdown = document.querySelector(".dropdown");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Sticky shadow
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Toggle dropdown on mobile
dropdown.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    dropdown.classList.toggle("open");
  }
});

function showHero(version) {
  const heroes = document.querySelectorAll(".hero");
  heroes.forEach((hero, index) => {
    hero.style.display = index === version - 1 ? "flex" : "none";
  });
}

showHero(1); // Show Version 1 on load
