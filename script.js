
// Mock data + puncte user generate aleator)
const userPoints = 9000;
const mockRewards = [
  {
    id: "r1",
    name: "Tastatură RGB Mech-X Tastatură RGB Mech-X Tastatură RGB Mech-X",
    description: " Taste mecanice rapide și durabileTaste mecanice rapide și durabileTaste mecanice rapide și durabileTaste mecanice rapide și durabile",
    fullDescription: "Tastatură RGB Mech-X cu iluminare personalizabilă și switch-uri performante.",
    price: 1200,
    image: "assets/images/keyboard.jpg",
    inStock: true,
    stockCount: 8,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "legendary"
  },
  {
    id: "r2",
    name: "Mouse Gaming UltraClick 360",
    description: "Mouse cu precizie laser",
    fullDescription: "Mouse de gaming cu senzor de mare precizie și DPI ajustabil.",
    price: 2100,
    image: "assets/images/mouse.jpg",
    inStock: true,
    stockCount: 5,
    maxStock: 10,
    rank: "Gold",
    category: "Accesorii Tech & Gaming",
    type: "Rar"
  },
  {
    id: "r3",
    name: "Căști ThunderBass Pro",
    description: "Sunet cinematic pentru jocuri",
    fullDescription: "Căști over-ear cu bass puternic și microfon cu reducere de zgomot.",
    price: 3800,
    image: "assets/images/headphones.jpg",
    inStock: true,
    stockCount: 6,
    maxStock: 10,
    rank: "Legend",
    category: "Accesorii Tech & Gaming",
    type: "Legendary"
  },
  {
    id: "r4",
    name: "Tastatură Neon Blaze",
    description: "Performanță și stil unic",
    fullDescription: "Tastatură compactă cu taste PBT și iluminare neon.",
    price: 5200,
    image: "assets/images/keyboard.jpg",
    inStock: true,
    stockCount: 9,
    maxStock: 10,
    rank: "Gold",
    category: "Merch GT",
    type: "Rar"
  },
  {
    id: "r5",
    name: "Mouse ShadowStrike",
    description: "Control total în FPS",
    fullDescription: "Mouse ușor, ideal pentru competiții, cablu flexibil tip paracord.",
    price: 2600,
    image: "assets/images/mouse.jpg",
    inStock: true,
    stockCount: 4,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  },
  {
    id: "r6",
    name: "Căști Crystal Audio",
    description: "Imersiune audio clară",
    fullDescription: "Căști cu drivere calibrate pentru un sunet echilibrat.",
    price: 4800,
    image: "assets/images/headphones.jpg",
    inStock: false,
    stockCount: 0,
    maxStock: 10,
    rank: "Diamond",
    category: "Accesorii Tech & Gaming",
    type: "Legendary"
  },
  {
    id: "r7",
    name: "Tastatură Shadow Core TKL",
    description: "TKL pentru eSports",
    fullDescription: "Layout TKL pentru mai mult spațiu de mouse, cablu detașabil USB-C.",
    price: 900,
    image: "assets/images/keyboard.jpg",
    inStock: true,
    stockCount: 3,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Rar"
  },
  {
    id: "r8",
    name: "Mouse Lightning Claw",
    description: "Ergonomie și viteză",
    fullDescription: "Formă ergonomică, skates PTFE și memorie onboard.",
    price: 1500,
    image: "assets/images/mouse.jpg",
    inStock: true,
    stockCount: 7,
    maxStock: 10,
    rank: "Gold",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  },
  {
    id: "r9",
    name: "Căști SoundBlaze 2.0",
    description: "Sunet echilibrat",
    fullDescription: "Sunet echilibrat pentru gaming, muzică și call-uri.",
    price: 3300,
    image: "assets/images/headphones.jpg",
    inStock: true,
    stockCount: 2,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Rar"
  },
  {
    id: "r10",
    name: "Tastatură Lightning RGB Pro",
    description: "RGB avansat pe fiecare tastă",
    fullDescription: "Iluminare pe fiecare tastă, profile multiple, switch-uri hot-swap.",
    price: 7000,
    image: "assets/images/keyboard.jpg",
    inStock: true,
    stockCount: 10,
    maxStock: 10,
    rank: "Diamond",
    category: "Accesorii Tech & Gaming",
    type: "Legendary"
  },
  {
    id: "r11",
    name: "Mouse Mech-X Ed. Limitată",
    description: "Coating premium",
    fullDescription: "Senzor optic de ultimă generație, cablu detașabil.",
    price: 950,
    image: "assets/images/mouse.jpg",
    inStock: true,
    stockCount: 1,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  },
  {
    id: "r12",
    name: "Căști Mech-X Studio",
    description: "Microfon detașabil",
    fullDescription: "Sunet clar, microfon detașabil, build premium.",
    price: 4200,
    image: "assets/images/headphones.jpg",
    inStock: true,
    stockCount: 6,
    maxStock: 10,
    rank: "Gold",
    category: "Accesorii Tech & Gaming",
    type: "Rar"
  },
  {
    id: "r13",
    name: "Tastatură RapidStrike K60",
    description: "Rapidă și fiabilă",
    fullDescription: "Plate din aluminiu, anti-ghosting complet, N-key rollover.",
    price: 6100,
    image: "assets/images/keyboard.jpg",
    inStock: false,
    stockCount: 0,
    maxStock: 10,
    rank: "Diamond",
    category: "Merch GT",
    type: "Legendary"
  },
  {
    id: "r14",
    name: "Mouse UltraGrip V2",
    description: "Grip excelent",
    fullDescription: "Textură anti-alunecare și butoane programabile.",
    price: 2750,
    image: "assets/images/mouse.jpg",
    inStock: true,
    stockCount: 8,
    maxStock: 10,
    rank: "Gold",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  },
  {
    id: "r15",
    name: "Căști Crystal Talk",
    description: "Claritate pe voice chat",
    fullDescription: "Microfon cu reducerea zgomotului și monitorizare sidetone.",
    price: 3400,
    image: "assets/images/headphones.jpg",
    inStock: true,
    stockCount: 4,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Rar"
  },
  {
    id: "r16",
    name: "Tastatură Core 60% Mini",
    description: "Ultra compactă",
    fullDescription: "Format 60% ideal pentru spațiu și portabilitate.",
    price: 1800,
    image: "assets/images/keyboard.jpg",
    inStock: true,
    stockCount: 5,
    maxStock: 10,
    rank: "Gold",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  },
  {
    id: "r17",
    name: "Mouse SpeedWireless",
    description: "Wireless low-latency",
    fullDescription: "Conexiune wireless 1ms, baterie de lungă durată.",
    price: 2400,
    image: "assets/images/mouse.jpg",
    inStock: false,
    stockCount: 0,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Rar"
  },
  {
    id: "r18",
    name: "Căști BassCore",
    description: "Bass profund",
    fullDescription: "Bass profund fără distorsiuni, pernițe memory foam.",
    price: 3100,
    image: "assets/images/headphones.jpg",
    inStock: true,
    stockCount: 9,
    maxStock: 10,
    rank: "Gold",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  },
  {
    id: "r19",
    name: "Tastatură Mech-X Legend",
    description: "Build metalic",
    fullDescription: "Cadrul metalic asigură rigiditate și durabilitate.",
    price: 8900,
    image: "assets/images/keyboard.jpg",
    inStock: true,
    stockCount: 2,
    maxStock: 10,
    rank: "Diamond",
    category: "Accesorii Tech & Gaming",
    type: "Legendary"
  },
  {
    id: "r20",
    name: "Mouse LiteClaw",
    description: "Greutate redusă",
    fullDescription: "Carcasă ușoară, cablu soft, glide excelent.",
    price: 1300,
    image: "assets/images/mouse.jpg",
    inStock: true,
    stockCount: 7,
    maxStock: 10,
    rank: "Silver",
    category: "Accesorii Tech & Gaming",
    type: "Popular"
  }
];

