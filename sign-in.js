const signInBtn = document.querySelector(".sign-in-btn");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find((u) => u.email === email && u.password === password);

  if (matchedUser) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    window.location.href = "userdashboard.html";
  } else {
    alert("No account found. Please create one first.");
  }
});




const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Save user info
  localStorage.setItem("currentUser", JSON.stringify({ name, email }));

  window.location.href = "userdashboard.html";
});

