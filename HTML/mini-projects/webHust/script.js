function page1Animation() {
  var tl = gsap.timeline({});

  tl.from("nav h1, nav h4, nav button", {
    y: -30,
    opacity: 0,
    duration: 0.6,
    delay: 0.5,
    stagger: 0.2,
  });

  tl.from(".center-part1 h1, .center-part1 p , .center-part1 button", {
    x: -30,
    opacity: 0,
    duration: 0.5,
    delay: 0.7,
    stagger: 0.2,
  });

  tl.from(
    ".center-part2 img",
    {
      opacity: 0,
      duration: 1,
      x: 30,
    },
    "-=2"
  );
}

function page2Animation() {
  var tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".section2",
      scroller: "body",
      start: "top 60%",
      end: "top 0",
      scrub: 2,
    },
  });

  tl2.from(".services", {
    opacity: 0,
    x: -50,
  });

  tl2.from(
    ".elem.line1.left",
    {
      opacity: 0,
      x: -50,
    },
    "anim1"
  );

  tl2.from(
    ".elem.line1.right",
    {
      opacity: 0,
      x: 50,
    },
    "anim1"
  );

  tl2.from(
    ".elem.line2.left",
    {
      opacity: 0,
      x: -50,
    },
    "anim2"
  );

  tl2.from(
    ".elem.line2.right",
    {
      opacity: 0,
      x: 50,
    },
    "anim2"
  );
}

page1Animation();

page2Animation();
