const tourFilterBtns = document.querySelectorAll(".filter-btn");
const tourItems = document.querySelectorAll(".tour-item");

tourFilterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    tourFilterBtns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const filter = this.getAttribute("data-filter");
    tourItems.forEach(item => {
      if (filter === "all" || item.getAttribute("data-type") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});