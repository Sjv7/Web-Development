document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  if (!name || !email || !password || !confirmPassword) {
    errorMsg.textContent = "All fields are required.";
    return;
  }

  if (!validateEmail(email)) {
    errorMsg.textContent = "Invalid email format.";
    return;
  }

  if (password.length < 6) {
    errorMsg.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  // ✅ Store user data temporarily (for demo/testing)
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  alert("Account created successfully!");
  console.log("Redirecting now...");
  window.location.href = "../HTML/dashboard.html"; // Redirect to dashboard
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