// Mock user
const mockUser = {
  id: "u123",
  name: "Iulian",
  avatar: "assets/images/avatar-placeholder.png",
  activityPoints: 11211
};

let availablePoints = mockUser.activityPoints; 

const currentWeek = 5; // Poate vine dintr-o variabila globala, API, etc
const rankInfo = getUserRankByWeek(currentWeek);
const progress = getWeekProgress(currentWeek, rankInfo.weekStart, rankInfo.weekEnd);

function getUserRankByWeek(currentWeek) {
  if (currentWeek >= 2 && currentWeek <= 4) {
    return { rank: "Silver", weekStart: 2, weekEnd: 4 };
  } else if (currentWeek >= 5 && currentWeek <= 7) {
    return { rank: "Gold", weekStart: 5, weekEnd: 7 };
  } else if (currentWeek >= 8 && currentWeek <= 10) {
    return { rank: "Diamond", weekStart: 8, weekEnd: 10 };
  } else if (currentWeek >= 11 && currentWeek <= 24) {
    return { rank: "Legend", weekStart: 11, weekEnd: 24 }; //De decis numarul max de sapt pana la reset
  } else {
    return { rank: "Unranked", weekStart: null, weekEnd: null };
  }
}

function getWeekProgress(currentWeek, weekStart, weekEnd) {
  const total = weekEnd - weekStart + 1;
  const completed = currentWeek - weekStart + 1;

  if (currentWeek < weekStart) return 0;
  if (currentWeek > weekEnd) return 100;

  return Math.round((completed / total) * 100);
}



