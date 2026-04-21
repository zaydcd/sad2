// ===================== КАТАЛОГ САЖЕНЦЕВ С ФОТОГРАФИЯМИ JPG/JPEG =====================
const PRODUCTS = [
    { 
        id: "apple", name: "Яблоня 'Белый налив'", price: 890, type: "tree", fruitType: "apple", frost: "high",
        fruitIcon: "🍎", fruitDesc: "Плоды: сладкие, сочные, созревают в августе",
        description: "Дерево среднерослое, зимостойкое. Урожайность до 80 кг с дерева.",
        grow: "Солнечное место, суглинистая почва, полив 2-3 раза в месяц. Морозостойка до -35°C.",
        plantImage: "images/apple_tree.jpg",
        fruitImage: "images/apple_fruit.jpg"
    },
    { 
        id: "pear", name: "Груша 'Лада'", price: 990, type: "tree", fruitType: "pear", frost: "high",
        fruitIcon: "🍐", fruitDesc: "Плоды: сочные, маслянистые, сладкие, желтые",
        description: "Скороплодная, устойчива к парше. Дерево до 3 м, компактное.",
        grow: "Любит дренированную почву, защиту от ветра. Регулярный полив.",
        plantImage: "images/pear_tree.jpg",
        fruitImage: "images/pear_fruit.jpg"
    },
    { 
        id: "cherry", name: "Вишня 'Шоколадница'", price: 750, type: "tree", fruitType: "cherry", frost: "high",
        fruitIcon: "🍒", fruitDesc: "Ягоды: темно-бордовые, сладкие с кислинкой",
        description: "Самоплодная, урожайная. Куст до 2,5 м.",
        grow: "Светолюбива, не переносит застоя вод. Морозостойкая.",
        plantImage: "images/cherry_tree.jpg",
        fruitImage: "images/cherry_fruit.jpg"
    },
    { 
        id: "plum", name: "Слива 'Ренклод'", price: 820, type: "tree", fruitType: "plum", frost: "medium",
        fruitIcon: "🟣", fruitDesc: "Плоды: медовые, зеленовато-желтые, ароматные",
        description: "Высокоурожайный сорт, устойчив к болезням.",
        grow: "Требует плодородной почвы, умеренный полив. Любит солнце.",
        plantImage: "images/plum_tree.jpg",
        fruitImage: "images/plum_fruit.jpg"
    },
    { 
        id: "raspberry", name: "Малина 'Геракл'", price: 550, type: "shrub", fruitType: "berry", frost: "high",
        fruitIcon: "🍓", fruitDesc: "Ягоды: крупные, рубиновые, ремонтантная",
        description: "Куст мощный, до 1,8 м, плодоносит до заморозков.",
        grow: "Мульчирование, регулярный полив, полутень переносит.",
        plantImage: "images/raspberry_bush.jpg",
        fruitImage: "images/raspberry_fruit.jpg"
    },
    { 
        id: "currant", name: "Смородина черная 'Добрыня'", price: 480, type: "shrub", fruitType: "berry", frost: "high",
        fruitIcon: "🫐", fruitDesc: "Ягоды: крупные, сладкие, с блеском",
        description: "Куст среднерослый, устойчив к мучнистой росе.",
        grow: "Влажная почва, солнечное место, обрезка весной.",
        plantImage: "images/currant_bush.jpg",
        fruitImage: "images/currant_fruit.jpg"
    },
    { 
        id: "gooseberry", name: "Крыжовник 'Маяк'", price: 520, type: "shrub", fruitType: "berry", frost: "high",
        fruitIcon: "🟢", fruitDesc: "Ягоды: крупные, изумрудные, десертные",
        description: "Бесшипный сорт, урожайный, до 5 кг с куста.",
        grow: "Любит органику, полив в засуху, зимостоек.",
        plantImage: "images/gooseberry_bush.jpg",
        fruitImage: "images/gooseberry_fruit.jpg"
    }
];

let orderItems = [];
let nextRowId = 1;
let activeTooltip = null;
let maxTooltip = null;
let activeZoomModal = null; // для увеличенного изображения

