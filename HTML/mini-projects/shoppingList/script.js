// ----- DOM References -----
const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const categories = ["Fruits", "Vegetables", "Dairy"];

// ----- Load from LocalStorage or Use Default -----
let groceryData = JSON.parse(localStorage.getItem("groceryList")) || {
  Fruits: ["Apple", "Banana", "Grapes", "Mangoes"],
  Vegetables: ["Carrot", "Broccoli", "Spinach", "Potato"],
  Dairy: ["Milk", "Cheese", "Yogurt"],
};

// ----- Render Items -----
function renderList(filter = "") {
  categories.forEach((category) => {
    const ul = document.getElementById(`${category.toLowerCase()}List`);
    ul.innerHTML = ""; // Clear previous

    groceryData[category].forEach((item) => {
      if (item.toLowerCase().includes(filter.toLowerCase())) {
        const li = document.createElement("li");
        li.textContent = item;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.style.marginLeft = "10px";
        delBtn.onclick = () => removeItem(category, item);

        li.appendChild(delBtn);
        ul.appendChild(li);
      }
    });
  });
}

// ----- Add Item -----
function addItem() {
  const item = itemInput.value.trim();
  const category = categorySelect.value;

  if (!item) return;

  if (!groceryData[category].includes(item)) {
    groceryData[category].push(item);
    saveToLocal();
    renderList(searchInput.value);
  }

  itemInput.value = "";
}

// ----- Remove Item -----
function removeItem(category, item) {
  groceryData[category] = groceryData[category].filter((i) => i !== item);
  saveToLocal();
  renderList(searchInput.value);
}

// ----- Save to LocalStorage -----
function saveToLocal() {
  localStorage.setItem("groceryList", JSON.stringify(groceryData));
}

// ----- Search Filter -----
searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  renderList(query);
});

// ----- Add Item Event -----
addBtn.addEventListener("click", addItem);

// Optional: Press "Enter" to add item
itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addItem();
});

// ----- Initial Render -----
renderList();
