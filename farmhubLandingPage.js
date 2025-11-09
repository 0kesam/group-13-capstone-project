const toggle = document.getElementById("toggle");
const navbar = document.getElementById("navbar");

if (toggle && navbar) {
  toggle.addEventListener("click", () => {
    navbar.style.display = navbar.style.display === "block" ? "none" : "block";
  });
}

// for hero section buttons
const marketplaceBtn = document.querySelector(".btn__signup");
const marketplaceBtn2 = document.querySelector(".btn__getstarted");

if (marketplaceBtn) {
  marketplaceBtn.addEventListener("click", () => {
    window.location.href = "marketplaceBuyers.html";
  });
}

if (marketplaceBtn2) {
  marketplaceBtn2.addEventListener("click", () => {
    window.location.href = "getstarted.html";
  });
}