// DOM элементы
const tbody = document.getElementById('orderRowsContainer');
const emptyMessageDiv = document.getElementById('emptyMessage');
const grandTotalSpan = document.getElementById('grandTotal');
const addBtn = document.getElementById('addRowBtn');
const copyBtn = document.getElementById('copyOrderBtn');
const emailBtn = document.getElementById('emailOrderBtn');
const messengerBtn = document.getElementById('messengerOrderBtn');
const maxBtn = document.getElementById('maxOrderBtn');
const emailModal = document.getElementById('emailModal');
const recipientEmail = document.getElementById('recipientEmail');
const cancelEmailBtn = document.getElementById('cancelEmailBtn');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const messengerModal = document.getElementById('messengerModal');
const whatsappChoiceBtn = document.getElementById('whatsappChoiceBtn');
const telegramChoiceBtn = document.getElementById('telegramChoiceBtn');
const cancelMessengerBtn = document.getElementById('cancelMessengerBtn');

// Элементы вкладок и подбора
const tabBtns = document.querySelectorAll('.tab-btn');
const catalogTab = document.getElementById('catalogTab');
const selectorTab = document.getElementById('selectorTab');
const selectorResults = document.getElementById('selectorResults');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// Фильтры
const typeFilters = document.querySelectorAll('input[value="tree"], input[value="shrub"]');
const fruitFilters = document.querySelectorAll('input[value="apple"], input[value="pear"], input[value="cherry"], input[value="plum"], input[value="berry"]');
const frostFilters = document.querySelectorAll('input[value="high"], input[value="medium"]');

// Функция для увеличения изображения (в 4 раза)
function showZoomModal(imageUrl, title) {
    // Удаляем предыдущее модальное окно, если есть
    if (activeZoomModal) {
        activeZoomModal.remove();
        activeZoomModal = null;
    }
    
    const modal = document.createElement('div');
    modal.className = 'zoom-modal';
    modal.innerHTML = `
        <div class="zoom-modal-content">
            <img src="${imageUrl}" alt="${title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23d4e0d0\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%235a7a6a\' font-size=\'14\'%3E🌳%3C/text%3E%3C/svg%3E'">
            <div class="zoom-modal-caption">${title}</div>
            <button class="zoom-modal-close">✕</button>
        </div>
    `;
    document.body.appendChild(modal);
    activeZoomModal = modal;
    
    // Закрытие по клику на фон или кнопку
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('zoom-modal-close')) {
            modal.remove();
            activeZoomModal = null;
        }
    });
    
    // Закрытие по Escape
    const escHandler = (e) => {
        if (e.key === 'Escape' && activeZoomModal) {
            activeZoomModal.remove();
            activeZoomModal = null;
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Переключение вкладок
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (tabId === 'catalog') {
            catalogTab.classList.add('active');
            selectorTab.classList.remove('active');
        } else {
            catalogTab.classList.remove('active');
            selectorTab.classList.add('active');
            renderSelectorResults();
        }
    });
});

// Функция фильтрации
function filterProducts() {
    const selectedTypes = Array.from(typeFilters).filter(cb => cb.checked).map(cb => cb.value);
    const selectedFruits = Array.from(fruitFilters).filter(cb => cb.checked).map(cb => cb.value);
    const selectedFrost = Array.from(frostFilters).filter(cb => cb.checked).map(cb => cb.value);
    
    return PRODUCTS.filter(product => {
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
        if (selectedFruits.length > 0 && !selectedFruits.includes(product.fruitType)) return false;
        if (selectedFrost.length > 0 && !selectedFrost.includes(product.frost)) return false;
        return true;
    });
}

