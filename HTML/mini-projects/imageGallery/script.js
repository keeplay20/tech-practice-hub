const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.getElementById("closeBtn");
const figures = document.querySelectorAll(".gallery figure");

let currentIndex = 0;

figures.forEach((figure, index) => {
  const img = figure.querySelector("img");
  const caption = figure.querySelector("figcaption").textContent;

  img.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalImg.src = img.src.replace("300/200", "800 / 600");
    modalCaption.textContent = caption;
    currentIndex = index;
    modal.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;

    if (e.key === "Escape") modal.classList.add("hidden");
    else if (e.key === "ArrowRight") navigate(+1);
    else if (e.key === "ArrowLeft") navigate(-1);
  });

  function navigate(direction) {
    currentIndex = (currentIndex + direction + figures.length) % figures.length;
    const newFig = figures[currentIndex];
    const img = newFig.querySelector("img");
    const caption = newFig.querySelector("figcaption").textContent;
    modalImg.src = img.src.replace("300/200", "800/600");
    modalCaption.textContent = caption;
  }
});
