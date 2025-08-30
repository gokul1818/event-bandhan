const scriptURL =
  "https://script.google.com/macros/s/AKfycbwBOLCqXYNOMMHEzV8_42sdp1xeMxqj4vpSkeb735-ddRb-tF0jLJovKR8UfIPvb2Zc/exec";
const form = document.getElementById("registerForm");

// Show Address only when Cab = Yes
const cabReq = document.getElementById("cabReq");
const addressGroup = document.getElementById("addressGroup");
const addressInput = document.getElementById("address");

const submitBtn = form.querySelector("button[type='submit']");

// Disable button on form submit
form.addEventListener("submit", function (e) {
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
   setTimeout(() => {
      submitBtn.textContent = "Register Now";
    }, 2000); // show status
});

// Toggle Address field based on Cab requirement
cabReq.addEventListener("change", function () {
  if (this.value === "Yes") {
    addressGroup.style.display = "block";
    addressInput.required = true;
  } else {
    addressGroup.style.display = "none";
    addressInput.required = false;
    addressInput.value = "";
  }
});

// ✅ Success modal function (define it properly)
function showSuccessModal() {
  alert("Form submitted successfully!");
  // You can replace this with your modal logic if you have one
}

// Make it globally accessible
window.showSuccessModal = showSuccessModal;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    designation: document.getElementById("designation").value,
    companyName: document.getElementById("companyName").value,
    mobileNumber: document.getElementById("mobileNumber").value,
    email: document.getElementById("email").value,
    cabReq: document.getElementById("cabReq").value,
    address: document.getElementById("address").value,
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.result === "success") {
        alert("Registration submitted successfully!");
        form.reset();
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("There was an error submitting the form.");
    });
});
