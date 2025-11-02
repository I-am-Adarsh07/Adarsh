// =============================================
// A. Utility Functions (Toast & Cart Count)
// =============================================

/** Shows a temporary notification toast. */
function showToast(message) {
    const toast = document.getElementById("customToast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}

/** Updates the cart count in the header navigation. */
window.updateHeaderCartCount = function() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.header-nav .cart-icon');
    if (cartIcon) {
        cartIcon.textContent = `🛒 Cart (${count})`;
    }
};

/** Retrieves product data using the global productDatabase object. */
function getProductDataForAction(productId) {
    // Rely on the global productDatabase object loaded by product.js
    const product = window.productDatabase ? window.productDatabase[productId] : null;

    if (!product) {
        console.error(`Product data not found in productDatabase for ID: ${productId}. Cannot proceed.`);
        showToast("Error: Product data missing.");
        return null;
    }

    // This ensures product data is consistently pulled from the database
    return {
        id: productId,
        name: product.title,
        // Ensure price is parsed correctly from the database string
        price: parseFloat(product.priceDisplay.replace(/[^\d.]/g, '')), 
        image: product.image,
        quantity: 1 
    };
}


// =============================================
// B. Main Action Functions (Called from PDP)
// =============================================

/** 1. ADD TO CART Function (Adds item and redirects to cart.html) */
window.addToCart = function(productId, quantity = 1) {
    // Clear any temporary 'buyNowItem' entry when using the main cart
    localStorage.removeItem('buyNowItem');
    
    const itemToAdd = getProductDataForAction(productId);
    if (!itemToAdd) return;
    
    // Use the correct synchronized key: 'cartItems'
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
        showToast("Quantity updated in cart! 🛒");
    } else {
        cart.push(itemToAdd);
        showToast("Item successfully added to cart! 🎉");
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateHeaderCartCount(); 
    
    // REDIRECT to Cart Page
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 1000); // 1 second delay for toast visibility
};


/** 2. BUY NOW Function (Prepares temporary cart and redirects to checkout.html) */
window.buyProduct = function(productId, quantity = 1) {
    const itemToBuy = getProductDataForAction(productId);
    if (!itemToBuy) return;
    
    // Create a temporary cart containing ONLY the Buy Now item
    const tempBuyNowCart = [{
        ...itemToBuy, 
        quantity: quantity 
    }];
    
    // Save to the special key 'buyNowItem'
    localStorage.setItem('buyNowItem', JSON.stringify(tempBuyNowCart));
    
    // Crucially, clear the regular cart key to prevent conflicts on the checkout page
    localStorage.removeItem('cartItems'); 

    showToast("Proceeding to Checkout...");
    
    // REDIRECT to Checkout Page
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 1000); // 1 second delay for toast visibility
};

// =============================================
// C. DOMContentLoaded Listener 
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the header count on every page load
    updateHeaderCartCount();

    // --- Image Gallery Functionality (Assuming this script is run on product.html) ---
    const mainImage = document.getElementById('main-product-img');
    const thumbnails = document.querySelectorAll('.product-thumbnail-img');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.src; 
                thumbnails.forEach(t => t.classList.remove('active-thumb'));
                this.classList.add('active-thumb');
            });
        });
    }
});