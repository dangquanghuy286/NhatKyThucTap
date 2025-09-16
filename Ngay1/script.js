let cartItems = [];

function addToCart(name, price, imgUrl) {
  const existing = cartItems.find((item) => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ name, price, imgUrl, quantity: 1 });
  }

  document.getElementById("cartCount").textContent = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  updateCart();
}

function updateCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.imgUrl}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="cart-item-actions">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
          <span class="remove-btn" onclick="removeItem(${index})">Remove</span>
        </div>
      </div>
    `;
    cartItemsDiv.appendChild(cartItem);
  });
}

function increaseQty(index) {
  cartItems[index].quantity++;
  updateCart();
}

function decreaseQty(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
  } else {
    cartItems.splice(index, 1);
  }
  updateCart();
  document.getElementById("cartCount").textContent = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

function removeItem(index) {
  cartItems.splice(index, 1);
  updateCart();
  document.getElementById("cartCount").textContent = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

function toggleCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.style.display =
    cartItemsDiv.style.display === "block" ? "none" : "block";
}
