// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const loginSignup = document.querySelector(".login-signup");

  // Create mobile menu if it doesn't exist
  if (!document.querySelector(".mobile-menu")) {
    const mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";
    mobileMenu.innerHTML = `
            <nav class="nav-links" role="navigation" aria-label="Mobile navigation">
                <a href="#home" aria-current="page">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
            <div class="login-signup">
                <button class="login" aria-label="Login to your account">Login</button>
                <button class="sign-up" aria-label="Create a new account">Sign Up</button>
            </div>
        `;
    document.body.appendChild(mobileMenu);
  }

  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", function () {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";

    hamburger.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("active");

    // Animate hamburger icon
    const icon = hamburger.querySelector("i");
    if (isExpanded) {
      icon.className = "ri-menu-line";
    } else {
      icon.className = "ri-close-line";
    }
  });

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.querySelector("i").className = "ri-menu-line";
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !hamburger.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.querySelector("i").className = "ri-menu-line";
    }
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to navigation
window.addEventListener("scroll", function () {
  const navBar = document.querySelector(".nav-bar");
  if (window.scrollY > 50) {
    navBar.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    navBar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navBar.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    navBar.style.boxShadow = "none";
  }
});

// Add loading animation for the main content
window.addEventListener("load", function () {
  const leftContent = document.querySelector(".left");
  const rightContent = document.querySelector(".right");

  leftContent.style.opacity = "0";
  leftContent.style.transform = "translateX(-50px)";
  rightContent.style.opacity = "0";
  rightContent.style.transform = "translateX(50px)";

  setTimeout(() => {
    leftContent.style.transition = "all 0.8s ease-out";
    rightContent.style.transition = "all 0.8s ease-out";

    leftContent.style.opacity = "1";
    leftContent.style.transform = "translateX(0)";
    rightContent.style.opacity = "1";
    rightContent.style.transform = "translateX(0)";
  }, 100);
});

// Add button click animations
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
