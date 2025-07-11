const bookshelf = document.getElementById("bookshelf");
let brandData = [];

async function loadBrands() {
  const files = [
    "brands/auralee.json",
    "brands/gucci.json",
    "brands/comoli.json",
    "brands/cartier.json",
    "brands/dior.json",
    "brands/louisvuitton.json",
    "brands/markaware.json"
  ];

  for (const file of files) {
    try {
      const res = await fetch(file);
      const data = await res.json();
      brandData.push(data);
    } catch (e) {
      console.error(`エラー: ${file} 読み込み失敗`, e);
    }
  }

  renderBookshelf(brandData);
}

function renderBookshelf(data) {
  bookshelf.innerHTML = "";

  const grouped = {};
  data.forEach(brand => {
    if (!grouped[brand.country]) grouped[brand.country] = [];
    grouped[brand.country].push(brand);
  });

  for (const country in grouped) {
    const shelf = document.createElement("div");
    shelf.className = "country-shelf";

    const title = document.createElement("div");
    title.className = "country-title";
    title.textContent = country;
    shelf.appendChild(title);

    const container = document.createElement("div");
    container.className = "brand-container";
    grouped[country].forEach(brand => {
      const card = document.createElement("div");
      card.className = "brand-card";
      card.setAttribute("data-name", brand.name);

      const img = document.createElement("img");
      img.src = brand.logo;
      img.alt = brand.name;

      const name = document.createElement("div");
      name.textContent = brand.name;

      card.appendChild(img);
      card.appendChild(name);
      shelf.appendChild(card);
    });

    bookshelf.appendChild(shelf);
  }
}

function searchBrands() {
  const keyword = document.getElementById("searchBar").value.toLowerCase();
  const cards = document.querySelectorAll(".brand-card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(keyword) ? "block" : "none";
  });
}

loadBrands();