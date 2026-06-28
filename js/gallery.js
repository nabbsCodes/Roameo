// ===== ROAMEO 3D GALLERY CAROUSEL =====

const images = [
  "../assets/maasai-mara-1.jpg",
  "../assets/diani-beach-1.png",
  "../assets/zanzibar-1.jpg",
  "../assets/rwanda-1.jpg",
  "../assets/cape-town-1.jpg",
  "../assets/namibia-1.jpg",
  "../assets/egypt-1.jpg",
  "../assets/jordan-1.jpg",
  "../assets/europe-1.jpg",
  "../assets/amboseli-1.jpg",
  "../assets/lamu-1.jpg",
  "../assets/mount-kenya-1.jpg"
];

const alts = [
  "Maasai Mara Kenya safari",
  "Diani Beach Kenya coastline",
  "Zanzibar beach Tanzania",
  "Rwanda Volcanoes gorillas",
  "Cape Town Table Mountain",
  "Namib Desert dunes Namibia",
  "Cairo pyramids Egypt",
  "Petra Jordan desert city",
  "Classic Europe Grand Tour",
  "Amboseli elephants Kilimanjaro",
  "Lamu Island Swahili culture",
  "Mount Kenya alpine hiking"
];

const container = document.getElementById("a3d");
const N = images.length;

container.style.setProperty("--n", N);

images.forEach((src, i) => {
  const img = document.createElement("img");
  img.className = "card3d";
  img.src = src;
  img.alt = alts[i];
  img.style.setProperty("--i", i);
  container.appendChild(img);
});