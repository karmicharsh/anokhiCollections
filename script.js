const products = [
    { id: 1, name: "Elegant Saree", price: 5999, image: "https://via.placeholder.com/250x250?text=Elegant+Saree" },
    { id: 2, name: "Designer Kurti", price: 2499, image: "https://via.placeholder.com/250x250?text=Designer+Kurti" },
    { id: 3, name: "Festive Lehenga", price: 8999, image: "https://via.placeholder.com/250x250?text=Festive+Lehenga" },
    { id: 4, name: "Silk Dupatta", price: 1299, image: "https://via.placeholder.com/250x250?text=Silk+Dupatta" },
    { id: 5, name: "Embroidered Blouse", price: 1999, image: "https://via.placeholder.com/250x250?text=Embroidered+Blouse" },
    { id: 6, name: "Palazzo Set", price: 3499, image: "https://via.placeholder.com/250x250?text=Palazzo+Set" },
];

const cart = [];

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartIcon();
    }
}

function updateCartIcon() {
    const cartIcon = document.getElementById("cart-icon");
    cartIcon.textContent = `Cart (${cart.length})`;
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <p>${item.name} - ${formatPrice(item.price)}</p>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = formatPrice(total);
}

function showLoading() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "<p>Loading products...</p>";
}

document.addEventListener("DOMContentLoaded", () => {
    showLoading();
    setTimeout(() => {
        displayProducts();
    }, 1000);

    const cartIcon = document.getElementById("cart-icon");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");

    cartIcon.addEventListener("click", () => {
        displayCart();
        cartModal.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message. We'll get back to you soon!");
        contactForm.reset();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

