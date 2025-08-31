// ===== Mobile Menu Toggle =====

  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector(".hamburgerBtn");
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  });

// ===== Email Subscribe Validation =====
  const subscribeBtn = document.querySelector(".subscribe-btn");
  const emailInput = document.querySelector(".email-input");
  const subscribeBox = document.getElementById("subscribeBox");
  const subscribeMessage = document.getElementById("subscribeMessage");

  if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        subscribeMessage.textContent = "⚠️ Please enter your email.";
        subscribeMessage.className = "mt-4 text-red-600 font-semibold";
      } else if (!emailPattern.test(email)) {
        subscribeMessage.textContent = "⚠️ Please enter a valid email address.";
        subscribeMessage.className = "mt-4 text-red-600 font-semibold";
      } else {
        subscribeBox.innerHTML = `<p class="text-xl font-bold text-[#733D25]">Subscribed</p>`;
        subscribeMessage.textContent = "You will now receive updates & offers! ☕";
        subscribeMessage.className = "mt-4 text-[#733D25] font-semibold";
      }
    });
  }


// ===== Smooth Scroll =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ===== Cart =====

let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1); 
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  if (cartItems && cartTotal) {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<li>Your cart is empty 🛒</li>";
      cartTotal.innerText = "$0.00";
      placeOrderBtn.disabled = true;
      return;
    }

    cart.forEach((c, index) => {
      cartItems.innerHTML += `
        <li class="flex justify-between items-center">
          <span>${c.item} - $${c.price.toFixed(2)}</span>
          <button onclick="removeFromCart(${index})" 
            class="ml-4 text-white px-2 py-1 rounded">
            ❌
          </button>
        </li>
      `;
    });

    cartTotal.innerText = "$" + total.toFixed(2);
    placeOrderBtn.disabled = false;
  }
}

document.getElementById("placeOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before placing an order.");
    return;
  }

  window.location.href = "checkout.html";
});
