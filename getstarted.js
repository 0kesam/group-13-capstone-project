// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const password = form.querySelector('input[type="password"]:nth-of-type(1)');
  const confirmPassword = form.querySelector('input[type="password"]:nth-of-type(2)');
  const termsCheckbox = form.querySelector('input[type="checkbox"]');
  const googleBtn = document.querySelector(".btn-google");

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic field validation
    const fields = form.querySelectorAll("input[required], select[required]");
    let valid = true;

    fields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.style.border = "1.5px solid red";
      } else {
        field.style.border = "1px solid #ccc";
      }
    });

    // Check password match
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      confirmPassword.focus();
      return;
    }

    // Check terms
    if (!termsCheckbox.checked) {
      alert("You must agree to the terms and policy.");
      return;
    }

    if (!valid) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate successful submission
    alert("✅ Account created successfully!");
    form.reset();
  });

  // Simulate Google login
  googleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("🌿 Redirecting to Google Sign-In...");
  });
});
