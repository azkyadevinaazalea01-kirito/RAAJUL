// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'AQUA', price: 20000, img: 'img/aqua.jpeg' },
    { id: 2, name: 'ICEE', price: 10000, img: 'img/icee.jpeg' },
    { id: 3, name: 'NUTRI BOOST', price: 11000, img: 'img/nutri_boost.jpeg' },
    { id: 4, name: 'ROTI', price: 10000, img: 'img/roti.jpeg' },
];

let cart = [];

function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke keranjang</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`Total belanja Anda Rp ${total}. Masukan jumlah bayaran:`);

    const paymentAmount = parseInt(payment);
    if (paymentAmount >= total) {
        alert(`Pembayaran berhasil! Kembalian Anda: Rp ${paymentAmount - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

document.getElementById('checkout-btn').addEventListener('click', checkout);
displayProducts();