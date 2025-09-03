const scriptURL =
  "https://script.google.com/macros/s/AKfycbwBOLCqXYNOMMHEzV8_42sdp1xeMxqj4vpSkeb735-ddRb-tF0jLJovKR8UfIPvb2Zc/exec";
const form = document.getElementById("registerForm");

// Show Address only when Cab = Yes
const cabReq = document.getElementById("cabReq");
const addressGroup = document.getElementById("addressGroup");
const addressInput = document.getElementById("address");
const submitBtn = form.querySelector("button[type='submit']");
const kids = document.getElementById("kids");
const kidsGroup = document.getElementById("kidsGroup");
const numKids = document.getElementById("numKids");
const kidAgesGroup = document.getElementById("kidAgesGroup");
const kidAgeInputs = document.getElementById("kidAgeInputs");

// Disable button on form submit
form.addEventListener("submit", function (e) {
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  setTimeout(() => {
    submitBtn.textContent = "Register Now";
  }, 2000); // show status
});

kids.addEventListener("change", function () {
  console.log(this.value === "Yes");
  if (this.value === "Yes") {
    kidsGroup.style.display = "block";
    numKids.required = true;
  } else {
    kidsGroup.style.display = "none";
    kidAgesGroup.style.display = "none";
    kidAgeInputs.innerHTML = "";
    numKids.value = "";
  }
});
numKids.addEventListener("change", function () {
  kidAgeInputs.innerHTML = ""; 
  const count = parseInt(this.value);
  if (count > 0) {
    kidAgesGroup.style.display = "block";
    for (let i = 1; i <= count; i++) {
      const div = document.createElement("div");
      div.classList.add("form-group");
      div.innerHTML = `
        <label for="kidAge${i}">Age of Kid ${i} *</label>
        <input type="number" id="kidAge${i}" min="0" required />
      `;
      kidAgeInputs.appendChild(div);
    }
  } else {
    kidAgesGroup.style.display = "none";
  }
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
    kids: document.getElementById("kids").value, // Yes / No
    numKids: document.getElementById("numKids").value, // 1 or 2, if kids = Yes
    kid1Ages: document.getElementById(`kidAge${0}`).value,
    kid2Ages: document.getElementById(`kidAge${1}`).value,
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
