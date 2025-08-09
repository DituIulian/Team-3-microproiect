
// Mock data + puncte user generate aleator)
const userPoints = 9000;
const mockRewards = [
  {
    id: "r1",
    name: "Tastatură RGB Mech-X Tastatură RGB Mech-X Tastatură RGB Mech-X",
    description: " Taste mecanice rapide și durabileTasteastaste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste e mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste  mecanice rapide și durabileTaste mecanice rapide și durabileTaste mecanice rapide și durabile",
    fullDescription: "Tastatură RGaste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste asteaste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste  mecanice rapide și durabileTaste aste mecanice rapide și durabileTaste B Mech-X cu iluminare personalizabilă și switch-uri performante.",
    price: 1200,
    image: "assets/images/poza.png",
    inStock: true,
    stockCount: 8,
    maxStock: 10,
    rank: "Silver",
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
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
    category: "Tech & Gaming",
    type: "Popular"
  }
];

let filteredRewards = [...mockRewards];

// Mock user
const mockUser = {
  id: "u123",
  name: "Iulian",
  avatar: "assets/images/avatar-placeholder.png",
  activityPoints: 11211
};

// let getAvailablePoint() = mockUser.activityPoints; 
function getAvailablePoint() {
  const totalInCart = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return mockUser.activityPoints - totalInCart;
}

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




paginatedRewards.forEach(reward => {
  const card = document.createElement("div");
  card.className = "reward-card";


  const userRankOrder = ["Unranked", "Silver", "Gold", "Diamond", "Legend"];
  const userRankIndex = userRankOrder.indexOf(rankInfo.rank);
  const rewardRankIndex = userRankOrder.indexOf(reward.rank);
  const hasAccess = userRankIndex >= rewardRankIndex;

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
        ${getAvailablePoint() < reward.price ? 'disabled title="AP insuficient"' : ''}
      >Cumpără cu AP</button>
    `;
  }

  // Card final 
  card.innerHTML = `
    <span class="favorite-btn ${favorites.includes(reward.id) ? 'active' : ''}"
        onclick="toggleFavorite('${reward.id}')"
        title="${favorites.includes(reward.id) ? 'Elimină din favorite' : 'Adaugă la favorite'}">
    <i class="fa${favorites.includes(reward.id) ? 's' : 'r'} fa-heart"></i>
  </span>
    <div class="img-wrapper">
      <img src="${reward.image}" alt="${reward.name}">
    </div>

    <h3>${reward.name}</h3>
    <p class="short-desc">${reward.description}</p>
    <p class="category-tag">${reward.category}</p>

    <div class="price-rank-row">
      <div class="price-cost ${getAvailablePoint() < reward.price ? 'not-enough' : ''}">${reward.price} AP ⚡</div>
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
      displayRewards(filteredRewards); // Afișăm pagina i din lista filtrată
    };
    paginationContainer.appendChild(btn);
  }
}


let currentModalQty = 1;

function increaseModalQty() {
  const rewardId = document.querySelector(".modal-add-btn").getAttribute("onclick").match(/'(.*?)'/)[1];
  const r = mockRewards.find(r => r.id === rewardId);
  if (!r) return;

  const totalCartAP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const futureTotal = totalCartAP + (currentModalQty + 1) * r.price;

  if (futureTotal > mockUser.activityPoints) {
    return; 
  }

  currentModalQty++;
  document.getElementById("modal-qty").textContent = currentModalQty;

  updateModalButtons(r);
}

function updateModalButtons(reward) {
  const plusBtn = document.querySelector(".quantity-row button:nth-child(3)");
  const minusBtn = document.querySelector(".quantity-row button:nth-child(1)");

  const totalCartAP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const nextTotal = totalCartAP + (currentModalQty + 1) * reward.price;

  plusBtn.disabled = nextTotal > mockUser.activityPoints;

    if (plusBtn.disabled) {
      plusBtn.setAttribute("title", "AP insuficient");
    } else {
      plusBtn.removeAttribute("title");
    }


  minusBtn.disabled = currentModalQty <= 1;
}

function decreaseModalQty() {
  if (currentModalQty > 1) {
    currentModalQty--;
    document.getElementById("modal-qty").textContent = currentModalQty;

    const rewardId = document.querySelector(".modal-add-btn").getAttribute("onclick").match(/'(.*?)'/)[1];
    const r = mockRewards.find(r => r.id === rewardId);
    updateModalButtons(r);
  }
}


function addToCartFromModal(rewardId) {
  for (let i = 0; i < currentModalQty; i++) {
    handleBuy(rewardId);
  }
  closeModal();
}


