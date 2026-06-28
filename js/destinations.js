/* ===== destinations.js ===== */

(function () {
  "use strict";

  const filterButtons = document.querySelectorAll(".filter-btn");
  const destItems     = document.querySelectorAll(".dest-item");
  const noResults     = document.getElementById("noResults");

  /**
   * Determines whether a card matches the active filter.
   * A card matches when:
   *  - filter is "all"
   *  - filter matches the card's data-type  (e.g. "domestic" / "international")
   *  - filter matches the card's data-category (e.g. "safari" / "beach")
   */
  function cardMatches(item, filter) {
    if (filter === "all") return true;
    return item.dataset.type === filter || item.dataset.category === filter;
  }

  /**
   * Shows / hides cards with a simple fade + slide transition.
   * Uses requestAnimationFrame so the browser can batch the repaints.
   */
  function applyFilter(filter) {
    let visibleCount = 0;

    destItems.forEach(function (item) {
      if (cardMatches(item, filter)) {
        // Make it participates in the layout again before animating in
        item.style.display = "";
        // Force a reflow so the transition fires from the hidden state
        void item.offsetWidth;
        item.classList.remove("dest-hidden");
        item.classList.add("dest-visible");
        visibleCount++;
      } else {
        item.classList.remove("dest-visible");
        item.classList.add("dest-hidden");
        // Remove from layout after the CSS transition finishes (300 ms)
        item.addEventListener(
          "transitionend",
          function handler() {
            if (item.classList.contains("dest-hidden")) {
              item.style.display = "none";
            }
            item.removeEventListener("transitionend", handler);
          },
          { once: true }
        );
      }
    });

    // Show the "no results" message when nothing matches
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  /** Marks the clicked button as active and fires the filter. */
  function onFilterClick(e) {
    const btn    = e.currentTarget;
    const filter = btn.dataset.filter;

    filterButtons.forEach(function (b) {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    applyFilter(filter);
  }

  /** Initialise — wire up buttons and stamp accessibility attributes. */
  function init() {
    filterButtons.forEach(function (btn) {
      btn.setAttribute("role", "button");
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
      btn.addEventListener("click", onFilterClick);
    });

    // All cards start visible; stamp the class so CSS transition state is clean
    destItems.forEach(function (item) {
      item.classList.add("dest-visible");
    });
  }

  // Run after the DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();