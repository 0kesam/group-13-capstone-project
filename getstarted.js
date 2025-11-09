const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.querySelector('input[type="email"]').value.trim();
  const firstName = form.querySelector('input[placeholder="Enter First Name"]').value.trim();
  const lastName = form.querySelector('input[placeholder="Enter Last Name"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();
  const accountType = form.querySelector("select").value;
  const password = form.querySelectorAll('input[type="password"]')[0].value.trim();
  const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    alert("Account already exists!");
    return;
  }

  const newUser = { email, firstName, lastName, phone, accountType, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  window.location.href = "sign-in.html";
});



