// ===== Tab switching =====
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// ===== See more button =====
document.querySelector(".see-more").addEventListener("click", () => {
  alert("More products coming soon!");
});

// ===== Navigation linking =====
document.querySelector(".logo").addEventListener("click", () => {
  window.location.href = "marketplace.html";
});
