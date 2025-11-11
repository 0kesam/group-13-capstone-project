async function getProducts() {
  try {
    const response = await fetch(
      "https://farmhub-backend-26rg.onrender.com/api/products",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    console.log("Fetched products:", products);

    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product__cards");
      card.dataset.productId = product.id;
      card.dataset.farmerId = product.farmerId;

      // If images are supported later, replace "placeholder.png" with product.image
      card.innerHTML = `
        <img src="placeholder.png" class="product__image" alt="${product.name}" />
        <span>${product.name}</span>
        <p>${product.description}</p>
        <p>₦${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <button class="btn__farmer">View Farmer</button>
        <button class="btn__contact">Contact</button>
      `;

      productGrid.appendChild(card);
    });

    // Reattach click events after dynamically adding cards
    if (typeof attachCardClicks === "function") attachCardClicks();
    if (typeof attachFilters === "function") attachFilters();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getProducts();
});
