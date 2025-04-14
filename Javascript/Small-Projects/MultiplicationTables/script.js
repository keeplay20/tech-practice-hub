function generateTable() {
  const number = parseInt(document.getElementById("numberInput").value);
  const outputDiv = document.getElementById("tableOutput");
  outputDiv.innerHTML = "";
  if (isNaN(number)) {
    outputDiv.innerHTML = "<p>Please enter a valid number.</p>";
    return;
  }
  let tableHTML = "<ul>";
  for (let i = 1; i <= 10; i++) {
    tableHTML += `<li>${number} × ${i} = ${number * i}</li>`;
  }
  tableHTML += "</ul>";
  outputDiv.innerHTML = tableHTML;
}

function clearTable() {
  const outputDiv = document.getElementById("tableOutput");
  outputDiv.innerHTML = "";
  document.getElementById("numberInput").value = "";
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const toggleBtn = document.getElementById("themeToggle");
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});
