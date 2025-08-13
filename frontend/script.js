
const inferApiBase = () => {
  if (location.protocol.startsWith('http')) {
    const host = (location.host || 'localhost');
    return `${location.origin}/api`;
  }
  // fallback 
  // return 'http://localhost:51853/api';  // Pentru cand o sa avem setat un port fix
};
const API_BASE = (window.API_BASE || '').trim() || inferApiBase();


async function apiFetch(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options,
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      const err = new Error(`HTTP ${res.status}`);
      err.status = res.status;
      err.body = txt;
      throw err;
    }
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : null;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Timeout: serverul nu a răspuns în 8 secunde.');
    if (e.status === 404) throw new Error('404: Endpoint inexistent sau port greșit.');
    if (e.status === 500) throw new Error('500: Eroare pe server.');
    throw new Error(e.message || 'Eroare de rețea / CORS.');
  } finally {
    clearTimeout(timer);
  }
}

const api = {
 
  getUserProfile: (userId = 'user1') =>
    apiFetch(`/user/profile?userid=${encodeURIComponent(userId)}`),

  getRewards: () =>
    apiFetch(`/rewards`), 

  addToCart: (rewardId, quantity = 1) =>
    apiFetch(`/cart/add`, { method: 'POST', body: JSON.stringify({ rewardId, quantity }) }),

  getCart: (userId = 'user1') =>
    apiFetch(`/cart?userid=${encodeURIComponent(userId)}`),

  checkout: (items) =>
    apiFetch(`/checkout`, { method: 'POST', body: JSON.stringify({ items }) }),

  getHistory: (userId = 'user1') =>
  apiFetch(`/user/history?userid=${encodeURIComponent(userId)}`),
};

// toast simplu
function showToast(msg) { alert(msg); }


let currentUser = null;           
let allRewards = [];              
let filteredRewards = [];         
let currentPage = 1;
const itemsPerPage = 12;
let serverCartItems = [];         
let serverCartTotal = 0;          




//  Rank & progress (doar frontend momentan)
// !!! BACKEND nu trimite rankul utilizatorului si nr saptamani
// // functioneaza doar din frontend
const currentWeek = 12;
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
    return { rank: "Legend", weekStart: 11, weekEnd: 24 };
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

function getAvailablePoint() {
  const balance = currentUser?.activityPoints ?? 0;
  return Math.max(0, balance - (serverCartTotal ?? 0));
}


