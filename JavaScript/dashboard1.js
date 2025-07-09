// Load user data from localStorage
const userName = localStorage.getItem("userName") || "User";
const userEmail = localStorage.getItem("userEmail") || "";

// Personalized greeting
document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcome-text");
  const emailInfo = document.getElementById("user-email-info");

  welcomeText.textContent = `Welcome, ${userName}! 🎉`;

  if (userEmail) {
    emailInfo.textContent = `Your email: ${userEmail}`;
  }
});

function logout() {
  alert("Logging out...");
  // You can clear data here if needed: localStorage.clear();
  window.location.href = "login.html";
}
