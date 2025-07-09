document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // Basic email/password check (mocked)
  if (!validateEmail(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters.";
    return;
  }

  // Placeholder: simulate login success
  if (email === "test@example.com" && password === "password123") {
    errorMsg.textContent = "";
    alert("Login successful!");
    window.location.href = "dashboard.html"; // Redirect after login
  } else {
    errorMsg.textContent = "Invalid email or password.";
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