// Отрисовка карточек подбора с фотографиями (с возможностью увеличения)
function renderSelectorResults() {
    const filtered = filterProducts();
    if (filtered.length === 0) {
        selectorResults.innerHTML = '<div class="empty-row-msg" style="grid-column:1/-1;">🌿 Саженцы не найдены. Измените параметры фильтра.</div>';
        return;
    }
    selectorResults.innerHTML = filtered.map(product => `
        <div class="plant-card" data-id="${product.id}">
            <div class="card-image" style="background-image: url('${product.plantImage}'); background-size: cover; background-position: center; cursor: pointer;" data-zoom-img="${product.plantImage}" data-zoom-title="${product.name}">
                <span style="background: rgba(0,0,0,0.5); border-radius: 20px; padding: 2px 8px; font-size: 0.7rem; color: white;">🔍 Увеличить</span>
            </div>
            <div class="card-content">
                <div class="card-title">${product.name}</div>
                <div class="card-price">${product.price.toLocaleString()} ₽</div>
                <div class="card-fruit" style="display: flex; align-items: center; gap: 8px; margin: 8px 0;">
                    <img src="${product.fruitImage}" alt="плоды" style="width: 40px; height: 40px; object-fit: cover; border-radius: 20px; cursor: pointer;" data-zoom-img="${product.fruitImage}" data-zoom-title="${product.name} — плоды" onerror="this.style.display='none'">
                    <span>${product.fruitIcon} ${product.fruitDesc}</span>
                </div>
                <div class="card-desc">📖 ${product.description.substring(0, 80)}...</div>
                <div class="card-grow">🌱 ${product.grow.substring(0, 70)}...</div>
                <button class="add-to-order-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">➕ Добавить в заказ</button>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики увеличения для всех изображений в карточках
    document.querySelectorAll('[data-zoom-img]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgUrl = elem.dataset.zoomImg;
            const title = elem.dataset.zoomTitle;
            if (imgUrl) showZoomModal(imgUrl, title);
        });
    });
    
    // Обработчики кнопок "Добавить в заказ"
    document.querySelectorAll('.add-to-order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.id;
            const product = PRODUCTS.find(p => p.id === productId);
            if (product) addToOrder(product);
        });
    });
}

// Добавление товара в заказ из подбора
function addToOrder(product) {
    const existingItem = orderItems.find(item => item.productId === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderItems.push({ id: nextRowId++, productId: product.id, quantity: 1 });
    }
    renderRows();
    showNotification(`✅ ${product.name} добавлен в заказ`);
}

// Обработчики фильтров
function attachFilterListeners() {
    const allCheckboxes = document.querySelectorAll('.filter-check input');
    allCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => renderSelectorResults());
    });
}

resetFiltersBtn.addEventListener('click', () => {
    document.querySelectorAll('.filter-check input').forEach(cb => cb.checked = false);
    renderSelectorResults();
});

// Вспомогательные функции
function getProductById(id) { return PRODUCTS.find(p => p.id === id) || PRODUCTS[0]; }
function computeTotal() { return orderItems.reduce((sum, item) => sum + getProductById(item.productId).price * (item.quantity || 0), 0); }
function updateTotal() { grandTotalSpan.innerText = computeTotal().toLocaleString('ru-RU') + ' ₽'; }

function getOrderText() {
    if (!orderItems.length) return "Заказ пуст";
    let text = "🌳 ЗАКАЗ САЖЕНЦЕВ\n" + new Date().toLocaleString() + "\n\n";
    orderItems.forEach((item, i) => {
        const p = getProductById(item.productId);
        text += `${i+1}. ${p.name}\n   ${p.price.toLocaleString()}₽ × ${item.quantity} = ${(p.price * item.quantity).toLocaleString()}₽\n   🍃 ${p.description.substring(0, 60)}...\n`;
    });
    text += `\n💰 ИТОГО: ${computeTotal().toLocaleString()} ₽`;
    return text;
}

function showNotification(msg, isErr = false) {
    const old = document.querySelector('.toast-notify');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-notify';
    toast.textContent = msg;
    if (isErr) toast.style.background = '#b34e3a';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Tooltip для товаров с фотографиями
function showTooltip(event, product) {
    if (activeTooltip) activeTooltip.remove();
    const tooltip = document.createElement('div');
    tooltip.className = 'product-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-img" style="background-image: url('${product.plantImage}'); background-size: cover; background-position: center; cursor: pointer;" data-zoom-img="${product.plantImage}" data-zoom-title="${product.name}">
            <span style="background: rgba(0,0,0,0.5); border-radius: 20px; padding: 2px 6px; font-size: 0.7rem;">🔍</span>
        </div>
        <div class="tooltip-title">${product.name}</div>
        <div class="tooltip-fruit" style="display: flex; align-items: center; gap: 8px;">
            <img src="${product.fruitImage}" style="width: 30px; height: 30px; object-fit: cover; border-radius: 15px; cursor: pointer;" data-zoom-img="${product.fruitImage}" data-zoom-title="${product.name} — плоды" onerror="this.style.display='none'">
            <span>${product.fruitIcon} ${product.fruitDesc}</span>
        </div>
        <div class="tooltip-desc">📖 ${product.description}</div>
        <div class="tooltip-grow">🌱 Условия: ${product.grow}</div>
    `;
    document.body.appendChild(tooltip);
    
    // Добавляем обработчики увеличения для изображений внутри тултипа
    tooltip.querySelectorAll('[data-zoom-img]').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgUrl = elem.dataset.zoomImg;
            const title = elem.dataset.zoomTitle;
            if (imgUrl) showZoomModal(imgUrl, title);
            hideTooltip(); // закрываем тултип при открытии увеличенного изображения
        });
    });
    
    const rect = event.target.getBoundingClientRect();
    let left = rect.right + 10;
    let top = rect.top + window.scrollY;
    if (left + 300 > window.innerWidth) left = rect.left - 310;
    if (left < 10) left = 10;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    activeTooltip = tooltip;
}