function openModal(rewardId) {
  const r = mockRewards.find(r => r.id === rewardId);
  if (!r) return;

  const modal = document.getElementById("product-modal");
  const modalContent = document.querySelector(".modal-content");

  // Calculăm bara de stoc
  const stockPercent = (r.stockCount / r.maxStock) * 100;

modalContent.innerHTML = `
  <span class="close-btn" onclick="closeModal()">&times;</span>

  <!-- Imaginea mare sus -->
  <div class="modal-image-wrapper">
    <img id="modal-image" src="${r.image}" alt="${r.name}" />
    <div class="modal-badges">
      <span class="badge-rank ${r.rank.toLowerCase()}">${r.rank}</span>
      <span class="category-tag">${r.category}</span>
    </div>
  </div>

  <!-- Nume produs -->
  <h3 class="modal-title">${r.name}</h3>

  <!-- Coloanele: stânga / dreapta -->
  <div class="modal-columns">
    <!-- Coloana stângă -->
    <div class="modal-left">
      <div class="modal-description">
        <h4>Descriere</h4>
        <p>${r.description}</p>
      </div>

      <div class="modal-specs">
        <h4>Specificații</h4>
        <ul>
          ${r.fullDescription
            .split('.')
            .filter(p => p.trim().length > 3)
            .map(p => `<li>${p.trim()}</li>`)
            .join('')}
        </ul>
      </div>
    </div>

    <!-- Coloana dreaptă -->
    <div class="modal-right">
      <div class="modal-price-box">
        <span class="price-value">${r.price} AP ⚡</span>
        <span class="price-label">Activity Points Required</span>
      </div>

      <div class="modal-stock">
        <label>Stoc</label>
        <div class="stock-bar">
          <div class="stock-fill" style="width:${(r.stockCount / r.maxStock) * 100}%"></div>
        </div>
        <span class="stock-text">${r.stockCount}/${r.maxStock}</span>
      </div>

      <div class="quantity-row">
        <label>Cantitate</label>
        <div class="quantity-controls">
          <button onclick="decreaseModalQty()">−</button>
          <span id="modal-qty">1</span>
          <button onclick="increaseModalQty()">+</button>
        </div>
      </div>

      <button class="modal-add-btn" onclick="addToCartFromModal('${r.id}')">Adaugă în coș</button>
    </div>
  </div>
`;




  modal.classList.remove("hidden");
  modal.style.display = "flex";
  currentModalQty = 1;
  updateModalButtons(r);
  
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

// eFiltrare de refacut dupa API
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

  // Aplicăm filtrele
  filteredRewards = mockRewards.filter(item => {
    let priceOK = true;

    // Filtru pe slider
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

    // Filtru pe stoc
    let stockOK = true;
    if (activeFilters.stock.length) {
      stockOK = activeFilters.stock.some(condition => {
        if (condition === "în stoc") return item.stockCount > 0;
        if (condition === "stoc epuizat") return item.stockCount === 0;
        if (condition === "noutăți") return item.stockCount >= 1 && item.stockCount <= 3;
        return true;
      });
    }

    const catOK = !activeFilters.category.length || activeFilters.category.includes(item.category);
    const rankOK = !activeFilters.rank.length || activeFilters.rank.includes(item.rank);
    const typeOK = !activeFilters.type.length || activeFilters.type.includes(item.type);

    return priceOK && stockOK && catOK && rankOK && typeOK;
  });

  currentPage = 1; // Resetăm pagina la 1
  displayRewards(filteredRewards); // Afișăm produsele filtrate
}



function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.add("hidden");
  modal.style.display = "none";
}

function handleBuy(rewardId) {
  const r = mockRewards.find(r => r.id === rewardId);
  if (!r) return;

  const totalCart = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (totalCart + r.price > mockUser.activityPoints) {
    alert("Puncte insuficiente pentru acest produs!");
    return;
  }

  const existing = cart.find(i => i.id === r.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: r.id, name: r.name, price: r.price, quantity: 1, image: r.image, category: r.category });
  }

  updateCartUI();
  displayRewards(mockRewards); 
}




