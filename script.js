"use strict";

const products = [
    {
        name: "Samsung A73",
        price: 3121000,
        company: "Samsung",
        getMonthly: 323000,
        PaymentMonthly: true,
        quantity: 40,
        image: "images/VtpK0dXnNcCSytk30aSvcx4Z2XwpPlc8i8DgI4aMNjrEBS6N6iTqjfV9VeeI.jpg",
        category: "Smartphones",
        description: "Premium performance with an amazing display and long-lasting battery life."
    },
    {
        name: "iPhone 16 Pro",
        price: 20000000,
        company: "Apple",
        getMonthly: 3000000,
        PaymentMonthly: false,
        image: "images/VtpK0dXnNcCSytk30aSvcx4Z2XwpPlc8i8DgI4aMNjrEBS6N6iTqjfV9VeeI.jpg",
        quantity: 10,
        category: "Smartphones",
        description: "The ultimate Apple experience with titanium body and pro-level cameras."
    },
    {
        name: "Redmi Note 11 Pro Max",
        price: 3321000,
        company: "Xiaomi",
        getMonthly: 420000,
        PaymentMonthly: false,
        image: "images/iOGaYFVVGomp5tfsIZcCWX3xyzksn7n4tMBwHOEPmAGyWBYn6a4UEM9YkK2w.jpg",
        quantity: 33,
        category: "Smartphones",
        description: "Incredible value with blazing fast charging and a stunning AMOLED screen."
    },
    {
        name: "Nokia 1202",
        price: 1200000,
        company: "Nokia",
        getMonthly: 100000,
        PaymentMonthly: true,
        image: "images/iOGaYFVVGomp5tfsIZcCWX3xyzksn7n4tMBwHOEPmAGyWBYn6a4UEM9YkK2w.jpg",
        quantity: 0,
        category: "Classic",
        description: "Indestructible classic design that lasts forever."
    },
    {
        name: "Vivo Y17s",
        price: 4120000,
        company: "Vivo",
        getMonthly: 602000,
        PaymentMonthly: true,
        image: "images/CMi9tIQzqhWOA8u4iBeEdfX1YZEeolImWrImp5fTISUfR8jPxZ0dfmRw8IPL.jpg",
        quantity: 90,
        category: "Smartphones",
        description: "Vibrant colors, stylish design, and a camera made for perfect portraits."
    },
    {
        name: "Tecno Spark 20",
        price: 3121000,
        company: "Tecno",
        getMonthly: 323000,
        PaymentMonthly: true,
        image: "images/CMi9tIQzqhWOA8u4iBeEdfX1YZEeolImWrImp5fTISUfR8jPxZ0dfmRw8IPL.jpg",
        quantity: 40,
        category: "Smartphones",
        description: "Affordable luxury with glowing textures and solid performance."
    }
];

// DOM Elements
const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortPrice");
const favBadge = document.getElementById("fav-badge");
const cartBadge = document.getElementById("cart-badge");

// State variables
let favCount = 0;
let cartCount = 0;

// Format Price Function
const formatPrice = (price) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
};

// Render Products
const renderProducts = (data) => {
    productGrid.innerHTML = "";

    data.forEach((product) => {
        // Skip out of stock items
        if (product.quantity === 0) return;

        const monthlyText = product.PaymentMonthly 
            ? `${formatPrice(product.getMonthly)} / month` 
            : "No Installments";

        const cardHTML = `
            <div class="product-card hidden-anim">
                <button class="fav-btn">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <div class="card-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="card-img">
                </div>
                <div class="card-body">
                    <span class="card-category">${product.category}</span>
                    <h3 class="card-title">${product.name}</h3>
                    <p class="card-desc">${product.description}</p>
                    
                    <div class="card-price-row">
                        <span class="price">${formatPrice(product.price)}</span>
                        <span class="monthly">${monthlyText}</span>
                    </div>

                    <button class="buy-btn">Add to Cart</button>
                </div>
            </div>
        `;
        
        productGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Re-attach event listeners after rendering
    attachCardEvents();
    // Re-trigger observer for new elements
    observeAnimations();
};

// Event Listeners for Cards
const attachCardEvents = () => {
    // Add to Cart Buttons
    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            cartCount++;
            cartBadge.textContent = cartCount;
            // Pop animation for button
            btn.style.transform = "scale(0.95)";
            setTimeout(() => btn.style.transform = "scale(1)", 150);
        });
    });

    // Favorite Buttons
    document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            if(btn.classList.contains("active")) {
                favCount++;
            } else {
                favCount--;
            }
            favBadge.textContent = favCount;
        });
    });
};

// Sorting Logic
sortSelect.addEventListener("change", (e) => {
    const sortedData = [...products];
    if (e.target.value === "increase") {
        sortedData.sort((a, b) => a.price - b.price);
    } else if (e.target.value === "decrease") {
        sortedData.sort((a, b) => b.price - a.price);
    }
    renderProducts(sortedData);
});

// Bombastic Scroll Animations via IntersectionObserver
const observeAnimations = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-pop');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-anim').forEach(el => {
        observer.observe(el);
    });
};

// Initialization
const init = () => {
    renderProducts(products);
    observeAnimations();
};

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);