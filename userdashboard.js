console.log("Logged in user:", JSON.parse(localStorage.getItem("loggedInUser")));

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Redirect if no user is logged in
  if (!user) {
    alert("You must be signed in to access your dashboard.");
    window.location.href = "sign-in.html"; // adjust if your filename is different
    return;
  }

  // Display user info
  const userDisplay = document.querySelector(".user");
  if (userDisplay) {
    userDisplay.textContent = `👤 ${user.fullName || user.username || user.name || user.email}`;
  }

  // If your HTML has IDs for showing user info, populate them too
  const userNameElement = document.getElementById("userName");
  const userEmailElement = document.getElementById("userEmail");
  if (userNameElement) userNameElement.textContent = user.fullName || user.username || user.name || user.email;
  if (userEmailElement) userEmailElement.textContent = user.email || "No email available";

  // Handle logout
  const signOutBtn = document.querySelector(".signout-btn") || document.getElementById("logoutBtn");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("Signed out successfully!");
      window.location.href = "sign-in.html";
    });
  }
});
