const app = document.getElementById("app");

const createElement = (tag, className, innerHTML) => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
};

// Header
const header = createElement(
  "header",
  "hero",
  `<h1>Hello, I’m <span>Mandar</span></h1>
   <p>A Frontend Developer crafting clean and cosmic UIs 🚀</p>`
);

// About Me
const about = createElement("section", "glass-section");
about.id = "about";
about.innerHTML = `
  <h2>About Me</h2>
  <p>I’m a passionate React Native developer with a strong testing background and a love for clean, component-based design. Currently exploring Java, Node.js, and system design to broaden my full-stack capabilities. I build things that look cool and work flawlessly across platforms.</p>
`;

// Projects
const projects = createElement("section", "glass-section");
projects.id = "projects";
projects.innerHTML = `<h2>Projects</h2>`;

const projectList = [
  {
    title: "Movie Explorer App",
    link: "https://github.com/keeplay20/movie-explorer",
    description:
      "Browse and explore movies using TMDB API. Built with React Native and Zustand.",
  },
  {
    title: "Neon Button",
    link: "https://keeplay20.github.io/tech-practice-hub/CSS/mini-projects/neon-button/",
    description:
      "A pure CSS project featuring a glowing interactive neon button.",
  },
];

projectList.forEach((proj) => {
  const card = createElement(
    "div",
    "project-card",
    `<h3><a href="${proj.link}" target="_blank">${proj.title}</a></h3>
     <p>${proj.description}</p>`
  );
  projects.appendChild(card);
});

// Contact
const contact = createElement(
  "section",
  "glass-section",
  `<h2>Contact</h2>
   <p>Email: mandar@example.com</p>
   <p>GitHub: <a href="https://github.com/keeplay20" target="_blank">github.com/keeplay20</a></p>`
);

// Footer
const footer = createElement(
  "footer",
  "footer",
  `<p>© 2025 Mandar. Built with 💙 under the stars.</p>`
);

// Append to main
const main = createElement("main");
[about, projects, contact].forEach((section) => main.appendChild(section));
app.append(header, main, footer);
