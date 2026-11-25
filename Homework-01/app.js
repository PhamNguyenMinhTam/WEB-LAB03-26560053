const products = [
    { id: 1, name: 'Wireless Headphones', price: 1290000, category: 'Electronics', image: 'images/headphones.svg' },
    { id: 2, name: 'Smart Watch', price: 2490000, category: 'Electronics', image: 'images/watch.svg' },
    { id: 3, name: 'Bluetooth Speaker', price: 890000, category: 'Electronics', image: 'images/speaker.svg' },
    { id: 4, name: 'Denim Jacket', price: 750000, category: 'Fashion', image: 'images/jacket.svg' },
    { id: 5, name: 'Running Shoes', price: 1150000, category: 'Fashion', image: 'images/shoes.svg' },
    { id: 6, name: 'Baseball Cap', price: 190000, category: 'Fashion', image: 'images/cap.svg' },
    { id: 7, name: 'JavaScript Handbook', price: 320000, category: 'Books', image: 'images/handbook.svg' },
    { id: 8, name: 'Web Design Sketchbook', price: 150000, category: 'Books', image: 'images/sketchbook.svg' }
];

const productGrid = document.querySelector('#product-grid');
const search = document.querySelector('#search');
const filters = document.querySelectorAll('.filters button');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const emptyState = document.querySelector('#empty-state');

let activeCategory = 'All';
let cart = loadCart();

function formatPrice(price) {
    return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
}

function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem('lab03-cart'));
        if (!Array.isArray(savedCart)) return [];

        const ids = new Set();
        for (const item of savedCart) {
            if (!item || !Number.isSafeInteger(item.quantity) || item.quantity < 1 ||
                !products.some(product => product.id === item.id) || ids.has(item.id)) {
                return [];
            }
            ids.add(item.id);
        }
        return savedCart;
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem('lab03-cart', JSON.stringify(cart));
}

function buttonLabel(id) {
    const item = cart.find(item => item.id === id);
    return item ? `Add to cart (${item.quantity} in cart)` : 'Add to cart';
}

function renderProducts() {
    const query = search.value.trim().toLowerCase();
    const visibleProducts = products.filter(product =>
        (activeCategory === 'All' || product.category === activeCategory) &&
        product.name.toLowerCase().includes(query)
    );

    productGrid.innerHTML = visibleProducts.map(product => `
        <article class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" width="320" height="208">
            <div class="product-details">
                <span class="category ${product.category.toLowerCase()}">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button type="button" class="add-to-cart">
                    <span aria-hidden="true">+</span> <span class="button-label">${buttonLabel(product.id)}</span>
                </button>
            </div>
        </article>
    `).join('');
    emptyState.hidden = visibleProducts.length > 0;
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => {
        const product = products.find(product => product.id === item.id);
        return sum + product.price * item.quantity;
    }, 0);

    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
    productGrid.querySelectorAll('.product-card').forEach(card => {
        card.querySelector('.button-label').textContent = buttonLabel(Number(card.dataset.id));
    });
}

function addToCart(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
}

function clearCart() {
    cart = [];
    localStorage.removeItem('lab03-cart');
    updateCartUI();
}

productGrid.addEventListener('click', e => {
    if (!e.target.closest('.add-to-cart')) return;
    const card = e.target.closest('.product-card');
    if (!card) return;

    const id = Number(card.dataset.id);
    addToCart(id);
});

filters.forEach(button => {
    button.addEventListener('click', () => {
        activeCategory = button.dataset.category;
        filters.forEach(filter => {
            const isActive = filter === button;
            filter.classList.toggle('active', isActive);
            filter.setAttribute('aria-pressed', isActive);
        });
        renderProducts();
    });
});

search.addEventListener('input', renderProducts);
document.querySelector('#clear-cart').addEventListener('click', clearCart);

renderProducts();
updateCartUI();
