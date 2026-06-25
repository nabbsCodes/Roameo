// ===== CALENDAR MONTH CLICK =====
const monthBoxes = document.querySelectorAll(".month-box.active-month");
const tripBlocks = document.querySelectorAll(".month-trips-block");
const selectPrompt = document.getElementById("selectPrompt");

monthBoxes.forEach(box => {
  box.addEventListener("click", function () {
    const month = this.getAttribute("data-month");

    // Update active state on month boxes
    monthBoxes.forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");

    // Hide all trip blocks and prompt
    tripBlocks.forEach(block => block.style.display = "none");
    selectPrompt.style.display = "none";

    // Show the clicked month's trips
    const target = document.getElementById("trips-" + month);
    if (target) {
      target.style.display = "block";
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});