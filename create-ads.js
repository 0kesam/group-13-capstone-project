document.addEventListener("DOMContentLoaded", () => {
  const sellBtn = document.getElementById("sellBtn");
  const buyBtn = document.getElementById("buyBtn");
  const adForm = document.getElementById("adForm");
  const uploadInput = document.getElementById("imageUpload");
  const preview = document.getElementById("preview");
  const submitBtn = document.querySelector(".submit-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const backBtn = document.querySelector(".back-btn");

  let adType = "sell"; // default

  // ---- TOGGLE BETWEEN SELL / BUY ----
  sellBtn.addEventListener("click", () => {
    adType = "sell";
    sellBtn.classList.add("active");
    buyBtn.classList.remove("active");
  });

  buyBtn.addEventListener("click", () => {
    adType = "buy";
    buyBtn.classList.add("active");
    sellBtn.classList.remove("active");
  });

  // ---- IMAGE PREVIEW ----
  uploadInput.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    preview.innerHTML = "";
    files.slice(0, 5).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
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
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Get all inputs
    const productName = document.querySelector("input[placeholder='e.g. Watermelon']").value;
    const category = document.querySelector("select").value;
    const location = document.querySelector("input[placeholder='City, State']").value;
    const quantity = document.querySelector("input[placeholder='500']").value;
    const unit = document.querySelectorAll("select")[1].value;
    const priceFrom = document.querySelector("input[placeholder='From (₦)']").value;
    const priceTo = document.querySelector("input[placeholder='To (₦)']").value;
    const availableFrom = document.querySelectorAll("input[type='date']")[0].value;
    const availableUntil = document.querySelectorAll("input[type='date']")[1].value;
    const description = document.querySelector("textarea").value;
    const organicCertified = document.querySelectorAll("input[type='checkbox']")[0].checked;
    const qualityCertified = document.querySelectorAll("input[type='checkbox']")[1].checked;

    // Basic validation
    if (!productName || !category || !location || !quantity || !unit) {
      alert("Please fill in all required fields (*)");
      return;
    }

    // Handle images (convert to base64)
    const imageFiles = Array.from(uploadInput.files).slice(0, 5);
    const imagePromises = imageFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(imagePromises).then((images) => {
      const adData = {
        id: Date.now(),
        adType,
        productName,
        category,
        location,
        quantity,
        unit,
        priceRange: { from: priceFrom, to: priceTo },
        availableFrom,
        availableUntil,
        description,
        organicCertified,
        qualityCertified,
        images,
        datePosted: new Date().toISOString(),
      };

      // Save to localStorage
      const ads = JSON.parse(localStorage.getItem("farmhubAds")) || [];
      ads.push(adData);
      localStorage.setItem("farmhubAds", JSON.stringify(ads));

      alert("Ad created successfully!");
      window.location.href = "marketPlaceFarmers.html";
    });
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