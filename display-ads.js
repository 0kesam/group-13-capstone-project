document.addEventListener("DOMContentLoaded", () => {
  const adsContainer =
    document.getElementById("adsContainer") ||
    document.getElementById("productGrid");

  if (!adsContainer) return;

  // --- Get all hardcoded/static products from the HTML ---
  const hardcodedProducts = Array.from(
    document.querySelectorAll(".product__cards")
  ).map((card) => ({
    id:
      card.dataset.productId ||
      `${card.dataset.category}-${Math.random().toString(36).slice(2, 8)}`,
    name: card.querySelector("span")?.textContent || "Product",
    category: card.dataset.category || "General",
    date: card.dataset.date || new Date().toISOString(),
    description: card.querySelector("p")?.textContent || "",
    image: card.querySelector("img")?.src || "img/default.jpg",
    price: card.dataset.price || "",
  }));

  // --- Get new ads created by users from localStorage ---
  const savedAds = JSON.parse(localStorage.getItem("farmhubAds")) || [];
  const formattedAds = savedAds.map((ad) => ({
    id: ad.id,
    name: ad.productName,
    category: ad.category,
    date: ad.datePosted || new Date().toISOString(),
    description: ad.description,
    image: ad.images?.[0] || "img/default.jpg",
    price:
      ad.priceRange?.from && ad.priceRange?.to
        ? `₦${ad.priceRange.from} - ₦${ad.priceRange.to}`
        : "",
  }));

  // --- Merge both sets of products ---
  const allProducts = [...hardcodedProducts, ...formattedAds];

  // --- Function to create a product card dynamically ---
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

    // --- View Details ---
    card.querySelector(".btn__farmer").addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    });

    // --- Contact ---
    card.querySelector(".btn__contact").addEventListener("click", () => {
      window.location.href = "chatbox.html";
    });

    return card;
  }

  // --- Add only new ads (skip re-rendering existing static ones) ---
  formattedAds.forEach((product) => {
    adsContainer.appendChild(createProductCard(product));
  });
});
