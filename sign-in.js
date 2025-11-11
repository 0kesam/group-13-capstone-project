const loginForm = document.querySelector(".sign-in-form");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(
      "https://farmhub-backend-26rg.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.user?.name || "User");
      localStorage.setItem("userId", data.user?.id); // <-- important
      alert(data.message || "Login successful!");
      window.location.href = "marketplaceFarmers.html";
    } else {
      alert(data.message || "Invalid email or password.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }
});






