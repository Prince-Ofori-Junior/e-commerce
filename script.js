// === NAVIGATION ===
// === NAVIGATION ===
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".mobile-overlay");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");         // slide menu in/out
  overlay.classList.toggle("active");        // dark overlay
});

// Close menu when overlay is clicked
overlay.addEventListener("click", () => {
  navLinks.classList.remove("show");
  overlay.classList.remove("active");
});

// === SEARCH ===
const searchInput = document.getElementById("productSearch");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "flex" : "none";
  });
});

// === MINI CART ===
let cart = [];
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItemsList = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

cartBtn.addEventListener("click", () => {
  cartSidebar.classList.toggle("open");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("open");
});

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.qty} - GHS ${item.price * item.qty}
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartTotalEl.textContent = total;
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Attach add-to-cart event
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const name = card.querySelector("h3").textContent;
    const price = parseFloat(card.querySelector(".price").dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
  });
});
