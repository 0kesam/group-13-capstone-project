// cart.js

const cartContainer = document.querySelector('.cart-items');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCart() {
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceEl.textContent = '$0';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    const subtotal = priceNum * item.quantity;
    total += subtotal;

    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');
    itemEl.innerHTML = `
      <h3>${item.name}</h3>
      <span>Price: ${item.price}</span>
      <span>Qty: ${item.quantity}</span>
      <span>Subtotal: $${subtotal.toFixed(2)}</span>
      <button data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(itemEl);
  });

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
  attachRemoveButtons();
}

// Remove item
function attachRemoveButtons() {
  const removeButtons = document.querySelectorAll('.cart-item button');
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

// Clear cart
clearCartBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    localStorage.removeItem('cart');
    cart = [];
    renderCart();
  }
});

// Checkout simulation
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout successful! Thank you for your purchase.');
  localStorage.removeItem('cart');
  cart = [];
  renderCart();
});

renderCart();