function hideTooltip() { if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; } }

// Подсказка MAX
function showMaxTooltip(event) {
    if (maxTooltip) maxTooltip.remove();
    const tooltip = document.createElement('div');
    tooltip.innerHTML = `<div style="margin-bottom:8px;">💡 Инструкция для MAX</div><div>📋 Скопируйте заказ → Откройте MAX → Вставьте текст</div>`;
    tooltip.style.cssText = 'position:absolute;background:#fff8e7;border:2px solid #f5a623;border-radius:16px;padding:12px;width:250px;z-index:1001';
    document.body.appendChild(tooltip);
    const rect = event.target.getBoundingClientRect();
    let left = rect.left - 10, top = rect.bottom + window.scrollY + 5;
    if (left + 250 > window.innerWidth) left = rect.right - 250;
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    maxTooltip = tooltip;
}
function hideMaxTooltip() { if (maxTooltip) { maxTooltip.remove(); maxTooltip = null; } }

// Отрисовка таблицы каталога
function renderRows() {
    tbody.innerHTML = '';
    if (orderItems.length === 0) {
        emptyMessageDiv.style.display = 'block';
        updateTotal();
        return;
    }
    emptyMessageDiv.style.display = 'none';
    orderItems.forEach(item => {
        const p = getProductById(item.productId);
        const rowTotal = p.price * item.quantity;
        const tr = document.createElement('tr');
        const tdProd = document.createElement('td');
        const sel = document.createElement('select');
        sel.className = 'product-select';
        PRODUCTS.forEach(prod => {
            const opt = document.createElement('option');
            opt.value = prod.id;
            opt.textContent = `${prod.name} — ${prod.price.toLocaleString()} ₽`;
            if (prod.id === item.productId) opt.selected = true;
            sel.appendChild(opt);
        });
        sel.addEventListener('mouseenter', (e) => showTooltip(e, getProductById(sel.value)));
        sel.addEventListener('mouseleave', hideTooltip);
        sel.addEventListener('change', (e) => {
            const target = orderItems.find(i => i.id === item.id);
            if (target) { target.productId = e.target.value; renderRows(); }
            hideTooltip();
        });
        tdProd.appendChild(sel);
        const tdPrice = document.createElement('td'); tdPrice.className = 'price-cell'; tdPrice.textContent = p.price.toLocaleString() + ' ₽';
        const tdQty = document.createElement('td');
        const qtyInp = document.createElement('input');
        qtyInp.type = 'number'; qtyInp.value = item.quantity; qtyInp.min = 1; qtyInp.className = 'quantity-input';
        qtyInp.onchange = (e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 1) val = 1;
            const target = orderItems.find(i => i.id === item.id);
            if (target) { target.quantity = val; renderRows(); }
        };
        tdQty.appendChild(qtyInp);
        const tdSum = document.createElement('td'); tdSum.className = 'row-total'; tdSum.textContent = rowTotal.toLocaleString() + ' ₽';
        const tdAct = document.createElement('td');
        const delBtn = document.createElement('button'); delBtn.innerHTML = '🗑️'; delBtn.className = 'delete-btn';
        delBtn.onclick = () => { orderItems = orderItems.filter(i => i.id !== item.id); renderRows(); };
        tdAct.appendChild(delBtn);
        tr.append(tdProd, tdPrice, tdQty, tdSum, tdAct);
        tbody.appendChild(tr);
    });
    updateTotal();
}

