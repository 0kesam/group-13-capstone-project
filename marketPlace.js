document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const sortSelect = document.querySelector(".relevant select");
    const productGrid = document.getElementById("productGrid");

    let productCards = Array.from(document.querySelectorAll(".product__cards"));

    function filterAndSortProducts() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;

        // Filter Logic
        let filteredProducts = productCards.filter(card => {
            const text = card.innerText.toLowerCase();
            const category = card.dataset.category;
            const matchSearch = text.includes(searchValue);
            const matchCategory = (selectedCategory === "all" || selectedCategory === category);
            return matchSearch && matchCategory;
        });

        // Sorting Logic
        filteredProducts.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);

            if (selectedSort === "Newest") return dateB - dateA;
            if (selectedSort === "Oldest") return dateA - dateB;
            return 0; // Most Relevant (default)
        });

        // Clear grid & re-append new order
        productGrid.innerHTML = "";
        filteredProducts.forEach(card => productGrid.appendChild(card));
    }

    // Event Listeners
    searchInput.addEventListener("input", filterAndSortProducts);
    categorySelect.addEventListener("change", filterAndSortProducts);
    sortSelect.addEventListener("change", filterAndSortProducts);

    filterAndSortProducts(); // run initially
});


// for buyers farmers add btn
const buyersAddbtn = document.getElementById("buyerAdsBtn")
const farmersAddbtn = document.getElementById("farmerAdsBtn");
buyersAddbtn.addEventListener("click", ()=> {
   window.location.href = "marketplaceBuyers.html"
})
farmersAddbtn.addEventListener("click", ()=> {
   window.location.href = "marketPlaceFarmers.html"
})