// product-details.js (top): populate page from selectedProduct if present
document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem('selectedProduct');
  if (!raw) return; // nothing to populate

  try {
    const product = JSON.parse(raw);
    // Fill in page elements if they exist
    const title = document.querySelector('.product-description-heading');
    const category = document.querySelector('.product-description-paragraph');
    const desc = document.querySelector('.paragraph');
    const price = document.querySelector('.price-heading');
    const imageDiv = document.querySelector('.image');

    if (title) title.textContent = product.name || title.textContent;
    if (category) category.textContent = product.category || category.textContent;
    if (desc) desc.textContent = product.description || desc.textContent;
    if (price) price.textContent = product.price || price.textContent;

    // If .image is a div with background-image, update via style
    if (imageDiv && product.image) {
      imageDiv.style.backgroundImage = `url('${product.image}')`;
      imageDiv.style.backgroundSize = 'cover';
      imageDiv.style.backgroundPosition = 'center';
    }

   
  } catch (err) {
    console.warn('Could not parse selectedProduct', err);
  }

  if (typeof updateCartCount === 'function') updateCartCount();
});





const minusBtn = document.querySelectorAll('.quantity-btn')[0];
const qtyDisplay = document.querySelectorAll('.quantity-btn')[1];
const plusBtn = document.querySelectorAll('.quantity-btn')[2];
let quantity = 1;

minusBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    qtyDisplay.textContent = quantity;
  }
});

plusBtn.addEventListener('click', () => {
  quantity++;
  qtyDisplay.textContent = quantity;
});

// Add to Cart
const addToCartBtn = document.querySelector('.add-btn');

addToCartBtn.addEventListener('click', () => {
  const product = {
    name: document.querySelector('.product-description-heading').textContent,
    price: document.querySelector('.price-heading').textContent,
    quantity: quantity,
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${product.name} added to cart!`);
});

// for Contact Seller details
const contactBtn = document.querySelector('.contact-btn');
contactBtn.addEventListener('click', () => {
  alert('Contact Seller feature coming soon!');
});

// for Submit Review
const submitReviewBtn = document.querySelector('.submit-btn');
submitReviewBtn.addEventListener('click', () => {
  const reviewText = document.querySelector('textarea').value.trim();
  if (reviewText === '') {
    alert('Please write a review before submitting.');
    return;
  }
  alert('Thank you for your review!');
  document.querySelector('textarea').value = '';
});


// for  Update cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}


updateCartCount();

addToCartBtn.addEventListener('click', () => {
  updateCartCount();
});

