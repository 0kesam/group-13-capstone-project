document.getElementById("sendCodeBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (!email) {
    message.textContent = "Please enter your email address.";
    message.style.color = "red";
    return;
  }

  // Simulate sending verification code
  message.textContent = `Verification code sent to ${email}.`;
  message.style.color = "green";
});

document.getElementById("resetPasswordBtn").addEventListener("click", () => {
  const code = document.getElementById("confirmationCode").value.trim();
  const message = document.getElementById("message");

  if (!code) {
    message.textContent = "Please enter the confirmation code.";
    message.style.color = "red";
    return;
  }

  // Simulate successful password reset
  message.textContent = "Password reset successful! You can now sign in.";
  message.style.color = "green";
});
