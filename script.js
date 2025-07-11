const brandList = document.getElementById("brand-list");

// 読み込みたいブランドファイル名（brands フォルダ内）
const brandFiles = [
  "auralee.json",
  "gucci.json",
  "markaware.json"
];

// JSONを順番に読み込んで表示
brandFiles.forEach(file => {
  fetch(`brands/${file}`)
    .then(response => response.json())
    .then(brand => {
      const div = document.createElement("div");
      div.className = "bg-white p-4 rounded shadow hover:shadow-lg transition text-sm";
      div.id = brand.designer.current.name;

      div.innerHTML = `
        <img src="${brand.logo}" alt="${brand.name} logo" class="h-20 mx-auto object-contain mb-4">
        <h2 class="text-xl font-bold text-center mb-2">${brand.name}</h2>
        <p class="text-center text-gray-600 mb-2">${brand.founded} / ${brand.founder}</p>
        <p class="text-center text-gray-500 mb-4">${brand.style}</p>
        <p class="mb-4">${brand.description}</p>

        <h3 class="text-md font-semibold mt-4 mb-2">定番アイテム</h3>
        <div class="space-y-2">
          ${brand.iconicItems.map(item => `
            <div class="border rounded p-2">
              <img src="${item.image}" alt="${item.name}" class="h-32 w-full object-cover mb-2 rounded">
              <p class="font-semibold">${item.name}</p>
              <p class="text-gray-600">${item.description}</p>
              <p class="text-right text-gray-800 mt-1">${item.price}</p>
            </div>
          `).join('')}
        </div>

        <h3 class="text-md font-semibold mt-4 mb-1">
          デザイナー：<a href="#${brand.designer.current.name}" class="underline text-burgundy">${brand.designer.current.name}</a>
        </h3>
        <p class="mb-1">${brand.designer.current.bio}</p>
        <p class="text-gray-600 italic">哲学：「${brand.designer.current.philosophy}」</p>

        ${brand.designer.previous && brand.designer.previous.length > 0 ? `
          <h4 class="text-md font-semibold mt-4 mb-1">歴代デザイナー</h4>
          <ul class="list-disc ml-5 text-gray-700">
            ${brand.designer.previous.map(prev => `
              <li><strong>${prev.name}</strong>（${prev.years}） - ${prev.note}</li>
            `).join('')}
          </ul>
        ` : ''}
      `;

      brandList.appendChild(div);
    });
});