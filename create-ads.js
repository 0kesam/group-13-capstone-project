document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const productName = document.querySelector("input[placeholder='e.g. Watermelon']").value.trim();
    const description = document.querySelector("textarea").value.trim();
    const price = Number(document.querySelector("input[placeholder='From (₦)']").value.trim());
    const quantity = Number(document.querySelector("input[placeholder='500']").value.trim());

    if (!productName || !description || !price || !quantity) {
      alert("Please fill in all required fields (*)");
      return;
    }

    const token = localStorage.getItem("authToken");
    const farmerId = localStorage.getItem("userId");

    if (!token || !farmerId) {
      alert("You need to be logged in to create an ad!");
      window.location.href = "sign-in.html";
      return;
    }

    // Only required fields for backend
    const payload = {
      name: productName,
      description,
      price,
      quantity,
      farmerId
    };

    try {
      const response = await fetch("https://farmhub-backend-26rg.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Ad created successfully!");
        window.location.href = "marketPlaceFarmers.html";
      } else {
        alert(data.message || "Failed to create ad. Please try again.");
      }
    } catch (error) {
      console.error("Create Ad error:", error);
      alert("An error occurred while creating the ad.");
    }
  });
});
