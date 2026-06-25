// ===== CALENDAR FILTER =====
const calFilterBtns = document.querySelectorAll(".filter-btn");
const calItems = document.querySelectorAll(".cal-item");
const monthBlocks = document.querySelectorAll(".cal-month-block");

calFilterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    calFilterBtns.forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    const filter = this.getAttribute("data-filter");

    calItems.forEach(item => {
      const type = item.getAttribute("data-type");
      const month = item.getAttribute("data-month");
      if (filter === "all" || filter === type || filter === month) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Hide empty month blocks
    monthBlocks.forEach(block => {
      const visibleItems = block.querySelectorAll(".cal-item[style='display: block;'], .cal-item:not([style])");
      const allItems = block.querySelectorAll(".cal-item");
      let hasVisible = false;
      allItems.forEach(item => {
        if (item.style.display !== "none") hasVisible = true;
      });
      block.style.display = hasVisible ? "block" : "none";
    });
  });
});