function updateCartUI() {
  
 const list = document.getElementById("cart-items");
 const panel = document.getElementById("cart-panel");
  list.innerHTML = "";
  
 const totalCartAP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

if (cart.length === 0) {
  panel.classList.add("empty-cart");
  list.innerHTML = `<div><img src="assets/icons/empty-bag.svg" alt="empty" /><p>Coșul de cumpărături este gol</p></div>`;
  document.getElementById("cart-total").textContent = "0";

const badge = document.getElementById("cart-badge");
if (badge) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

  updateUserPointsDisplay();
  return;
} else {
  panel.classList.remove("empty-cart");
}



cart.forEach(item => {
  const itemTotal = item.price * item.quantity;
  const totalWithoutCurrent = totalCartAP - itemTotal;
  const costIfIncreased = totalWithoutCurrent + (item.quantity + 1) * item.price;
  const disablePlus = costIfIncreased > mockUser.activityPoints;

  const li = document.createElement("li");
  li.className = "cart-item";
  li.innerHTML = `
    <div class="cart-item-img">
      <img src="${item.image}" alt="${item.name}" />
    </div>
    <div class="cart-item-details">
      <strong>${item.name}</strong>
      <p class="category">${item.category || ""}</p>
      <div class="quantity-control">
        <button class="decrease cart-action" data-id="${item.id}">−</button>
        <span>${item.quantity}</span>
        <button 
          class="increase cart-action" 
          data-id="${item.id}" 
          ${disablePlus ? 'disabled title="AP insuficient"' : ''}
          style="${disablePlus ? 'opacity: 0.5; cursor: not-allowed;' : ''}"
        >+</button>
      </div>
    </div>
    <div class="cart-item-price">
      ${item.price * item.quantity} AP ⚡
      <button class="remove-item cart-action" data-id="${item.id}">🗑️</button>
    </div>
  `;

  list.appendChild(li);
});


document.getElementById("cart-total").textContent = totalCartAP;
updateUserPointsDisplay();

const badge = document.getElementById("cart-badge");
if (badge) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "inline-block" : "none";
}

const checkoutBtn = document.getElementById("checkout-btn");
checkoutBtn.disabled = totalCartAP === 0 || totalCartAP > mockUser.activityPoints;
checkoutBtn.style.opacity = checkoutBtn.disabled ? "0.5" : "1";
checkoutBtn.style.cursor = checkoutBtn.disabled ? "not-allowed" : "pointer";


}




function checkout() {
  if (cart.length === 0) return alert("Coșul este gol!");

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  if (total > mockUser.activityPoints) return alert("Puncte insuficiente!");

  mockUser.activityPoints -= total;

  alert(`Comandă finalizată! Ai cheltuit ${total} AP.`);
  cart.length = 0;
  updateCartUI();
  updateUserPointsDisplay();
  displayRewards(mockRewards); 

  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = "0";
    badge.style.display = "none";
  }

  document.getElementById("cart-panel").style.display = "none";
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
  
  
document.addEventListener("click", e => {
  const cartPanel = document.getElementById("cart-panel");
  const toggleBtn = document.getElementById("toggle-cart");

  const clickedInsideCart = cartPanel.contains(e.target);
  const clickedToggleBtn = toggleBtn.contains(e.target);
  const isCartAction = e.target.classList.contains("cart-action");

  if (!clickedInsideCart && !clickedToggleBtn && !isCartAction) {
    cartPanel.style.display = "none";
  }
});


document.getElementById("toggle-cart").addEventListener("click", e => {
  e.stopPropagation(); 
  const panel = document.getElementById("cart-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
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


  const heartBtn = document.querySelector(`.favorite-btn[onclick="toggleFavorite('${id}')"] i`);
  if (heartBtn) {
    heartBtn.classList.remove("animate");
    void heartBtn.offsetWidth;
    heartBtn.classList.add("animate");
  }

  setTimeout(() => {
    displayRewards(mockRewards);
  }, 300); 
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
   document.getElementById("user-name").textContent = user.name || "Utilizator";
  updateUserPointsDisplay();
}

function updateUserPointsDisplay() {
  document.querySelector(".user-points").textContent = `${getAvailablePoint()} AP ⚡`;
}

document.getElementById("cart-items").addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (!id) return;

  //  Decrease
  if (e.target.classList.contains("decrease")) {
    const item = cart.find(p => p.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      const index = cart.findIndex(p => p.id === id);
      if (index !== -1) cart.splice(index, 1);
    }
    updateCartUI();
    displayRewards(mockRewards);
  }

 // Increase
if (e.target.classList.contains("increase")) {
  const item = cart.find(p => p.id === id);
  if (item) {
    const costTotalNou = cart.reduce((sum, i) => sum + i.price * i.quantity, 0) + item.price;

    if (costTotalNou > mockUser.activityPoints) {
      alert("Nu ai suficiente puncte pentru a adăuga încă un produs.");
      return;
    }

    item.quantity++;
    updateCartUI();
    displayRewards(mockRewards);
  }
}


  // Remove
  if (e.target.classList.contains("remove-item")) {
    const index = cart.findIndex(p => p.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartUI();
      displayRewards(mockRewards);
    }
  }
});


function toggleUserMenu() {
    const menu = document.getElementById("user-menu");
    menu.classList.toggle("hidden");
}

document.addEventListener("click", function (event) {
    const pill = document.querySelector(".user-pill");
    const menu = document.getElementById("user-menu");

    if (!pill.contains(event.target)) {
        menu.classList.add("hidden");
    }
});

function filterFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoriteRewards = mockRewards.filter(reward => favorites.includes(reward.id));
  displayRewards(favoriteRewards);

  document.getElementById("user-menu").classList.add("hidden");

  document.getElementById("show-all-btn")?.classList.remove("hidden");
}

