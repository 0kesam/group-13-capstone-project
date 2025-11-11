document.addEventListener("DOMContentLoaded", () => {
  const adForm = document.getElementById("adForm");
  const uploadInput = document.getElementById("imageUpload");
  const preview = document.getElementById("preview");
  const submitBtn = document.querySelector(".submit-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const backBtn = document.querySelector(".back-btn");

  // ---- IMAGE PREVIEW ----
  uploadInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    preview.innerHTML = "";
    files.slice(0, 5).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result; // preview only
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "10px";
        img.style.marginRight = "10px";
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  // ---- HANDLE FORM SUBMIT ----
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
    const farmerId = localStorage.getItem("userId"); // must store after login/registration

    if (!token || !farmerId) {
      alert("You need to be logged in to create an ad!");
      window.location.href = "sign-in.html";
      return;
    }

    // Prepare payload
    const payload = {
      name: productName,
      description,
      price,
      quantity,
      farmerId,
      // Placeholder for future image support
      images: [] 
    };

    // Convert uploaded images to base64 for preview (if backend supports later)
    const imageFiles = Array.from(uploadInput.files).slice(0, 5);
    if (imageFiles.length > 0) {
      const imagePromises = imageFiles.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }));
      payload.images = await Promise.all(imagePromises);
    }

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
      console.log("Create Ad response:", data);

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

  // ---- CANCEL BUTTON ----
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Discard your ad?")) {
      adForm.reset();
      preview.innerHTML = "";
    }
  });

  // ---- BACK BUTTON ----
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
});
