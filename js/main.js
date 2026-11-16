const products = [
  { id: 0, brand: 'adidas Originals', name: 'Samba OG', kind: 'городские', category: 'Городская классика', price: 12990, color: 'Core Black / Wonder White', material: 'Кожа и текстиль', weight: 'Классический низкий силуэт', fit: 'Стандартная', sizes: [38, 39, 40, 41, 42, 43], image: 'images/real/adidas-samba-og.jpg', description: 'Легендарная низкопрофильная модель adidas с кожаным верхом, усиленным носком и резиновой подошвой. Подойдёт для повседневных городских образов.' },
  { id: 1, brand: 'adidas Originals', name: 'Handball Spezial', kind: 'городские', category: 'Ретро', price: 13990, color: 'Craft Ochre / Cream White / Dusky Bronze', material: 'Замша и текстиль', weight: 'Низкий профиль', fit: 'Стандартная', sizes: [38, 39, 40, 41, 42], image: 'images/real/adidas-handball-spezial.jpg', description: 'Модель Spezial появилась как обувь для гандбола и стала повседневной классикой. В этом макете показана коричневая расцветка Craft Ochre / Cream White / Dusky Bronze.' },
  { id: 2, brand: 'adidas Originals', name: 'Superstar II', kind: 'классика', category: 'Классика', price: 13990, color: 'Utility Black / Core Black / Off White', material: 'Кожа и текстиль', weight: 'Низкий профиль', fit: 'Стандартная', sizes: [38, 39, 40, 41, 42, 43], image: 'images/real/adidas-superstar-ii.jpg', description: 'Узнаваемая модель Superstar II с формованным резиновым носком-ракушкой и фирменными тремя полосками.' },
  { id: 3, brand: 'HOKA', name: 'Clifton 10', kind: 'беговые', category: 'Шоссе и город', price: 19990, color: 'White / Black', material: 'Дышащая жаккардовая сетка', weight: 'Лёгкая амортизация', fit: 'Стандартная', sizes: [39, 40, 41, 42, 43, 44], image: 'images/real/hoka-clifton-10.jpg', description: 'Лёгкая ежедневная беговая модель HOKA с дышащим жаккардовым верхом и мягкой амортизацией. Подходит также для длительных прогулок.' },
  { id: 4, brand: 'HOKA', name: 'Bondi 9', kind: 'беговые', category: 'Максимальная амортизация', price: 21990, color: 'White / Black', material: 'Инженерная сетка', weight: 'Объёмная амортизирующая подошва', fit: 'Стандартная', sizes: [39, 40, 41, 42, 43, 44], image: 'images/real/hoka-bondi-9.jpg', description: 'Самая мягкая дорожная модель в линейке Bondi: высокая подошва, формованный задник и сетчатый верх для ежедневных пробежек и ходьбы.' },
  { id: 5, brand: 'HOKA', name: 'Speedgoat 6', kind: 'беговые', category: 'Трейл', price: 21990, color: 'Droplet / Nautical Dusk', material: 'Текстиль с защитными накладками', weight: 'Цепкая подошва для троп', fit: 'Фиксирующая', sizes: [39, 40, 41, 42, 43, 44], image: 'images/real/hoka-speedgoat-6.jpg', description: 'Трейловая модель для рельефных маршрутов: цепкая подошва с выраженными грунтозацепами, защитный носок и фиксирующая посадка.' }
];

const formatPrice = value => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
const productCard = product => `<article class="product-card"><a class="product-image" href="product.html?id=${product.id}" aria-label="Подробнее о модели ${product.name}"><picture><source media="(min-width: 1200px)" srcset="${product.image}"><img src="${product.image}" alt="Кроссовки ${product.name}, вид сбоку" width="800" height="650" loading="lazy"></picture><span class="product-category">${product.brand} · ${product.category}</span></a><div class="product-card-info"><div><span class="product-code">PACE / ${String(product.id + 1).padStart(2, '0')}</span><h2><a href="product.html?id=${product.id}">${product.name}</a></h2><p>${product.color}</p></div><div class="product-card-bottom"><strong>${formatPrice(product.price)}</strong><a href="order.html?product=${product.id}" class="round-link" aria-label="Заказать ${product.name}">↗</a></div></div></article>`;

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});

const featured = document.querySelector('[data-featured]');
if (featured) featured.innerHTML = products.slice(0, 3).map(productCard).join('');

