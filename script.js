// Handles product card clicks, cart button UI feedback, and search.

// A. Product Card Redirection
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('click', function(event) {
        if (event.target.closest('.add-to-cart-btn')) {
            return; 
        }
        
        const productId = card.getAttribute('data-product-id');
        
        if (productId) {
            window.location.href = `product.html?id=${productId}`; 
        } else {
            window.location.href = 'product.html'; 
        }
    });
});


// B. Add to Cart Button UI Feedback (Demo)
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartIcon = document.querySelector('.cart-icon');
let cartCount = 0; 

function initializeCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (cartIcon) {
        cartIcon.textContent = `🛒 Cart (${cartCount})`;
    }
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        cartCount++;
        if (cartIcon) {
            cartIcon.textContent = `🛒 Cart (${cartCount})`;
        }
        
        const originalText = button.textContent;
        const originalColor = window.getComputedStyle(button).backgroundColor; 

        button.textContent = '✅ Added!';
        button.style.backgroundColor = '#388e3c'; 
        button.style.color = 'white';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalColor;
            button.style.color = ''; 
        }, 1500);

        console.log('Product added to cart (UI demo)!');
    });
});

document.addEventListener('DOMContentLoaded', initializeCartCount);


// C. Search Functionality
const searchButton = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', function(e) {
        e.preventDefault(); 
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            alert(`Searching for: "${searchTerm}".`);
            // window.location.href = 'search-results.html?query=' + encodeURIComponent(searchTerm);
        } else {
            alert('Please enter a search term.');
        }
    });
}