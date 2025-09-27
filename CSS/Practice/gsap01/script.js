gsap.from("#page1 nav h2", {
  opacity: 0,
  y: -100,
  duration: 2,
  ease: "power3.inOut",
});

gsap.from(".hero-content li", {
  opacity: 0,
  stagger: 0.3,
  duration: 2,
  ease: "power3.inOut",
});

gsap.from("#page1 nav .nav-links a", {
  opacity: 0,
  delay: 0.5,
  stagger: 0.3,
  duration: 2,
});

gsap.to("#page2 h1", {
  transform: "translateX(-150%)",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "body",
    start: "top 0%",
    end: "top -50%",
    scrub: 2,
    pin: true,
  },
});

// Array of words to cycle through
const words = ["Code", "Design", "Develop", "Deploy", "Scale"];

// Create timeline for word replacement
const tl = gsap.timeline({ repeat: -1 });

words.forEach((word, index) => {
  // Create a span element for each word
  const wordSpan = document.createElement("span");
  wordSpan.textContent = word;
  wordSpan.className = "word";
  document.querySelector(".word-container").appendChild(wordSpan);

  // Animate each word
  tl.to(wordSpan, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
  }).to(
    wordSpan,
    {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    },
    "+=1.5"
  ); // Show word for 1.5 seconds before fading out
});