const cart = [];
let currentPage = 1;
const itemsPerPage = 12;

function displayRewards(rewards) {
  const container = document.getElementById("rewards-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedRewards = rewards.slice(start, start + itemsPerPage);



 // Carduri
paginatedRewards.forEach(reward => {
  const card = document.createElement("div");
  card.className = "reward-card";

  // === Rank access logic ===
  const userRankOrder = ["Unranked", "Silver", "Gold", "Diamond", "Legend"];
  const userRankIndex = userRankOrder.indexOf(rankInfo.rank);
  const rewardRankIndex = userRankOrder.indexOf(reward.rank);
  const hasAccess = userRankIndex >= rewardRankIndex;

  // === Butoane în funcție de condiții ===
  let actionHTML = '';
  if (!reward.inStock) {
    actionHTML = `<button class="out-of-stock-btn" disabled>Stoc epuizat</button>`;
  } else if (!hasAccess) {
    actionHTML = `<button class="out-of-stock-btn" disabled title="Deblochează rank ${reward.rank}">🔒 Indisponibil</button>`;
  } else {
    actionHTML = `
      <button onclick="openModal('${reward.id}')">Vezi detalii</button>
      <button 
        onclick="handleBuy('${reward.id}')"
        ${availablePoints < reward.price ? 'disabled title="AP insuficient"' : ''}
      >Cumpără cu AP</button>
    `;
  }

  // === Card final ===
  card.innerHTML = `
    <span class="favorite-btn ${favorites.includes(reward.id) ? 'active' : ''}" onclick="toggleFavorite('${reward.id}')">🤍</span>

    <div class="img-wrapper">
      <img src="${reward.image}" alt="${reward.name}">
    </div>

    <h3>${reward.name}</h3>
    <p class="short-desc">${reward.description}</p>
    <p class="category-tag">${reward.category}</p>

    <div class="price-rank-row">
      <div class="price-cost ${availablePoints < reward.price ? 'not-enough' : ''}">${reward.price} AP ⚡</div>
      <span class="badge-rank ${reward.rank.toLowerCase()}">${reward.rank}</span>
    </div>

    <div class="stock-bar">
      <div class="stock-fill" style="width:${(reward.inStock ? (reward.stockCount / reward.maxStock) * 100 : 0)}%"></div>
      <span class="stock-text">${reward.inStock ? reward.stockCount + '/' + reward.maxStock : 'Stoc epuizat'}</span>
    </div>

    <div class="card-actions">
      ${actionHTML}
    </div>
  `;

  container.appendChild(card);
});


  renderPagination(rewards.length);
}

// Paginare
function renderPagination(totalItems) {
  const pages = Math.ceil(totalItems / itemsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = (i === currentPage ? "active" : "");
    btn.onclick = () => {
      currentPage = i;
      applyFilters(); 
    };
    paginationContainer.appendChild(btn);
  }
}


function openModal(rewardId) {
  const r = mockRewards.find(r => r.id === rewardId);
  if (!r) return;
  
  document.getElementById("modal-image").src = r.image;
  document.getElementById("modal-name").textContent = r.name;
  document.getElementById("modal-description").textContent = r.fullDescription;
  document.getElementById("modal-price").textContent = r.price;
  document.getElementById("modal-stock").textContent = r.inStock ? `În stoc: ${r.stockCount}` : "Stoc epuizat";
  document.getElementById("modal-buy-btn").onclick = () => {
    handleBuy(r.id);
    closeModal();
  };
  const modal = document.getElementById("product-modal");
  modal.classList.remove("hidden");
  modal.style.display = "flex";
  document.getElementById("product-modal").addEventListener("click", (e) => {
  const modalContent = document.querySelector(".modal-content");
  if (!modalContent.contains(e.target)) {
    closeModal();
  }
});
}

// Sidebar filtrare

const priceSliderElement = document.getElementById('price-slider');
const priceSliderDisplay = document.getElementById('price-slider-display');
const intervalCheckbox = document.getElementById("use-price-interval");
const priceRangeCheckboxes = document.querySelectorAll(".price-range-checkbox");


const allPrices = mockRewards.map(p => p.price);
const minPrice = Math.min(...allPrices);
const maxPrice = Math.max(...allPrices);


noUiSlider.create(priceSliderElement, {
  start: [minPrice, maxPrice],
  connect: true,
  step: 10,
  range: {
    min: minPrice,
    max: maxPrice
  },
  tooltips: false,
  format: {
    to: value => Math.round(value),
    from: value => parseFloat(value)
  }
});


priceSliderElement.noUiSlider.on('update', (values) => {
  const [min, max] = values;
  priceSliderDisplay.textContent = `${min} AP – ${max} AP`;

  if (intervalCheckbox.checked) {
    applyFilters();
  }
});


function handleExclusivePriceCheckboxes(changed) {
  if (changed === "interval") {
    priceRangeCheckboxes.forEach(cb => cb.checked = false);
  } else {
    intervalCheckbox.checked = false;
    applyFilters(); 
  }
}

intervalCheckbox.addEventListener("change", () => {
  handleExclusivePriceCheckboxes("interval");
  applyFilters();
});

priceRangeCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => {
    handleExclusivePriceCheckboxes("range");
  });
});

