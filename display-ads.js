document.addEventListener("DOMContentLoaded", () => {
  const adsContainer = document.getElementById("adsContainer");
  const ads = JSON.parse(localStorage.getItem("farmhubAds")) || [];

  if (ads.length === 0) {
    adsContainer.innerHTML = "<p>No ads available yet.</p>";
    return;
  }

  ads.forEach((ad) => {
    const adCard = document.createElement("div");
    adCard.classList.add("ad-card");
    adCard.innerHTML = `
      <div class="ad-image">
        <img src="${ad.images[0] || 'default.jpg'}" alt="${ad.productName}" />
      </div>
      <div class="ad-info">
        <h3>${ad.productName}</h3>
        <p><strong>Category:</strong> ${ad.category}</p>
        <p><strong>Location:</strong> ${ad.location}</p>
        <p><strong>Price:</strong> ₦${ad.priceRange.from || 'N/A'} - ₦${ad.priceRange.to || 'N/A'}</p>
        <p class="ad-type">${ad.adType === "sell" ? "For Sale" : "Wanted"}</p>
      </div>
    `;

    // When clicked → save ad ID and go to product details page
    adCard.addEventListener("click", () => {
      localStorage.setItem("selectedAdId", ad.id);
      window.location.href = "product-details.html";
    });

    adsContainer.appendChild(adCard);
  });
});


// display-ads.js
document.addEventListener("DOMContentLoaded", () => {
  const adsContainer = document.getElementById("adsContainer") || document.getElementById("productGrid");
  const savedAds = JSON.parse(localStorage.getItem("farmhubAds")) || [];

  if (!adsContainer) return;

  // Clear existing hardcoded ads if you want
  // adsContainer.innerHTML = "";

  savedAds.forEach((ad) => {
    // Create card
    const card = document.createElement("div");
    card.classList.add("product__cards");
    card.dataset.category = ad.category;
    card.dataset.date = ad.datePosted;
    card.dataset.productId = ad.id;

    card.innerHTML = `
      <img class="product__image" src="${ad.images?.[0] || 'img/default.jpg'}" alt="${ad.productName}">
      <span>${ad.productName}</span>
      <p>${ad.description || "No description provided."}</p>
      <div class="product__button">
         <button class="btn btn__farmer">View Details</button>
         <button class="btn btn__contact">Contact</button>
      </div>
    `;

    // --- Add click event to view product details ---
    card.querySelector(".btn__farmer").addEventListener("click", () => {
      const productObj = {
        name: ad.productName,
        category: ad.category,
        description: ad.description,
        price: ad.priceRange?.from ? `₦${ad.priceRange.from} - ₦${ad.priceRange.to}` : "",
        image: ad.images?.[0] || "",
      };
      localStorage.setItem("selectedProduct", JSON.stringify(productObj));
      window.location.href = "product-details.html";
    });

    // --- Contact button ---
    card.querySelector(".btn__contact").addEventListener("click", () => {
      // alert("Contact Farmer feature coming soon!");
      window.location.href = "chatbox.html"
    });

    adsContainer.appendChild(card);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const adsContainer = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");

  if (!adsContainer) return;

  // --- Hardcoded products (optional, same as in HTML) ---
  const hardcodedProducts = Array.from(document.querySelectorAll('.product__cards')).map(card => {
    return {
      id: card.dataset.productId || `${card.dataset.category}-${card.dataset.date}-${Math.random().toString(36).slice(2,8)}`,
      name: card.querySelector('span')?.textContent || 'Product',
      category: card.dataset.category || '',
      date: card.dataset.date || '1970-01-01',
      description: card.querySelector('p')?.textContent || '',
      image: card.querySelector('img')?.src || '',
      price: card.dataset.price || '',
    };
  });

  // --- Farmer-created ads from localStorage ---
  const savedAds = JSON.parse(localStorage.getItem("farmhubAds")) || [];
  const formattedSavedAds = savedAds.map(ad => ({
    id: ad.id,
    name: ad.productName,
    category: ad.category,
    date: ad.datePosted,
    description: ad.description,
    image: ad.images?.[0] || 'img/default.jpg',
    price: ad.priceRange?.from ? `₦${ad.priceRange.from} - ₦${ad.priceRange.to}` : '',
  }));

  // --- Merge all products ---
  let allProducts = [...hardcodedProducts, ...formattedSavedAds];

  // --- Sort by date (newest first) ---
  allProducts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // --- Function to create card ---
  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product__cards");
    card.dataset.category = product.category;
    card.dataset.date = product.date;
    card.dataset.productId = product.id;

    card.innerHTML = `
      <img class="product__image" src="${product.image}" alt="${product.name}">
      <span>${product.name}</span>
      <p>${product.description || "No description available."}</p>
      <div class="product__button">
         <button class="btn btn__farmer">View Details</button>
         <button class="btn btn__contact">Contact</button>
      </div>
    `;

    // View Details click
    card.querySelector(".btn__farmer").addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    });

    // Contact click
    card.querySelector(".btn__contact").addEventListener("click", () => {
      // alert("Contact Farmer feature coming soon!");
      window.location.href = "chatbox.html"
    });

    return card;
  }

  // --- Render all products ---
  function renderProducts(products) {
    adsContainer.innerHTML = "";
    products.forEach(p => adsContainer.appendChild(createProductCard(p)));
  }

  renderProducts(allProducts);

  // --- Filters ---
  function filterProducts() {
    const query = (searchInput?.value || '').toLowerCase();
    const category = (categorySelect?.value || 'all').toLowerCase();

    const filtered = allProducts.filter(p => {
      const matchesQuery = !query || (p.name + p.description + p.category).toLowerCase().includes(query);
      const matchesCategory = category === 'all' || p.category.toLowerCase() === category;
      return matchesQuery && matchesCategory;
    });

    renderProducts(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterProducts);
  if (categorySelect) categorySelect.addEventListener('change', filterProducts);
});