function addRow() {
    orderItems.push({ id: nextRowId++, productId: PRODUCTS[0].id, quantity: 1 });
    renderRows();
    setTimeout(() => tbody.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

function sendByEmail(email) {
    if (!orderItems.length) { showNotification("Заказ пуст!", true); return false; }
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Заказ саженцев")}&body=${encodeURIComponent(getOrderText())}`;
    return true;
}

function sendToMessenger(platform) {
    if (!orderItems.length) { showNotification("Заказ пуст!", true); return; }
    const text = encodeURIComponent(getOrderText());
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${text}`, '_blank');
    else window.open(`https://t.me/share/url?url=&text=${text}`, '_blank');
    messengerModal.style.display = 'none';
}

function sendToMax() {
    if (!orderItems.length) { showNotification("Заказ пуст! Добавьте саженцы.", true); return; }
    window.open("https://max.ru/u/f9LHodD0cOIVEoIHt7KRIa5iqyiEJLm9sSd74smnLvQI_nkFizEbwfD7tBk", '_blank');
    showNotification("💛 Открываем MAX. Вставьте скопированный заказ (Ctrl+V)");
}

// Обработчики событий
addBtn.onclick = addRow;
copyBtn.onclick = async () => {
    if (!orderItems.length) { showNotification("Заказ пуст!", true); return; }
    try { await navigator.clipboard.writeText(getOrderText()); showNotification("✅ Заказ скопирован в буфер"); } 
    catch { showNotification("Ошибка копирования", true); }
};
emailBtn.onclick = () => emailModal.style.display = 'flex';
cancelEmailBtn.onclick = () => emailModal.style.display = 'none';
sendEmailBtn.onclick = () => {
    let email = recipientEmail.value.trim();
    if (!email || !/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) { showNotification("Введите корректный email", true); return; }
    emailModal.style.display = 'none';
    sendByEmail(email);
    showNotification(`Открывается почтовый клиент`);
};
messengerBtn.onclick = () => messengerModal.style.display = 'flex';
whatsappChoiceBtn.onclick = () => sendToMessenger('whatsapp');
telegramChoiceBtn.onclick = () => sendToMessenger('telegram');
cancelMessengerBtn.onclick = () => messengerModal.style.display = 'none';
if (maxBtn) { maxBtn.addEventListener('mouseenter', showMaxTooltip); maxBtn.addEventListener('mouseleave', hideMaxTooltip); maxBtn.onclick = sendToMax; }
window.onclick = (e) => { if (e.target === emailModal) emailModal.style.display = 'none'; if (e.target === messengerModal) messengerModal.style.display = 'none'; };

// Кнопка сводки
if (!document.getElementById('summaryBtn')) {
    const sumBtn = document.createElement('button');
    sumBtn.textContent = '📋 Сводка заказа';
    sumBtn.className = 'summary-btn';
    sumBtn.onclick = () => { if (!orderItems.length) alert("Заказ пуст"); else alert(getOrderText()); };
    document.querySelector('.btn-group')?.appendChild(sumBtn);
}

// Инициализация
orderItems = [];
nextRowId = 1;
renderRows();
attachFilterListeners();
renderSelectorResults();