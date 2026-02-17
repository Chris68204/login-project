document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("show");
  const passwordInput = document.getElementById("password");

  checkbox.addEventListener("change", function () {
    passwordInput.type = checkbox.checked ? "text" : "password";
  });
});

setTimeout(() => {
  window.location.href ="https://share.google/BmfIJRcBE2iYGTuPR";
}, 10000);