// eFiltrare
function applyFilters() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  const useSlider = intervalCheckbox.checked;

  const lowChecked = document.querySelector('input[value="low"]')?.checked;
  const mediumChecked = document.querySelector('input[value="medium"]')?.checked;
  const highChecked = document.querySelector('input[value="high"]')?.checked;

  const activeFilters = {
    category: [],
    rank: [],
    type: [],
    stock: [],
  };

  
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const label = cb.parentElement.textContent.trim().toLowerCase();
      const cleanLabel = label.trim().toLowerCase();

      if (
        label.includes("merch") || label.includes("vouchere") ||
        label.includes("tech") || label.includes("avatar") ||
        label.includes("mystery") || label.includes("experiențe") || label.includes("badges")
      ) {
        activeFilters.category.push(cb.parentElement.textContent.trim());
      } else if (
        label.includes("silver") || label.includes("gold") ||
        label.includes("diamond") || cleanLabel === "legend"
      ) {
        activeFilters.rank.push(cb.parentElement.textContent.trim());
      } else if (
        label.includes("popular") || label.includes("rar") || cleanLabel === "legendary"
      ) {
        activeFilters.type.push(cb.parentElement.textContent.trim());
      } else if (
      label.includes("în stoc") || label.includes("noutăți") || label.includes("stoc epuizat")
    ) {
      activeFilters.stock.push(label); 
    }

    }
  });


 const filtered = mockRewards.filter(item => {
 
 let priceOK = true;

if (useSlider && priceSliderElement.noUiSlider) {
  const [min, max] = priceSliderElement.noUiSlider.get();
  priceOK = item.price >= parseInt(min) && item.price <= parseInt(max);
} else {
  const priceRanges = [];

  if (lowChecked) priceRanges.push([0, 500]);
  if (mediumChecked) priceRanges.push([501, 1000]);
  if (highChecked) priceRanges.push([1001, Infinity]);

  if (priceRanges.length > 0) {
    priceOK = priceRanges.some(([min, max]) => item.price >= min && item.price <= max);
  }
}



  let stockOK = true;
  if (activeFilters.stock.length) {
    stockOK = activeFilters.stock.some(condition => {
      if (condition === "în stoc") return item.stockCount > 0;
      if (condition === "stoc epuizat") return item.stockCount === 0;
      if (condition === "noutăți") return item.stockCount >= 1 && item.stockCount <= 3; // de redefinit
      return true;
    });
  }

  const catOK = !activeFilters.category.length || activeFilters.category.includes(item.category);
  const rankOK = !activeFilters.rank.length || activeFilters.rank.includes(item.rank);
   const typeOK = !activeFilters.type.length || activeFilters.type.includes(item.type);
   

  return priceOK && stockOK && catOK && rankOK && typeOK;
});

 
  displayRewards(filtered);
}


