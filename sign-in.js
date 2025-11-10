const loginForm = document.querySelector(".sign-in-form");
const password = document.getElementById("password");
const email = document.getElementById("email");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(password.value, email.value);
  if (!password || !email) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(
      "https://farmhub-backend-26rg.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password.value,
          email: email.value,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("authToken", data.token);
      alert(data.message);
      window.location.href = "marketplaceFarmers.html";
    }
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.log(error);
    alert(error.message);
  }
});
