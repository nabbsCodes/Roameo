// ===== ROAMEO CIRCULAR GALLERY CAROUSEL =====

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
  { title: "Namib Desert, Namibia", text: "Towering red dunes meeting the wild Atlantic coastline — one of Africa's most surreal landscapes." },
  { title: "Cairo & Luxor, Egypt", text: "Ancient pyramids, the timeless Nile, and millennia of history along the edge of the desert." },
  { title: "Petra, Jordan", text: "A rose-red city carved into desert cliffs — one of the world's most breathtaking ancient wonders." },
  { title: "Classic Europe Grand Tour", text: "France, Belgium, the Netherlands, Switzerland, Austria, and Italy — seven countries in one grand journey." }
];

const slideshow = document.getElementById("slideshow");
const carousel = document.getElementById("carousel");
const infoTitle = document.getElementById("info-title");
const infoText = document.getElementById("info-text");
const size = 55;

let currentSlide = 0;
let isAnimating = false;

const slides = slideImages.map(img => {
  const div = document.createElement("div");
  div.className = "slide";
  div.style.backgroundImage = `url(${img})`;
  carousel.appendChild(div);
  return div;
});

function getSlideTransform(position) {
  const radius = size / 2;
  const angle = position * 47 + 141;
  const scale = position === 0 ? 4 : (position === -1 || position === 1 ? 2.5 : 1);
  return `rotate(${angle}deg) translateY(${radius}rem) rotate(${-angle}deg) scale(${scale})`;
}

function updateSlides() {
  const positions = [-2, -1, 0, 1, 2];
  slides.forEach((slide, i) => {
    let offset = (i - currentSlide + slides.length) % slides.length;
    if (offset > slides.length / 2) offset -= slides.length;
    if (positions.includes(offset)) {
      slide.style.display = "block";
      slide.style.transform = getSlideTransform(offset);
      slide.style.opacity = "1";
      slide.style.zIndex = offset === 0 ? "10" : "5";
    } else {
      slide.style.display = "none";
      slide.style.opacity = "0";
    }
  });
  slideshow.style.backgroundImage = `url(${slideImages[currentSlide]})`;
  infoTitle.textContent = slideInfo[currentSlide].title;
  infoText.textContent = slideInfo[currentSlide].text;
}

function moveToSlide(target) {
  if (isAnimating) return;
  isAnimating = true;
  let diff = (target - currentSlide + slides.length) % slides.length;
  if (diff === 0) { isAnimating = false; return; }
  const step = diff > slides.length / 2 ? -1 : 1;
  let current = currentSlide;
  function animate() {
    current = (current + step + slides.length) % slides.length;
    currentSlide = current;
    updateSlides();
    if (current !== target) {
      setTimeout(animate, 300);
    } else {
      isAnimating = false;
    }
  }
  animate();
}

document.querySelector(".arrow.left").addEventListener("click", () => {
  moveToSlide((currentSlide - 1 + slides.length) % slides.length);
});
document.querySelector(".arrow.right").addEventListener("click", () => {
  moveToSlide((currentSlide + 1) % slides.length);
});

// Auto-advance every 5 seconds
setInterval(() => {
  moveToSlide((currentSlide + 1) % slides.length);
}, 5000);

updateSlides();