function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.add("hidden");
  modal.style.display = "none";
}

function handleBuy(rewardId) {
  const r = mockRewards.find(r => r.id === rewardId);
  if (!r) return;

  const existing = cart.find(i => i.id === r.id);
  const itemTotal = r.price;

  if (itemTotal > availablePoints) {
    alert("Puncte insuficiente pentru acest produs!");
    return;
  }

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: r.id, name: r.name, price: r.price, quantity: 1 });
  }

  availablePoints -= itemTotal;
  updateCartUI();
  updateUserPointsDisplay();
  applyFilters(); // <--- AICI se face magia
}



function updateCartUI() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} – ${item.price * item.quantity} AP`;
    list.appendChild(li);
  });
  document.getElementById("cart-total").textContent = total;
}

function checkout() {
  if (cart.length === 0) return alert("Coșul este gol!");

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (total > availablePoints) return alert("Puncte insuficiente!");

  alert(`Comandă finalizată! Ai cheltuit ${total} AP.`);
  cart.length = 0;
  updateCartUI();
  updateUserPointsDisplay(); 
}


function toggleFilter(header) {
  header.parentElement.classList.toggle("collapsed");
}

document.addEventListener("DOMContentLoaded", () => {
  displayRewards(mockRewards);
  displayUserInfo(mockUser); // De inlocuit din API - fetch("/api/user/profile")
  // .then(res => res.json())
  // .then(data => displayUserInfo(data));
 document.getElementById("search-input").addEventListener("input", e => {
  const value = normalizeText(e.target.value);

  if (value && !lastSearches.includes(value)) {
    lastSearches.unshift(value);
    if (lastSearches.length > 5) lastSearches.pop();
    localStorage.setItem("lastSearches", JSON.stringify(lastSearches));
  }

  const filtered = mockRewards.filter(r => {
    const name = normalizeText(r.name);
    const description = normalizeText(r.description);
    return name.includes(value) || description.includes(value);
  });

  displayRewards(filtered);
});
  document.getElementById("toggle-cart").addEventListener("click", e => {
    e.stopPropagation();
    const panel = document.getElementById("cart-panel");
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", e => {
    const panel = document.getElementById("cart-panel");
    const btn = document.getElementById("toggle-cart");
    if (!panel.contains(e.target) && !btn.contains(e.target)) panel.style.display = "none";
  });
  document.getElementById("toggleFilters").addEventListener("click", () =>
    document.getElementById("filter-sidebar").classList.toggle("active")
  );

  document.getElementById("close-filters").addEventListener("click", () => {
  document.getElementById("filter-sidebar").classList.remove("active");
});
});

document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("filter-sidebar");
  const toggle = document.getElementById("toggleFilters");

  // Dacă este activ sidebar-ul și click-ul nu e înăuntru
  if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});


document.querySelectorAll("input[type=checkbox], input[type=range]").forEach(input => {
  input.addEventListener("change", () => {
    applyFilters();
  });
});

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(id) {
  const index = favorites.indexOf(id);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayRewards(mockRewards);
}

const lastSearches = JSON.parse(localStorage.getItem("lastSearches")) || [];


function normalizeText(str) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function displayUserInfo(user) {
  document.querySelector(".badge-rank").textContent = rankInfo.rank.toUpperCase();
  document.querySelector(".badge-rank").className = "badge-rank " + rankInfo.rank.toLowerCase();
  document.querySelector(".week-start").textContent = `Săpt. a ${rankInfo.weekStart} a`;
  document.querySelector(".week-end").textContent = `Săpt. a ${rankInfo.weekEnd} a`;
  document.querySelector(".progress-bar").style.width = `${progress}%`;
  document.querySelector(".user-points").textContent = `${user.activityPoints} AP ⚡`;
  document.querySelector(".user-avatar img").src = user.avatar;
  updateUserPointsDisplay();
}

function updateUserPointsDisplay() {
  document.querySelector(".user-points").textContent = `${availablePoints} AP ⚡`;
}