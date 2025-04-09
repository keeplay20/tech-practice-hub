const cartItems = [
  { id: 1, name: "Laptop", price: 1000, quantity: 1 },
  { id: 2, name: "Mouse", price: 50, quantity: 2 },
  { id: 3, name: "Keyboard", price: 80, quantity: 1 },
];

// Main function to render everything
function renderCart() {
  const tbody = document.getElementById("cartBody");
  const totalDisplay = document.getElementById("totalAmount");
  tbody.innerHTML = ""; // Clear previous rows

  cartItems.map((item) => {
    const row = document.createElement("tr");
    // Name;
    const nameTd = document.createElement("td");
    nameTd.textContent = item.name;

    // Price
    const priceTd = document.createElement("td");
    priceTd.textContent = `$${item.price}`;

    // Quantity
    const quantityTd = document.createElement("td");
    quantityTd.textContent = item.quantity;

    // Total = price × quantity
    const totalTd = document.createElement("td");
    totalTd.textContent = `$${item.price * item.quantity}`;

    // Remove Button
    const removeTd = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => removeItem(item.id);
    removeTd.appendChild(removeBtn);

    row.append(nameTd, priceTd, quantityTd, totalTd, removeTd);
    tbody.appendChild(row);

    // Show total price
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalDisplay.textContent = `${total}`;
  });
}

// Remove item function
function removeItem(id) {
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCart(); // Re-render after removal
  }
}

// Initial render

renderCart();
