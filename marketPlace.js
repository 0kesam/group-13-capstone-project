// marketPlace.js
// marketplace -> product-details & cart linkage
(() => {
  // SELECTORS
  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  // Cart badge element (if present on this page)
  const cartCountEl = document.getElementById('cart-count');

  // UTILS
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((s, i) => s + (i.quantity || 0), 0);
    if (cartCountEl) cartCountEl.textContent = count;
    // also update any other cart-count elements on the page (common id)
    const other = document.querySelectorAll('#cart-count');
    other.forEach(el => { el.textContent = count; });
  }

  // Build a structured product object from a card element
  function productFromCard(cardEl) {
    const imgEl = cardEl.querySelector('.product__image');
    const titleEl = cardEl.querySelector('span') || cardEl.querySelector('h3') || null;
    const descEl = cardEl.querySelector('p') || null;
    const category = cardEl.dataset.category || '';
    const date = cardEl.dataset.date || '';

    return {
      id: cardEl.dataset.productId || `${category}-${date}-${Math.random().toString(36).slice(2,8)}`,
      name: titleEl ? titleEl.textContent.trim() : 'Product',
      category,
      date,
      description: descEl ? descEl.textContent.trim() : '',
      image: imgEl ? imgEl.getAttribute('src') : '',
      price: cardEl.dataset.price || '$5.00', // default if not present
      farmerId: cardEl.dataset.farmerId || null
    };
  }

  // When a product card (or its image / name) is clicked -> save selectedProduct & go to product-details.html
  function attachCardClicks() {
    const cards = document.querySelectorAll('.product__cards');

    cards.forEach(card => {
      // Click on the image or card body
      card.querySelectorAll('.product__image, span, p').forEach(clickable => {
        clickable.style.cursor = 'pointer';
        clickable.addEventListener('click', (e) => {
          const product = productFromCard(card);
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          // navigate to product details page
          window.location.href = 'product-details.html';
        });
      });

      // View Farmer button -> go to farmer dashboard with farmerId
      const viewBtn = card.querySelector('.btn__farmer');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const product = productFromCard(card);
          // store lastViewedFarmer to be picked up by the farmer dashboard page
          if (product.farmerId) {
            localStorage.setItem('selectedFarmer', JSON.stringify({ farmerId: product.farmerId }));
          } else {
            // If no farmerId available, store a fallback object
            localStorage.setItem('selectedFarmer', JSON.stringify({ farmerId: product.id }));
          }
          window.location.href = 'userdashboard.html';
        });
      }

      // Contact button (you can extend to open a contact modal)
      const contactBtn = card.querySelector('.btn__contact');
      if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          alert('Contact Farmer feature will be added here.');
        });
      }
    });
  }

  // Simple search + category filter (client-side)
  function attachFilters() {
    if (!searchInput && !categorySelect) return;

    function filterGrid() {
      const query = (searchInput?.value || '').toLowerCase();
      const category = (categorySelect?.value || 'all');

      document.querySelectorAll('.product__cards').forEach(card => {
        const text = (card.textContent || '').toLowerCase();
        const cardCategory = (card.dataset.category || '').toLowerCase();

        const matchesQuery = !query || text.includes(query);
        const matchesCategory = category === 'all' || cardCategory === category.toLowerCase();

        card.style.display = (matchesQuery && matchesCategory) ? '' : 'none';
      });
    }

    if (searchInput) searchInput.addEventListener('input', filterGrid);
    if (categorySelect) categorySelect.addEventListener('change', filterGrid);
  }

  // INIT
  function init() {
    attachCardClicks();
    attachFilters();
    updateCartCount();
  }

  // run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
