// === ELEMENTS ===
const hamburger = document.querySelector(".hamburger");
const navSidebar = document.getElementById("navSidebar");
const closeNav = document.querySelector(".close-nav");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

const overlay = document.querySelector(".mobile-overlay");

// === OPEN/CLOSE FUNCTIONS ===
function openSidebar(sidebar) {
  sidebar.classList.add("open");
  overlay.classList.add("active");
}

function closeSidebar(sidebar) {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

// === HAMBURGER NAVIGATION ===
hamburger.addEventListener("click", () => openSidebar(navSidebar));
closeNav.addEventListener("click", () => closeSidebar(navSidebar));

// === CART SIDEBAR ===
cartBtn.addEventListener("click", () => openSidebar(cartSidebar));
closeCart.addEventListener("click", () => closeSidebar(cartSidebar));

// === OVERLAY CLICK ===
overlay.addEventListener("click", () => {
  if (navSidebar.classList.contains("open")) closeSidebar(navSidebar);
  if (cartSidebar.classList.contains("open")) closeSidebar(cartSidebar);
});

// === SEARCH FUNCTIONALITY ===
const searchInput = document.getElementById("productSearch");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "flex" : "none";
  });
});

// === MINI CART FUNCTIONALITY ===
let cart = [];
const cartItemsList = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

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

// Add-to-cart buttons
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

// === LOAD PRODUCTS FROM BACKEND ===
async function loadProducts() {
  try {
    const response = await fetch("https://your-backend.com/api/products"); // Replace with your API
    const products = await response.json();

    const productsGrid = document.getElementById("productsGrid");
    productsGrid.innerHTML = ""; // Clear existing content

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <div class="card-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="card-body">
          <h3>${product.name}</h3>
          <p class="price" data-price="${product.price}">GHS ${product.price}</p>
          <button class="btn btn-primary add-to-cart">Add to Cart</button>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    attachAddToCartEvents(); // Reattach cart buttons
  } catch (error) {
    console.error("Failed to load products:", error);
  }
}

// === ATTACH CART EVENTS AFTER DYNAMIC LOAD ===
function attachAddToCartEvents() {
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
}

// Load products on page load
loadProducts();

