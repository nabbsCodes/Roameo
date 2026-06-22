// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-link").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});
// ===== DYNAMIC FIELD: show passport question for international trips =====
document.getElementById("tripType").addEventListener("change", function () {
  const passportField = document.getElementById("passportField");
  if (this.value === "international" || this.value === "both") {
    passportField.style.display = "block";
  } else {
    passportField.style.display = "none";
  }
});

// ===== FORM VALIDATION =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // Full name
  const name = document.getElementById("fullName");
  if (name.value.trim().length < 2) {
    name.classList.add("is-invalid");
    isValid = false;
  } else {
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
  }

  // Email
  const email = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add("is-invalid");
    isValid = false;
  } else {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
  }

  // Trip type
  const tripType = document.getElementById("tripType");
  if (tripType.value === "") {
    tripType.classList.add("is-invalid");
    isValid = false;
  } else {
    tripType.classList.remove("is-invalid");
    tripType.classList.add("is-valid");
  }

  // Travel date
  const travelDate = document.getElementById("travelDate");
  if (travelDate.value === "") {
    travelDate.classList.add("is-invalid");
    isValid = false;
  } else {
    travelDate.classList.remove("is-invalid");
    travelDate.classList.add("is-valid");
  }

  // Travellers
  const travellers = document.getElementById("travellers");
  if (travellers.value < 1 || travellers.value === "") {
    travellers.classList.add("is-invalid");
    isValid = false;
  } else {
    travellers.classList.remove("is-invalid");
    travellers.classList.add("is-valid");
  }

  // If all valid show success message
  if (isValid) {
    document.getElementById("formSuccess").style.display = "block";
    document.getElementById("contactForm").reset();
    // Remove all valid states after reset
    document.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
  }
});
// ===== DESTINATION FILTER =====
const filterButtons = document.querySelectorAll(".filter-btn");
const destItems = document.querySelectorAll(".dest-item");
const noResults = document.getElementById("noResults");

filterButtons.forEach(btn => {
  btn.addEventListener("click", function () {

    // Update active button
    filterButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");
    let visibleCount = 0;

    destItems.forEach(item => {
      const type = item.getAttribute("data-type");
      const category = item.getAttribute("data-category");

      if (filter === "all" || filter === type || filter === category) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    // Show no results message if nothing matches
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  });
});

