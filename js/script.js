/* ================= DATA ================= */
const WHATSAPP_NUMBER = "91 81568 46372"; // TODO: replace with the real WhatsApp business number, digits only, country code first

/* ================= STATE ================= */
let cart = [];
let activeCat = "all";
let currentModalProduct = null;
let currentModalSize = "M";

/* ================= HELPERS ================= */
const fmt = n => "₹" + n.toLocaleString("en-IN");

function garmentSVG(pattern, opts = {}) {
  const id = "p" + Math.random().toString(36).slice(2, 8);
  const colors = {
    stripe: ["#e5468f", "#f2874a"],
    grid: ["#f2874a", "#f5c15c"],
    diagonal: ["#e5468f", "#f5c15c"],
    dot: ["#f5c15c", "#e5468f"]
  }[pattern] || ["#caa568", "#caa568"];
  return `
  <svg viewBox="0 0 200 240" width="100%" height="100%">
    <defs>
      <linearGradient id="g${id}" x1="0" y1="0" x2="200" y2="240">
        <stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="${colors[1]}" stop-opacity="0.10"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="200" height="240" fill="url(#g${id})"/>
    <path d="M75 20 L70 45 L55 60 L60 220 L140 220 L145 60 L130 45 L125 20 Q100 32 75 20 Z"
      fill="none" stroke="#e6cd97" stroke-width="1.3" opacity="0.85"/>
    <path d="M75 20 Q100 10 125 20" fill="none" stroke="#e6cd97" stroke-width="1.3" opacity="0.85"/>
  </svg>`;
}

function productVisual(p) {
  if (p.img && p.img.trim() !== "") {
    return `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  return garmentSVG(p.pattern);
}

function renderTicker() {
  const items = ["Premium Thailand Imported", "Handpicked Pieces", "Small Batch Only", "Quality That Speaks For Itself", "Chic & Aesthetic"];
  const track = document.getElementById("tickerTrack");
  const html = items.map(t => `<span>${t}</span>`).join("");
  track.innerHTML = html + html;
}

function renderGrid() {
  const grid = document.getElementById("productGrid");
  const list = activeCat === "all" ? products : products.filter(p => p.cat === activeCat);
  grid.innerHTML = list.map(p => `
    <div class="card" data-id="${p.id}">
      <div class="swatch">
        ${productVisual(p)}
        <span class="badge">${p.stock}</span>
        <div class="ring-dot"><span></span></div>
        <button class="quick-add" data-quickadd="${p.id}">+ Quick Add</button>
      </div>
      <div class="card-info">
        <span class="cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
          <span class="view-link">View →</span>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-quickadd]")) return;
      openModal(Number(card.dataset.id));
    });
  });
  grid.querySelectorAll("[data-quickadd]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.quickadd), "M", 1);
      showToast("Added to bag");
    });
  });
}

function openModal(id) {
  const p = products.find(x => x.id === id);
  currentModalProduct = p;
  currentModalSize = "M";
  document.getElementById("modalImg").innerHTML =
    `<button class="modal-close" id="modalClose" aria-label="Close"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg></button>` + productVisual(p);
  document.getElementById("modalImg").querySelector("#modalClose").addEventListener("click", closeModal);
  document.getElementById("modalInfo").innerHTML = `
    <span class="cat">${p.cat}</span>
    <h3>${p.name}</h3>
    <span class="price">${fmt(p.price)}</span>
    <p class="desc">${p.desc}</p>
    <span class="field-label">Size</span>
    <div class="size-row" id="sizeRow">
      ${["S", "M", "L", "XL"].map(s => `<button class="size-opt ${s === 'M' ? 'active' : ''}" data-size="${s}">${s}</button>`).join("")}
    </div>
    <button class="btn modal-add" id="modalAddBtn">Add to Bag</button>
    <p class="stock-note">${p.stock}</p>
  `;
  document.querySelectorAll("#sizeRow .size-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sizeRow .size-opt").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentModalSize = btn.dataset.size;
    });
  });
  document.getElementById("modalAddBtn").addEventListener("click", () => {
    addToCart(p.id, currentModalSize, 1);
    showToast("Added to bag");
    closeModal();
  });
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() { document.getElementById("modalOverlay").classList.remove("open"); }

function addToCart(id, size, qty) {
  const existing = cart.find(i => i.id === id && i.size === size);
  if (existing) { existing.qty += qty; }
  else {
    const p = products.find(x => x.id === id);
    cart.push({ id, size, qty, name: p.name, price: p.price, cat: p.cat, pattern: p.pattern, img: p.img });
  }
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;
  const body = document.getElementById("cartBody");
  if (cart.length === 0) {
    body.innerHTML = `<div class="empty-cart">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>
      <p>Your bag is empty.</p>
    </div>`;
  } else {
    body.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-thumb">${productVisual(item)}</div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="meta">Size ${item.size} · ${fmt(item.price)}</div>
          <div class="qty-row">
            <button class="qty-btn" data-dec="${idx}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-inc="${idx}">+</button>
            <button class="remove-btn" data-remove="${idx}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");
    body.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => { cart[b.dataset.inc].qty++; renderCart(); }));
    body.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => {
      const i = b.dataset.dec; cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); renderCart();
    }));
    body.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => { cart.splice(b.dataset.remove, 1); renderCart(); }));
  }
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("subtotalAmt").textContent = fmt(subtotal);
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function buildWhatsAppLink() {
  if (cart.length === 0) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Western Era! I'd love to know more about your pieces.")}`;
  }
  let msg = "Hi Western Era! I'd like to order:\n\n";
  cart.forEach(i => { msg += `• ${i.name} (Size ${i.size}) x${i.qty} — ${fmt(i.price * i.qty)}\n`; });
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  msg += `\nSubtotal: ${fmt(subtotal)}\n\nPlease confirm availability. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* ================= EVENTS ================= */
document.getElementById("cartBtn").addEventListener("click", () => {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("open");
});
function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
}
document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
document.getElementById("overlay").addEventListener("click", () => { closeDrawer(); closeModal(); });
document.getElementById("modalOverlay").addEventListener("click", (e) => { if (e.target.id === "modalOverlay") closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDrawer(); closeModal(); } });

document.getElementById("whatsappCheckout").addEventListener("click", () => { window.open(buildWhatsAppLink(), "_blank"); });
document.getElementById("footWhatsapp").addEventListener("click", (e) => { e.preventDefault(); window.open(buildWhatsAppLink(), "_blank"); });

document.getElementById("pills").addEventListener("click", (e) => {
  const btn = e.target.closest(".pill");
  if (!btn) return;
  document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  activeCat = btn.dataset.cat;
  renderGrid();
});

/* ================= INIT ================= */
renderTicker();
renderGrid();
renderCart();