const catalog = document.querySelector('[data-catalog]');
if (catalog) {
  const search = document.querySelector('#productSearch');
  const sort = document.querySelector('#sortBy');
  const count = document.querySelector('#resultsCount');
  const kindChecks = [...document.querySelectorAll('input[name="kind"]')];
  let selectedSize = '';
  const query = new URLSearchParams(location.search);
  if (query.has('type')) {
    const checkbox = kindChecks.find(input => input.value === query.get('type'));
    if (checkbox) checkbox.checked = true;
  }
  const renderCatalog = () => {
    const text = search.value.trim().toLocaleLowerCase('ru');
    const kinds = kindChecks.filter(input => input.checked).map(input => input.value);
    let visible = products.filter(product => {
      const matchesText = !text || `${product.brand} ${product.name} ${product.category} ${product.color}`.toLocaleLowerCase('ru').includes(text);
      return matchesText && (!kinds.length || kinds.includes(product.kind)) && (!selectedSize || product.sizes.includes(Number(selectedSize)));
    });
    if (sort.value === 'price-up') visible.sort((a, b) => a.price - b.price);
    if (sort.value === 'price-down') visible.sort((a, b) => b.price - a.price);
    if (sort.value === 'name') visible.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    catalog.innerHTML = visible.length ? visible.map(productCard).join('') : '<p class="empty-state">По этим параметрам кроссовки не найдены. Измени фильтры и попробуй ещё раз.</p>';
    count.textContent = `Найдено моделей: ${visible.length}`;
  };
  [search, sort, ...kindChecks].forEach(control => control.addEventListener(control === search ? 'input' : 'change', renderCatalog));
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => {
    selectedSize = selectedSize === button.dataset.size ? '' : button.dataset.size;
    document.querySelectorAll('[data-size]').forEach(item => item.classList.toggle('is-selected', item.dataset.size === selectedSize));
    renderCatalog();
  }));
  document.querySelector('#resetFilters').addEventListener('click', () => {
    search.value = '';
    sort.value = 'popular';
    selectedSize = '';
    kindChecks.forEach(input => { input.checked = false; });
    document.querySelectorAll('[data-size]').forEach(item => item.classList.remove('is-selected'));
    history.replaceState({}, '', location.pathname);
    renderCatalog();
  });
  renderCatalog();
}

const productRoot = document.querySelector('[data-product]');
if (productRoot) {
  const id = Number(new URLSearchParams(location.search).get('id'));
  const product = products.find(item => item.id === id) || products[0];
  const rows = [
    ['Назначение', product.category], ['Цвет', product.color], ['Материал верха', product.material],
    ['Особенности конструкции', product.weight], ['Посадка', product.fit], ['Размеры в наличии', product.sizes.join(', ')]
  ];
  productRoot.innerHTML = `<div class="product-detail-image"><picture><source media="(min-width: 768px)" srcset="${product.image}"><img src="${product.image}" alt="Кроссовки ${product.name}, вид сбоку" width="800" height="650"></picture></div><div class="product-detail-copy"><span class="eyebrow">PACE / ${String(product.id + 1).padStart(2, '0')} · ${product.brand} · ${product.category.toUpperCase()}</span><h1>${product.name}</h1><p class="product-detail-color">${product.color}</p><p class="product-description">${product.description}</p><strong class="detail-price">${formatPrice(product.price)}</strong><div class="detail-sizes"><span>Размеры:</span> ${product.sizes.join(' · ')}</div><a class="button button-dark" href="order.html?product=${product.id}">Оставить заявку →</a><p class="product-note">Наличие и подходящий размер уточним по телефону.</p></div><section class="specs-section"><span class="eyebrow">ХАРАКТЕРИСТИКИ</span><h2>Подробности модели</h2><div class="table-wrapper" tabindex="0" aria-label="Таблица характеристик модели"><table class="product-table"><tbody>${rows.map(([key, value]) => `<tr><th scope="row">${key}</th><td>${value}</td></tr>`).join('')}</tbody></table></div></section>`;
}

const orderForm = document.querySelector('#orderForm');
if (orderForm) {
  const shoeSelect = document.querySelector('#shoeChoice');
  const sizeSelect = document.querySelector('#shoeSize');
  const summary = document.querySelector('#orderSummary strong');
  const chosenId = new URLSearchParams(location.search).get('product');
  shoeSelect.insertAdjacentHTML('beforeend', products.map(product => `<option value="${product.id}">${product.name} — ${formatPrice(product.price)}</option>`).join(''));
  const updateSizes = () => {
    const product = products.find(item => item.id === Number(shoeSelect.value));
    sizeSelect.innerHTML = '<option value="">Выберите размер</option>' + (product ? product.sizes.map(size => `<option value="${size}">${size}</option>`).join('') : '');
    summary.textContent = product ? `${product.name} · ${formatPrice(product.price)}` : 'Пока не выбрана модель';
  };
  shoeSelect.addEventListener('change', updateSizes);
  if (chosenId !== null && products.some(product => product.id === Number(chosenId))) {
    shoeSelect.value = chosenId;
    updateSizes();
  }
  orderForm.addEventListener('submit', event => {
    event.preventDefault();
    orderForm.classList.add('was-validated');
    if (!orderForm.checkValidity()) return;
    document.querySelector('#formSuccess').hidden = false;
    document.querySelector('#formSuccess').textContent = `Спасибо, ${orderForm.elements.name.value}! Заявка на ${shoeSelect.selectedOptions[0].text.split(' — ')[0]}, размер ${sizeSelect.value}, подготовлена. Это демонстрационная форма.`;
    orderForm.reset();
    orderForm.classList.remove('was-validated');
    updateSizes();
  });
}
