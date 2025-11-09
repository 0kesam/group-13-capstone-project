document.addEventListener('DOMContentLoaded', () => {
  // --- Get the selected product ---
  const raw = localStorage.getItem('selectedProduct');
  if (!raw) return alert('No product selected.');
  let product;
  try {
    product = JSON.parse(raw);
  } catch (err) {
    console.warn('Could not parse selectedProduct', err);
    return;
  }

  // --- Populate product details ---
  const title = document.querySelector('.product-description-heading');
  const category = document.querySelector('.product-description-paragraph');
  const desc = document.querySelector('.paragraph');
  const price = document.querySelector('.price-heading');
  const imageDiv = document.querySelector('.image');
  const buyRequestNotice = document.querySelector('.buy-request-notice');

  if (title) title.textContent = product.name || 'Product';
  if (category) category.textContent = product.category || 'Category';
  if (desc) desc.textContent = product.description || 'No description';
  if (price) price.textContent = product.price || 'Price not available';
  if (imageDiv && product.image) {
    imageDiv.style.backgroundImage = `url('${product.image}')`;
    imageDiv.style.backgroundSize = 'cover';
    imageDiv.style.backgroundPosition = 'center';
  }

  // Show/hide price and notice depending on ad type
  if (product.adType === 'buy') {
    if (price) price.style.display = 'none';
    if (buyRequestNotice) buyRequestNotice.style.display = 'block';
  } else {
    if (price) price.style.display = 'block';
    if (buyRequestNotice) buyRequestNotice.style.display = 'none';
  }

  // --- Populate dynamic farmer info ---
  const farmerName = document.querySelector('.farmer-name');
  const farmerPhone = document.querySelector('.farmer-phone');
  const farmerLocation = document.querySelector('.farmer-location');

  if (farmerName) farmerName.textContent = product.farmerName || 'N/A';
  if (farmerPhone) farmerPhone.textContent = product.farmerPhone || 'N/A';
  if (farmerLocation) farmerLocation.textContent = product.farmerLocation || 'N/A';

  // --- Quantity buttons ---
  const quantityDisplay = document.querySelector('.quantity-buttons .secondary-btn');
  let quantity = 1;
  quantityDisplay.textContent = quantity;

  const minusBtn = document.querySelector('.quantity-buttons .primary-btn:first-child');
  const plusBtn = document.querySelector('.quantity-buttons .primary-btn:last-child');

  minusBtn?.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  plusBtn?.addEventListener('click', () => {
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // --- Add to Cart ---
  const addToCartBtn = document.querySelector('.cart-btn.add-btn');
  addToCartBtn?.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${quantity} item(s) added to cart!`);
  });

  // --- Contact Seller ---
  const contactBtn = document.querySelector('.cart-btn.contact-btn');
  contactBtn?.addEventListener('click', () => {
    if (!product.farmerPhone) return alert('Seller contact not available.');

    // Open WhatsApp chat
    const phoneNumber = product.farmerPhone.replace(/\D/g, '');
    const message = encodeURIComponent(`Hello, I am interested in your product: ${product.name}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  });

  // --- Update cart count ---
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
      countElement.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
  }

  updateCartCount();
});