//  Pagination + Rewards 
function displayRewards(rewards) {
  const container = document.getElementById("rewards-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedRewards = rewards.slice(start, start + itemsPerPage);

  paginatedRewards.forEach(reward => {
    const card = document.createElement("div");
    card.className = "reward-card";

   
    const userRankEnum = getCurrentUserRankEnum();
    const rewardRankEnum = reward.rankEnum || toRankEnum(reward.rank || reward.itemRank || reward.requiredRank || 'SILVER');
    const hasAccess = isUnlocked(userRankEnum, rewardRankEnum);

    let actionHTML = '';
    if (reward.inStock === false || (reward.stockCount ?? 0) === 0) {
      actionHTML = `<button class="out-of-stock-btn" disabled>Stoc epuizat</button>`;
    } else if (!hasAccess) {
      actionHTML = `<button class="out-of-stock-btn" disabled title="Deblochează rank ${rankLabel(rewardRankEnum)}">🔒 Indisponibil</button>`;
    } else {
      actionHTML = `
        <button onclick="openModal('${reward.id}')">Vezi detalii</button>
        <button
          data-id="${reward.id}"
          data-rank="${rewardRankEnum}"
          class="buy-btn"
          ${getAvailablePoint() < reward.price ? 'disabled title="AP insuficient"' : ''}
          onclick="handleBuy('${reward.id}')"
        >Cumpără cu AP</button>
      `;
    }


    // stoc: backend nu trimite maxStock -> folosim fallback
    const maxStock = (reward.maxStock ?? reward.stockMax ?? Math.max(Number(reward.stockCount || 0), 10));
    const stockCount = Number(reward.stockCount || 0);
    const stockPercent = Math.min(100, Math.round((stockCount / (maxStock || 1)) * 100));

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
      <p class="short-desc">${reward.description || ''}</p>
      <p class="category-tag">${reward.category || ''}</p>

      <div class="price-rank-row">
        <div class="price-cost ${getAvailablePoint() < reward.price ? 'not-enough' : ''}">${Math.round(reward.price)} AP ⚡</div>
        <span class="badge-rank ${rankLabel(rewardRankEnum).toLowerCase()}">${rankLabel(rewardRankEnum)}</span>
      </div>

      <div class="stock-bar">
        <div class="stock-fill" style="width:${stockPercent}%"></div>
        <span class="stock-text">${stockCount}${reward.maxStock ? '/' + reward.maxStock : ''}</span>
      </div>

      <div class="card-actions">
        ${actionHTML}
      </div>
    `;

    container.appendChild(card);
  });

  renderPagination(rewards.length);
}

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
      displayRewards(filteredRewards);
    };
    paginationContainer.appendChild(btn);
  }
}


//   Modal 

let currentModalQty = 1;

function increaseModalQty() {
  const rewardId = document.querySelector(".modal-add-btn")?.getAttribute("data-rid");
  const r = allRewards.find(r => String(r.id) === String(rewardId));
  if (!r) return;

  const futureTotal = serverCartTotal + (currentModalQty + 1) * r.price;
  if (futureTotal > (currentUser?.activityPoints ?? 0)) return;

  currentModalQty++;
  document.getElementById("modal-qty").textContent = currentModalQty;
  updateModalButtons(r);
}

function decreaseModalQty() {
  if (currentModalQty > 1) {
    currentModalQty--;
    document.getElementById("modal-qty").textContent = currentModalQty;
    const rewardId = document.querySelector(".modal-add-btn")?.getAttribute("data-rid");
    const r = allRewards.find(r => String(r.id) === String(rewardId));
    if (r) updateModalButtons(r);
  }
}

function updateModalButtons(reward) {
  const plusBtn = document.querySelector(".quantity-row button:nth-child(3)");
  const minusBtn = document.querySelector(".quantity-row button:nth-child(1)");

  const nextTotal = serverCartTotal + (currentModalQty + 1) * reward.price;
  plusBtn.disabled = nextTotal > (currentUser?.activityPoints ?? 0);
  if (plusBtn.disabled) plusBtn.setAttribute("title", "AP insuficient");
  else plusBtn.removeAttribute("title");

  minusBtn.disabled = currentModalQty <= 1;
}

function addToCartFromModal(rewardId) {
  handleBuy(rewardId, currentModalQty);
  closeModal();
}

function openModal(rewardId) {
  const r = allRewards.find(r => String(r.id) === String(rewardId));
  if (!r) return;

  const modal = document.getElementById("product-modal");
  const modalContent = document.querySelector(".modal-content");

  // stoc 
  const maxStock = (r.maxStock ?? r.stockMax ?? Math.max(Number(r.stockCount || 0), 10));
  const stockCount = Number(r.stockCount || 0);
  const stockPercent = Math.min(100, Math.round((stockCount / (maxStock || 1)) * 100));

  const rewardRank = r.rank || "Unranked"; // // functioneaza doar din frontend

  modalContent.innerHTML = `
    <span class="close-btn" onclick="closeModal()">&times;</span>

    <div class="modal-image-wrapper">
      <img id="modal-image" src="${r.image}" alt="${r.name}" />
      <div class="modal-badges">
        <span class="badge-rank ${(rewardRank || '').toLowerCase()}">${rewardRank}</span>
        <span class="category-tag">${r.category || ''}</span>
      </div>
    </div>

    <h3 class="modal-title">${r.name}</h3>

    <div class="modal-columns">
      <div class="modal-left">
        <div class="modal-description">
          <h4>Descriere</h4>
          <p>${r.description || ''}</p>
        </div>
        <div class="modal-specs">
          <h4>Specificații</h4>
          <ul>
            ${(r.fullDescription || '')
              .split('.')
              .filter(p => p.trim().length > 3)
              .map(p => `<li>${p.trim()}</li>`)
              .join('')}
          </ul>
        </div>
      </div>

      <div class="modal-right">
        <div class="modal-price-box">
          <span class="price-value">${Math.round(r.price)} AP ⚡</span>
          <span class="price-label">Activity Points necesari</span>
        </div>

        <div class="modal-stock">
          <label>Stoc</label>
          <div class="stock-bar">
            <div class="stock-fill" style="width:${stockPercent}%"></div>
          </div>
          <span class="stock-text">${stockCount}${r.maxStock ? '/' + r.maxStock : ''}</span>
        </div>

        <div class="quantity-row">
          <label>Cantitate</label>
          <div class="quantity-controls">
            <button onclick="decreaseModalQty()">−</button>
            <span id="modal-qty">1</span>
            <button onclick="increaseModalQty()">+</button>
          </div>
        </div>

        <button class="modal-add-btn" data-rid="${r.id}" onclick="addToCartFromModal('${r.id}')">Adaugă în coș</button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.style.display = "flex";
  currentModalQty = 1;
  updateModalButtons(r);

  document.getElementById("product-modal").addEventListener("click", (e) => {
    const c = document.querySelector(".modal-content");
    if (!c.contains(e.target)) closeModal();
  }, { once: true });
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.classList.add("hidden");
  modal.style.display = "none";
}

//  Filters (client-side pe allRewards)
const priceSliderElement = document.getElementById('price-slider');
const priceSliderDisplay = document.getElementById('price-slider-display');
const intervalCheckbox = document.getElementById("use-price-interval");
const priceRangeCheckboxes = document.querySelectorAll(".price-range-checkbox");

function setupPriceSliderIfNeeded() {
  if (!priceSliderElement || !allRewards.length) return;
  const prices = allRewards.map(p => Number(p.price || 0));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (!priceSliderElement.noUiSlider) {
    noUiSlider.create(priceSliderElement, {
      start: [minPrice, maxPrice],
      connect: true,
      step: 10,
      range: { min: minPrice, max: maxPrice },
      tooltips: false,
      format: { to: v => Math.round(v), from: v => parseFloat(v) }
    });
    priceSliderElement.noUiSlider.on('update', (values) => {
      const [min, max] = values;
      if (priceSliderDisplay) priceSliderDisplay.textContent = `${min} AP – ${max} AP`;
      if (intervalCheckbox?.checked) applyFilters();
    });
  } else {
    priceSliderElement.noUiSlider.updateOptions({
      start: [minPrice, maxPrice],
      range: { min: minPrice, max: maxPrice }
    });
  }
}

function handleExclusivePriceCheckboxes(changed) {
  if (changed === "interval") {
    priceRangeCheckboxes.forEach(cb => cb.checked = false);
  } else {
    if (intervalCheckbox) intervalCheckbox.checked = false;
    applyFilters();
  }
}

intervalCheckbox?.addEventListener("change", () => {
  handleExclusivePriceCheckboxes("interval");
  applyFilters();
});
priceRangeCheckboxes.forEach(cb => {
  cb.addEventListener("change", () => handleExclusivePriceCheckboxes("range"));
});

function applyFilters() {
  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  const useSlider = !!intervalCheckbox?.checked;

  const lowChecked = document.querySelector('input[value="low"]')?.checked;
  const mediumChecked = document.querySelector('input[value="medium"]')?.checked;
  const highChecked = document.querySelector('input[value="high"]')?.checked;

  const activeFilters = { category: [], rank: [], type: [], stock: [] };

  checkboxes.forEach(cb => {
    if (cb.checked) {
      const label = cb.parentElement.textContent.trim().toLowerCase();
      const cleanLabel = label.trim().toLowerCase();

      if (label.includes("merch") || label.includes("vouchere") ||
          label.includes("tech") || label.includes("avatar") ||
          label.includes("mystery") || label.includes("experiențe") || label.includes("badges")) {
        activeFilters.category.push(cb.parentElement.textContent.trim());
      } else if (label.includes("silver") || label.includes("gold") ||
                 label.includes("diamond") || cleanLabel === "legend") {
        activeFilters.rank.push(cb.parentElement.textContent.trim()); 
      } else if (label.includes("popular") || label.includes("rar") || cleanLabel === "legendary") {
        activeFilters.type.push(cb.parentElement.textContent.trim()); 
      } else if (label.includes("în stoc") || label.includes("noutăți") || label.includes("stoc epuizat")) {
        activeFilters.stock.push(label);
      }
    }
  });

  filteredRewards = allRewards.filter(item => {
    // preț
    let priceOK = true;
    if (useSlider && priceSliderElement?.noUiSlider) {
      const [min, max] = priceSliderElement.noUiSlider.get();
      priceOK = item.price >= parseInt(min) && item.price <= parseInt(max);
    } else {
      const ranges = [];
      if (lowChecked) ranges.push([0, 500]);
      if (mediumChecked) ranges.push([501, 1000]);
      if (highChecked) ranges.push([1001, Infinity]);
      if (ranges.length > 0) {
        priceOK = ranges.some(([min, max]) => item.price >= min && item.price <= max);
      }
    }

    // stoc
    let stockOK = true;
    if (activeFilters.stock.length) {
      stockOK = activeFilters.stock.some(condition => {
        if (condition.includes("în stoc")) return (item.stockCount ?? 0) > 0 && item.inStock !== false;
        if (condition.includes("stoc epuizat")) return (item.stockCount ?? 0) === 0 || item.inStock === false;
        if (condition.includes("noutăți")) return (item.stockCount ?? 0) >= 1 && (item.stockCount ?? 0) <= 3;
        return true;
      });
    }

    //De evaluat daca este mai rapid/usor de modificat din backend sau ramane asa
 
    const categoryMap = {
      "gt rank badges": ["badges", "gt rank badges"],
      "accesorii tech & gaming": ["accesorii tech & gaming", "tech & gaming", "accesorii"],
      "mystery box": ["mystery box", "mystery"],
      "avatars & frames": ["avatar", "avatars", "frames", "avatars & frames"],
      "merch gt": ["merch gt"],
      "vouchere": ["vouchere"],
      "experiențe": ["experiente", "experiențe"] // cu si fara diacritice 
        };
    
  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  const catOK = !activeFilters.category.length ||
    activeFilters.category.some(filterCat => {
      const normalizedFilter = normalizeText(filterCat);
      const synonyms = categoryMap[normalizedFilter] || [normalizedFilter];
      return synonyms.some(syn => normalizeText(item.category).includes(normalizeText(syn)));
    });

    const rankOK = !activeFilters.rank.length || activeFilters.rank.includes(item.rank);   
    const typeOK = !activeFilters.type.length || activeFilters.type.includes(item.type);    

    return priceOK && stockOK && catOK && rankOK && typeOK;
  });

  currentPage = 1;
  displayRewards(filteredRewards);
}



function enrichCartItems(items) {
  return (items || [])
    .filter(ci => (ci?.quantity ?? 0) > 0)
    .map(ci => {
      const r = allRewards.find(x => String(x.id) === String(ci.rewardId));
      return {
        id: ci.rewardId,
        name: ci.name,
        price: ci.price,
        quantity: ci.quantity,
        image: r?.image || 'assets/images/poza.png',
        category: r?.category || '',
      };
    });
}


async function refreshCartUI() {
  try {
    const data = await api.getCart();


    const items = enrichCartItems(data?.items || []);
    serverCartItems = items;

    const backendTotal = Number(data?.totalPoints ?? 0);
    const localTotal = items.reduce((s, it) => s + Math.round((it.price || 0) * (it.quantity || 0)), 0);
    serverCartTotal = backendTotal || localTotal;

    updateCartUI();


    if (serverCartItems.length === 0) {
      closeCart();
    }
  } catch (e) {
    console.warn(e);
  }
}


async function handleBuy(rewardId, qty = 1) {
  try {
    const resp = await api.addToCart(rewardId, qty);
    if (!resp?.success) return showToast(resp?.message || 'Nu am putut adăuga în coș.');
    serverCartItems = enrichCartItems(resp.cart?.items || []);
    serverCartTotal = Number(resp.cart?.totalPoints ?? 0);
    updateCartUI();
    displayRewards(filteredRewards.length ? filteredRewards : allRewards);
  } catch (e) {
    showToast(e.message);
  }
}

async function modifyCartQuantity(rewardId, delta) {
  try {
    const current = serverCartItems.find(p => String(p.id) === String(rewardId));
    if (!current) return;

    if ((current.quantity || 0) + delta < 0) return;

    const resp = await api.addToCart(rewardId, delta);
    if (!resp?.success) return showToast(resp?.message || 'Nu am putut actualiza coșul.');

    serverCartItems = enrichCartItems(resp.cart?.items || []);


    const backendTotal = Number(resp.cart?.totalPoints ?? 0);
    const localTotal = serverCartItems.reduce((s, it) => s + Math.round((it.price || 0) * (it.quantity || 0)), 0);
    serverCartTotal = backendTotal || localTotal;

    updateCartUI();
    displayRewards(filteredRewards.length ? filteredRewards : allRewards);

    if (serverCartItems.length === 0) {
      setTimeout(closeCart, 300);
    }
  } catch (e) {
    showToast(e.message);
  }
}

async function checkout() {
  try {
    if (!serverCartItems.length) return alert("Coșul este gol!");
  
    const cartData = await api.getCart();
    const rawItems = cartData?.items || [];
   
    const resp = await api.checkout(rawItems);
    if (!resp?.success) return showToast(resp?.message || 'Checkout eșuat.');

    //  CALCUL & FALLBACK LOCAL HISTORY
    const total = rawItems.reduce((s, it) => s + Math.round((it.price || 0) * (it.quantity || 0)), 0);
    const orderLocal = {
      id: `local-${Date.now()}`,          //  functioneaza doar din frontend
      createdAt: new Date().toISOString(),//  functioneaza doar din frontend
      totalPoints: total,
      items: rawItems.map(ci => {
        const r = allRewards.find(x => String(x.id) === String(ci.rewardId));
        return {
          rewardId: ci.rewardId,
          name: ci.name,
          price: ci.price,
          quantity: ci.quantity,
          image: r?.image || 'assets/images/poza.png',
          category: r?.category || ''
        };
      })
    };
    saveHistoryLocal(orderLocal);     // functioneaza doar din frontend

    //  Refresh user + cart
    const user = await api.getUserProfile();
    currentUser = user;
    displayUserInfo(user);
    await refreshCartUI();

    showToast('Comandă finalizată! Mulțumim 🛒');
    closeCart();

  } catch (e) {
    showToast(e.message);
  }
}


function updateCartUI() {
  const list = document.getElementById("cart-items");
  const panel = document.getElementById("cart-panel");
  list.innerHTML = "";

    if (serverCartItems.length === 0) {
    panel.classList.add("empty-cart");
    list.innerHTML = `<div><img src="/frontend/assets/icons/empty-bag.png" alt="empty" /><p>Coșul de cumpărături este gol</p></div>`;
    document.getElementById("cart-total").textContent = "0";

    const badge = document.getElementById("cart-badge");
    if (badge) {
      badge.textContent = "0";
      badge.style.display = "none";
    }

    updateUserPointsDisplay();
    updateCheckoutButtonState();

    closeCart();
    return;
  }
 else {
    panel.classList.remove("empty-cart");
  }

  serverCartItems.forEach(item => {
    const itemTotal = Math.round(item.price * item.quantity);

    // calc + disabled daca nu ajung AP
    const totalWithoutCurrent = serverCartTotal - itemTotal;
    const costIfIncreased = totalWithoutCurrent + Math.round((item.quantity + 1) * item.price);
    const disablePlus = costIfIncreased > (currentUser?.activityPoints ?? 0);

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
        ${itemTotal} AP ⚡
        <button class="remove-item cart-action" data-id="${item.id}">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.getElementById("cart-total").textContent = Math.round(serverCartTotal);

  const badge = document.getElementById("cart-badge");
  if (badge) {
    const totalItems = serverCartItems.reduce((acc, it) => acc + (it.quantity || 0), 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }

  updateUserPointsDisplay();
  updateCheckoutButtonState();
}

function updateCheckoutButtonState() {
  const checkoutBtn = document.getElementById("checkout-btn");
  if (!checkoutBtn) return;
  const disabled = serverCartTotal === 0 || serverCartTotal > (currentUser?.activityPoints ?? 0);
  checkoutBtn.disabled = disabled;
  checkoutBtn.style.opacity = disabled ? "0.5" : "1";
  checkoutBtn.style.cursor = disabled ? "not-allowed" : "pointer";
}


//  Favorites & search
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
function toggleFavorite(id) {
  const idx = favorites.indexOf(id);
  if (idx >= 0) favorites.splice(idx, 1);
  else favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  const heartBtn = document.querySelector(`.favorite-btn[onclick="toggleFavorite('${id}')"] i`);
  if (heartBtn) {
    heartBtn.classList.remove("animate");
    void heartBtn.offsetWidth;
    heartBtn.classList.add("animate");
  }

  setTimeout(() => {
    displayRewards(filteredRewards.length ? filteredRewards : allRewards);
  }, 300);
}

const lastSearches = JSON.parse(localStorage.getItem("lastSearches")) || [];
function normalizeText(str) {
  return (str || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

//  User info (din API)
function displayUserInfo(user) {
 
  const rankEl = document.querySelector(".badge-rank");
  if (rankEl) {
    rankEl.textContent = rankInfo.rank.toUpperCase();
    rankEl.className = "badge-rank " + rankInfo.rank.toLowerCase();
  }
  document.querySelector(".week-start").textContent = `Săpt. a ${rankInfo.weekStart} a`;
  document.querySelector(".week-end").textContent = `Săpt. a ${rankInfo.weekEnd} a`;
  document.querySelector(".progress-bar").style.width = `${progress}%`;

  document.querySelector(".user-points").textContent = `${user.activityPoints} AP ⚡`;
  if (user.avatar) document.querySelector(".user-avatar img").src = user.avatar;
  document.getElementById("user-name").textContent = user.name || "Utilizator";
  updateUserPointsDisplay();
}

function updateUserPointsDisplay() {
  document.querySelector(".user-points").textContent = `${getAvailablePoint()} AP ⚡`;
}

//  Events (cos, sidebar, cautare, actiuni cos)
document.getElementById("cart-items").addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (!id) return;

  // −
  if (e.target.classList.contains("decrease")) {
    const item = serverCartItems.find(p => String(p.id) === String(id));
    if (!item) return;
    modifyCartQuantity(id, -1);
  }

  // +
  if (e.target.classList.contains("increase")) {
    const item = serverCartItems.find(p => String(p.id) === String(id));
    if (!item) return;
    modifyCartQuantity(id, +1);
  }

  // Remove item
  if (e.target.classList.contains("remove-item")) {
    const item = serverCartItems.find(p => String(p.id) === String(id));
    if (!item) return;
    modifyCartQuantity(id, -item.quantity);
  }
});

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  menu.classList.toggle("hidden");
}

//User dropdown 
function setupUserMenu() {
  const pill = document.getElementById('user-pill');
  const menu = document.getElementById('user-menu');
  const nameDesktop = document.getElementById('user-name');
  const nameMobile  = document.getElementById('user-name-mobile');
  if (!pill || !menu) return;

  if (nameDesktop && nameMobile) nameMobile.textContent = nameDesktop.textContent;

  const open  = () => { menu.classList.remove('hidden'); pill.setAttribute('aria-expanded','true'); };
  const close = () => { menu.classList.add('hidden');    pill.setAttribute('aria-expanded','false'); };
  const toggle = () => (menu.classList.contains('hidden') ? open() : close());

  pill.onclick = null; 

  const onPill = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    toggle();
  };
  pill.addEventListener('click', onPill, true);  
  pill.addEventListener('touchend', onPill, { passive:false });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !pill.contains(e.target)) close();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  menu.style.zIndex = '4000';
}

document.addEventListener('DOMContentLoaded', setupUserMenu);



function filterFavorites() {
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoriteRewards = allRewards.filter(reward => favs.includes(reward.id));
  filteredRewards = favoriteRewards;
  currentPage = 1;
  displayRewards(filteredRewards);
  document.getElementById("user-menu").classList.add("hidden");
  document.getElementById("show-all-btn")?.classList.remove("hidden");
}

function toggleFilter(headerEl){
  const section = headerEl.closest('.filter-section');
  if (!section) return;
  section.classList.toggle('collapsed');
}



document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("filter-sidebar");
  const toggle = document.getElementById("toggleFilters");
  if (sidebar?.classList.contains("active") && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});



function getCartPanel() { return document.getElementById("cart-panel"); }
function isCartOpen() { return getCartPanel()?.classList.contains("open"); }
function openCart() {
  const p = getCartPanel();
  if (!p) return;
  p.classList.add("open");
}
function closeCart() {
  const p = getCartPanel();
  if (!p) return;
  p.classList.remove("open");
   p.classList.remove("empty-cart"); 
}
function toggleCart() { isCartOpen() ? closeCart() : openCart(); }


document.addEventListener("click", (e) => {
  const panel = getCartPanel();
  const cartBtn = document.getElementById("toggle-cart");


  if (cartBtn && cartBtn.contains(e.target)) {
    e.stopPropagation();
    toggleCart();
    return;
  }

  
  if (panel && isCartOpen() && !panel.contains(e.target)) {
    closeCart();
  }
});




document.getElementById("toggleFilters")?.addEventListener("click", () =>
  document.getElementById("filter-sidebar")?.classList.toggle("active")
);

document.getElementById("close-filters")?.addEventListener("click", () => {
  document.getElementById("filter-sidebar")?.classList.remove("active");
});

document.querySelectorAll("input[type=checkbox], input[type=range]").forEach(input => {
  input.addEventListener("change", () => applyFilters());
});

//   Search (client-side)
document.getElementById("search-input")?.addEventListener("input", e => {
  const value = normalizeText(e.target.value);

  if (value && !lastSearches.includes(value)) {
    lastSearches.unshift(value);
    if (lastSearches.length > 5) lastSearches.pop();
    localStorage.setItem("lastSearches", JSON.stringify(lastSearches));
  }

  const filtered = allRewards.filter(r => {
    const name = normalizeText(r.name);
    const description = normalizeText(r.description);
    return name.includes(value) || description.includes(value);
  });

  filteredRewards = filtered;
  currentPage = 1;
  displayRewards(filteredRewards);
});


//  Initializare app(load din backend)
 
document.addEventListener("DOMContentLoaded", async () => {

  closeCart(); 
  
  try {
    //  User
    currentUser = await api.getUserProfile();
    displayUserInfo(currentUser);

  //  Rewards
const rewardsResp = await api.getRewards();
allRewards = Array.isArray(rewardsResp?.rewards) ? rewardsResp.rewards : (rewardsResp || []);
filteredRewards = [...allRewards];

setupPriceSliderIfNeeded();
displayRewards(filteredRewards);

// Normalize rank + TYPE 
allRewards = allRewards.map(r => {
  const rankEnum = toRankEnum(r.rank || r.itemRank || r.requiredRank || 'SILVER');
  const typeEnum = toTypeEnum(r.type) || deriveTypeFallback(r); // POPULAR / RARE / LEGENDARY

  return {
    ...r,
  
    rankEnum,
    rank: rankLabel(rankEnum),
    
    typeEnum,                     
    type: typeLabel(typeEnum),    
  };
});
filteredRewards = [...allRewards];
 
    //  Cos
    await refreshCartUI();
  } catch (err) {
    console.warn(err);
    showToast(err.message || 'Nu am reușit să mă conectez la server.');
  }
});


const HISTORY_KEY = 'gtshop_history_user1'; 

function loadHistoryLocal() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistoryLocal(order) {
  const list = loadHistoryLocal();
  list.unshift(order); 
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}

function clearHistoryLocal() {
  localStorage.removeItem(HISTORY_KEY);
}


async function fetchHistorySmart(userId = 'user1') {
  try {
    const resp = await api.getHistory(userId);

    const serverItems = Array.isArray(resp)
      ? resp
      : (resp?.items || resp?.orders || []);

    if (serverItems && serverItems.length) {
  
      return serverItems.map(ord => ({
        id: ord.id || ord.orderId || `srv-${Math.random().toString(36).slice(2)}`,
        createdAt: ord.purchaseDate || ord.createdAt || new Date().toISOString(),
        totalPoints: Math.round(ord.totalPoints || 0),
        items: (ord.products || ord.items || []).map(ci => {
          const r = allRewards.find(x => String(x.id) === String(ci.rewardId));
          return {
            rewardId: ci.rewardId,
            name: ci.name,
            price: ci.price,
            quantity: ci.quantity,
            image: r?.image || 'assets/images/poza.png',
            category: r?.category || ''
          };
        })
      }));
    }
   
    return loadHistoryLocal();
  } catch {
    return loadHistoryLocal();
  }
}

// UI pentru istoric 
function openHistory() {
  renderHistoryModal();
}

function closeHistory() {
  const modal = document.getElementById("history-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.style.display = "none";
}

async function renderHistoryModal() {
  const modal = document.getElementById("history-modal");
  const box = modal?.querySelector(".history-content"); 
  if (!modal || !box) return;

  // header + loading
  box.innerHTML = `
    <button class="close-btn" onclick="closeHistory()">✕</button>
    <div class="history-header">
      <div class="history-title">Istoricul meu</div>
      <div class="user-points-inline">${getAvailablePoint()} AP ⚡</div>
    </div>
    <div id="history-body" class="history-loading">Se încarcă…</div>
  `;

  // istoric (server sau local)
  const list = await fetchHistorySmart(currentUser?.id || 'user1');
  const body = document.getElementById("history-body");

  if (!list.length) {
    body.classList.remove("history-loading");
    body.innerHTML = `<div class="history-empty">Nu există comenzi înregistrate.</div>`;
  } else {
    body.classList.remove("history-loading");
    body.innerHTML = list.map((ord, idx) => {
      const d = new Date(ord.createdAt);
      const dateTxt = isNaN(d.getTime()) ? ord.createdAt : d.toLocaleString('ro-RO');

      const rows = (ord.items || []).map(it => {
        const r = allRewards.find(x => String(x.id) === String(it.rewardId));
        const img = r?.image || 'assets/images/poza.png';
        const cat = r?.category || it.category || '';
        const q = it.quantity ?? 1;
        const p = Math.round(it.price ?? 0);
        const line = Math.round(q * p);
        return `
          <div class="history-row">
            <img src="${img}" alt="${it.name}">
            <div>
              <div class="hr-name">${it.name}</div>
              <div class="hr-meta">${cat ? cat + " · " : ""}${q} × ${p} AP</div>
            </div>
            <div class="hr-total">${line} AP</div>
          </div>
        `;
      }).join('');

      return `
        <div class="history-order">
          <div class="history-order-head">
            <div>#${idx + 1}</div>
            <div>${dateTxt}</div>
          </div>
          <div class="history-items">${rows}</div>
          <div class="history-order-foot">
            <div>Total: ${Math.round(ord.totalPoints)} AP ⚡</div>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove("hidden");
  modal.style.display = "flex";


  modal.addEventListener("click", (e) => {
    const c = modal.querySelector(".history-content");
    if (c && !c.contains(e.target)) closeHistory();
  }, { once: true });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeHistory();
  }, { once: true });
}


function applyFilter(type, value) {
  //  reset UI de filter 
  document.querySelectorAll('aside .filter-body input[type=checkbox]').forEach(cb => cb.checked = false);
  if (intervalCheckbox) intervalCheckbox.checked = false;

  // definim sinonimele 
  const categoryMap = {
    "gt rank badges": ["badges", "gt rank badges"],
    "accesorii tech & gaming": ["accesorii tech & gaming", "tech & gaming", "accesorii"],
    "mystery box": ["mystery box", "mystery"],
    "avatars & frames": ["avatar", "avatars", "frames", "avatars & frames"],
    "merch gt": ["merch gt"],
    "vouchere": ["vouchere"],
    "experiențe": ["experiente", "experiențe"]
  };

 
  const norm = (t) => (t || "").toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  let result = [...allRewards];

  if (type === 'category') {
    const key = norm(value);
    const syns = categoryMap[key] || [key];
    result = allRewards.filter(it => {
      const cat = norm(it.category);
      return syns.some(s => cat.includes(norm(s)));
    });
  } else if (type === 'rank') {
    const wanted = toRankEnum(value);
    result = allRewards.filter(it => {
      const r = toRankEnum(it.rankEnum || it.rank || it.itemRank || it.requiredRank);
      return r === wanted;
    });
  } else if (type === 'type') {
    const t = norm(value);
    result = allRewards.filter(it => norm(it.type) === t);
  }

  filteredRewards = result;
  currentPage = 1;
  displayRewards(filteredRewards);


  document.getElementById('rewards-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


function renderHistoryRow(p) {
  const rid   = p.rewardId ?? p.id ?? "";
  const name  = p.name ?? "Produs";
  const qty   = p.quantity ?? 1;
  const price = Math.round(p.price ?? 0);
  const line  = Math.round(qty * price);

  const r = allRewards.find(x => String(x.id) === String(rid));
  const img = r?.image || "assets/images/poza.png";
  const cat = r?.category || (p.category || "");

  return `
    <div class="history-row">
      <img src="${img}" alt="${name}">
      <div>
        <div class="hr-name">${name}</div>
        <div class="hr-meta">${cat ? cat + " · " : ""}${qty} × ${price} AP</div>
      </div>
      <div class="hr-total">${line} AP</div>
    </div>
  `;
}

//fix pt avatar
const img = document.getElementById("user-avatar-img");
const DEFAULT_AVATAR = "assets/images/avatar.jpg";
const backendAvatar = "avatar.jpg"; 

// setează inițial
if (backendAvatar) {
  img.src = backendAvatar.startsWith("http") ? backendAvatar : "assets/images/" + backendAvatar;
} else {
  img.src = DEFAULT_AVATAR;
}


img.onerror = () => {
  if (img.src.includes(DEFAULT_AVATAR)) {
    console.warn("Fallback image also missing:", DEFAULT_AVATAR);
    return; // oprește loop-ul
  }
  img.src = DEFAULT_AVATAR;
};

const RewardRank = { SILVER: 'SILVER', GOLD: 'GOLD', DIAMOND: 'DIAMOND', LEGEND: 'LEGEND' };
const RankLevel  = { SILVER: 1, GOLD: 2, DIAMOND: 3, LEGEND: 4 };

function toRankEnum(v, fallback = 'SILVER') {
  if (!v) return fallback;
  const s = String(v).trim().toUpperCase();
  if (s === 'SILVER' || s === 'GOLD' || s === 'DIAMOND' || s === 'LEGEND') return s;
  // handle "Unranked"
  if (s === 'UNRANKED') return fallback;
  return fallback;
}


function rankLabel(enumVal) {
  const map = { SILVER: 'Silver', GOLD: 'Gold', DIAMOND: 'Diamond', LEGEND: 'Legend' };
  return map[enumVal] || 'Silver';
}

// Compare userRank vs itemRank using numeric levels
function isUnlocked(userRankEnum, itemRankEnum) {
  const u = RankLevel[toRankEnum(userRankEnum)] ?? 0;
  const r = RankLevel[toRankEnum(itemRankEnum)] ?? 1;
  return u >= r;
}

function getCurrentUserRankEnum() {
  return toRankEnum(rankInfo?.rank); 
}

function resetFilters() {
  filteredRewards = [...allRewards];
  currentPage = 1;
  displayRewards(filteredRewards);
  document.querySelectorAll('.filter-body input[type=checkbox]').forEach(cb => cb.checked = false);
}

function toTypeEnum(v) {
  if (!v) return null;
  const s = String(v).trim().toUpperCase();
  if (s === 'POPULAR') return 'POPULAR';
  if (s === 'RAR' || s === 'RARE') return 'RARE';
  if (s === 'LEGENDARY') return 'LEGENDARY';
  return null;
}

function typeLabel(enumVal) {
  return ({ POPULAR: 'Popular', RARE: 'Rar', LEGENDARY: 'Legendary' }[enumVal] || '');
}

function deriveTypeFallback(r) {
  // Legendary: prag simplu (≥ 1000 AP)
  // Rare: stoc foarte mic (1..3)
  // Popular: restul momentan - de luat din backend implementarea
  const price = Number(r.price || 0);
  const stock = Number(r.stockCount || 0);
  const inStock = r.inStock !== false;

  if (price >= 1000) return 'LEGENDARY';
  if (inStock && stock > 0 && stock <= 3) return 'RARE';
  return 'POPULAR';
}

document.querySelectorAll('.coming-soon').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault(); 
    alert('Funcționalitatea urmează a fi implementată!');
  });
});
