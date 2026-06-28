// ===== ROAMEO GALLERY CAROUSEL =====

const slideImages = [
  "../assets/maasai-mara-1.jpg",
  "../assets/diani-beach-1.png",
  "../assets/zanzibar-1.jpg",
  "../assets/rwanda-1.jpg",
  "../assets/cape-town-1.jpg",
  "../assets/namibia-1.jpg",
  "../assets/egypt-1.jpg",
  "../assets/jordan-1.jpg",
  "../assets/europe-1.jpg"
];

const slideInfo = [
  { title: "Maasai Mara, Kenya", text: "Home to the Big Five and the spectacular wildebeest migration across endless golden plains." },
  { title: "Diani Beach, Kenya", text: "Powder-white sands and warm Indian Ocean waters along Kenya's stunning south coast." },
  { title: "Zanzibar, Tanzania", text: "Spice markets, Stone Town alleys, and some of East Africa's most pristine beaches." },
  { title: "Kigali & Volcanoes, Rwanda", text: "Lush green hills, gorilla trekking in misty highlands, and a vibrant capital city reborn." },
  { title: "Cape Town, South Africa", text: "Table Mountain views, vibrant culture, and award-winning Cape winelands." },
  { title: "Namib Desert, Namibia", text: "Towering red dunes meeting the wild Atlantic coastline." },
  { title: "Cairo & Luxor, Egypt", text: "Ancient pyramids, the timeless Nile, and millennia of history." },
  { title: "Petra, Jordan", text: "A rose-red city carved into desert cliffs — one of the world's great wonders." },
  { title: "Classic Europe Grand Tour", text: "France, Belgium, Netherlands, Switzerland, Austria and Italy — seven countries in one journey." }
];

const slideshow = document.getElementById("slideshow");
const carousel = document.getElementById("carousel");
const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");

let current = 0;
let animating = false;
const RADIUS = 25;

// Build slides
const slides = slideImages.map(img => {
  const div = document.createElement("div");
  div.className = "gallery-slide";
  div.style.backgroundImage = `url(${img})`;
  carousel.appendChild(div);
  return div;
});

function getTransform(pos) {
  const angle = pos * 47 + 141;
  const scale = Math.abs(pos) === 1 ? 2.8 : 1.2;
  return `rotate(${angle}deg) translateY(${RADIUS}rem) rotate(${-angle}deg) scale(${scale})`;
}

function update() {
  slides.forEach((slide, i) => {
    let offset = (i - current + slides.length) % slides.length;
    if (offset > slides.length / 2) offset -= slides.length;

    if (offset === 0) {
      slide.style.display = "none";
    } else if (Math.abs(offset) <= 2) {
      slide.style.display = "block";
      slide.style.opacity = "1";
      slide.style.transform = getTransform(offset);
    } else {
      slide.style.display = "none";
    }
  });

  slideshow.style.backgroundImage = `url(${slideImages[current]})`;
  infoTitle.textContent = slideInfo[current].title;
  infoText.textContent = slideInfo[current].text;
}

function goTo(target) {
  if (animating || target === current) return;
  animating = true;
  const total = slides.length;
  let diff = (target - current + total) % total;
  const step = diff > total / 2 ? -1 : 1;

  function tick() {
    current = (current + step + total) % total;
    update();
    if (current !== target) setTimeout(tick, 280);
    else animating = false;
  }
  tick();
}

document.querySelector(".gallery-arrow.left").addEventListener("click", () => {
  goTo((current - 1 + slides.length) % slides.length);
});

document.querySelector(".gallery-arrow.right").addEventListener("click", () => {
  goTo((current + 1) % slides.length);
});

setInterval(() => {
  if (!animating) goTo((current + 1) % slides.length);
}, 5000);

update();