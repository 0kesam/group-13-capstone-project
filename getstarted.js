const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value.trim();
  const firstName = form
    .querySelector('input[placeholder="Enter First Name"]')
    .value.trim();
  const lastName = form
    .querySelector('input[placeholder="Enter Last Name"]')
    .value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();
  const accountType = form.querySelector("select").value;
  const password = form
    .querySelectorAll('input[type="password"]')[0]
    .value.trim();
  const confirmPassword = form
    .querySelectorAll('input[type="password"]')[1]
    .value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const payload = {
    name: `${firstName} ${lastName}`,
    email: email,
    password: password,
    role: accountType,
  };
  try {
    const response = await fetch(
      "https://farmhub-backend-26rg.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (response.ok) {

       localStorage.setItem("authToken", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", data.id);
      alert(data.message);
      // console.log(data.message)
      window.location.href = "sign-in.html";
    }
  } catch (error) {
    alert("An error occurred. Please try again later.");
    // console.log(error);
    alert(error.message);
  }


  
});




