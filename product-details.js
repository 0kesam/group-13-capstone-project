document.addEventListener('DOMContentLoaded', () => {
  const raw = localStorage.getItem('selectedProduct');
  if (!raw) return;

  try {
    const product = JSON.parse(raw);

    // Elements
    const title = document.querySelector('.product-description-heading');
    const category = document.querySelector('.product-description-paragraph');
    const desc = document.querySelector('.paragraph');
    const price = document.querySelector('.price-heading');
    const imageDiv = document.querySelector('.image');
    const buyRequestNotice = document.querySelector('.buy-request-notice');

    // Populate common fields
    if (title) title.textContent = product.name || title.textContent;
    if (category) category.textContent = product.category || category.textContent;
    if (desc) desc.textContent = product.description || desc.textContent;
    if (price) price.textContent = product.price || price.textContent;
    if (imageDiv && product.image) {
      imageDiv.style.backgroundImage = `url('${product.image}')`;
      imageDiv.style.backgroundSize = 'cover';
      imageDiv.style.backgroundPosition = 'center';
    }

    // Conditionally handle Farmer vs Buyer ad
    if (product.adType === 'buy') {
      // Hide price for buyer requests, show notice
      if (price) price.style.display = 'none';
      if (buyRequestNotice) buyRequestNotice.style.display = 'block';
    } else {
      // Farmer ad
      if (price) price.style.display = 'block';
      if (buyRequestNotice) buyRequestNotice.style.display = 'none';
    }

  } catch (err) {
    console.warn('Could not parse selectedProduct', err);
  }

  // Update cart count if function exists
  if (typeof updateCartCount === 'function') updateCartCount();
});


const farmerInfoDiv = document.querySelector('.farmer-info'); // create this in your HTML
if (farmerInfoDiv && product.farmerName) {
  farmerInfoDiv.innerHTML = `
    <h3>${product.farmerName}</h3>
    <p>Phone: ${product.farmerPhone || 'N/A'}</p>
    <p>Location: ${product.farmerLocation || 'N/A'}</p>
  `;
}
