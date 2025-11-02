// This file: product.js

// === 🛒 Product Database ===
const productDatabase = {
    // Note: IDs are strings ('1', '2', etc.) for consistency.
    '1': {
        title: "Smartwatch Model X | Premium Ultra Series",
        price: 9999,
        priceDisplay: "₹ 9,999",
        oldPrice: "₹ 19,999",
        discount: "50% OFF",
        image: "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwf5666e88/images/Fastrack/Catalog/38148QM01_1.jpg?sw=360&sh=360",
        description: ["1.8 Inch HD Display", "IP68 Water Resistance", "Bluetooth Calling", "Battery Backup: 7 Days"]
    },
    '2': {
        title: "Man's T-shirt | Cotton Casual Tee",
        price: 399,
        priceDisplay: "₹ 399",
        oldPrice: "₹ 1,299",
        discount: "70% OFF",
        image: "https://img.freepik.com/premium-photo/black-plain-shortsleeve-cotton-t-shirt-template-isolated-white-background_41929-3076.jpg",
        description: ["100% Cotton Fabric", "Regular Fit", "Machine Wash", "Sizes: S, M, L, XL"]
    },
    '3': {
        title: "Premium Headphones | Noise Cancelling",
        price: 1499,
        priceDisplay: "₹ 1,499",
        oldPrice: "₹ 2,499",
        discount: "40% OFF",
        image: "https://www.leafstudios.in/cdn/shop/files/1_a43c5e0b-3a47-497d-acec-b4764259b10e_1024x1024.png?v=1750486829",
        description: ["40mm Dynamic Drivers", "30 Hours Playback Time", "Active Noise Cancellation"]
    },
    '4': {
        title: "PowerBank | 20000mAh Fast Charging",
        price: 1250,
        priceDisplay: "₹ 1,250",
        oldPrice: "₹ 1,800",
        discount: "30% OFF",
        image: "https://zebronics.com/cdn/shop/files/Zeb-MB10000S9-Pro-pic1.jpg?v=1755673820&width=800",
        description: ["20000mAh Capacity", "22.5W Fast Charging", "USB-C and USB-A Ports"]
    },
    '5': {
        title: "HP Victus Laptop | Gaming Laptop",
        price: 49999,
        priceDisplay: "₹ 49,999",
        oldPrice: "₹ 62,500",
        discount: "20% OFF",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Laptop/Images/309065_0_xb9gpu.png?tr=w-640",
        description: ["Core i5 12th Gen", "8GB RAM, 512GB SSD", "NVIDIA RTX 3050"]
    },
    '6': {
        title: "Math Books Set (5 Pcs)",
        price: 1100,
        priceDisplay: "₹ 1,100",
        oldPrice: "₹ 1,585",
        discount: "15% OFF",
        image: "https://bpbonline.com/cdn/shop/products/9789391392062.jpg?v=1755669998",
        description: ["Full Set of Math Textbooks", "For Class 11-12", "Latest Edition"]
    },
    '7': {
        title: "DSLR Camera | 24MP High Resolution",
        price: 34999,
        priceDisplay: "₹ 34,999",
        oldPrice: "₹ 41,175",
        discount: "15% OFF",
        image: "https://m.media-amazon.com/images/I/71iKNJ6rVIL._SX522_.jpg",
        description: ["24.2 MP APS-C Sensor", "4K Video Recording", "ISO 100-25600"]
    },
    '8': {
        title: "Portable Bluetooth Speaker | With Mic",
        price: 1799,
        priceDisplay: "₹ 1,799",
        oldPrice: "₹ 2,500",
        discount: "New",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Speakers%20and%20Media%20Players/Images/251614_0_ghxuff.png?tr=w-640",
        description: ["10W RMS Output", "3000mAh Battery", "Wireless Mic Included"]
    },
    '9': {
        title: "Wireless Earbuds | True Wireless Stereo",
        price: 2999,
        priceDisplay: "₹ 2,999",
        oldPrice: "₹ 3,999",
        discount: "25% OFF",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Wireless%20Earbuds/Images/272743_wpivml.png?tr=w-640",
        description: ["Active Noise Cancellation (ANC)", "24 Hours Battery Life", "Premium Sound Quality"]
    }
};


// === 🛠️ Helper Functions ===

/**
 * Parses a price string (e.g., "₹ 9,999") into an integer (9999).
 * @param {string} priceStr - The price string.
 * @returns {number} The price as an integer.
 */
function parsePrice(priceStr) {
    // Remove everything except digits
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
}

/**
 * Updates the total count of items in the header's cart icon.
 */
function updateHeaderCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Calculate total items quantity
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');

    // Update the cart icon text in the header
    if (cartIcon) {
        cartIcon.textContent = `🛒 Cart (${totalItems})`;
    }
}


// === 🛒 Core Cart Functions ===

/**
 * Buy Now: Clears cart, adds *only* this item, and redirects to Checkout.
 * @param {string|number} productId - Product ID
 */
function buyProduct(productId) {
    if (!productDatabase[productId]) {
        alert("Sorry, this product is unavailable.");
        return;
    }
    
    // 1. Clear cart and add only the current item with quantity 1
    const newCart = [{ id: productId, quantity: 1 }];

    // 2. Save the updated cart (using 'cart' key)
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    // 3. Update UI
    updateHeaderCartCount();
    
    // 4. Redirect immediately to Checkout
    window.location.href = 'checkout.html';
}

/**
 * Add to Cart: Adds item (or increments quantity) and stays on the current page.
 * @param {string|number} productId - Product ID
 */
function addToCart(productId) {
    // 1. Get cart and check for existing item (using 'cart' key)
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id == productId); 

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    // 2. Save the updated cart (using 'cart' key)
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 3. Update UI
    updateHeaderCartCount();
    
    // 4. Show success toast/alert
    const productTitle = productDatabase[productId] ? productDatabase[productId].title : 'Item';
    
    // Note: Assuming showToast function is available from interactivity.js
    if (typeof showToast === 'function') {
        showToast(`✅ **${productTitle}** added to cart!`);
    } else {
        alert(`✅ ${productTitle} added to cart!`);
    }
}

// === 🚀 Initial Load ===

document.addEventListener('DOMContentLoaded', function() {
    // Initial cart count update when any page loads
    updateHeaderCartCount();
});