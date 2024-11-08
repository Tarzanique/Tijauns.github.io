// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.initializeCartUI();
        this.updateCartIcon();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('saxophoneCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('saxophoneCart', JSON.stringify(this.cart));
        this.updateCartIcon();
    }

    // Parse price string to number
    parsePriceToNumber(priceString) {
        // Remove currency symbol and any whitespace, then convert to float
        return parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
    }

    // Format number to price string
    formatPrice(number) {
        return `$${number.toFixed(2)}`;
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.cart.find(item => item.name === product.name);
        const price = this.parsePriceToNumber(product.price);
        
        if (isNaN(price)) {
            console.error(`Invalid price format for ${product.name}: ${product.price}`);
            this.showNotification(`Error: Invalid price format for ${product.name}`);
            return;
        }
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                name: product.name,
                price: this.formatPrice(price), // Store price in consistent format
                quantity: 1,
                image: product.image
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} added to cart!`);
    }

    // Remove item from cart
    removeItem(productName) {
        this.cart = this.cart.filter(item => item.name !== productName);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Update quantity of an item
    updateQuantity(productName, newQuantity) {
        const item = this.cart.find(item => item.name === productName);
        if (item) {
            item.quantity = parseInt(newQuantity);
            if (item.quantity <= 0) {
                this.removeItem(productName);
            }
        }
        this.saveCart();
        this.updateCartDisplay();
    }

    // Calculate total price
    calculateTotal() {
        return this.cart.reduce((total, item) => {
            const price = this.parsePriceToNumber(item.price);
            return total + (price * item.quantity);
        }, 0);
    }

    // Initialize cart UI elements
    initializeCartUI() {
        // Create cart icon if it doesn't exist
        if (!document.querySelector('.cart-icon')) {
            const cartIcon = document.createElement('div');
            cartIcon.className = 'cart-icon';
            cartIcon.innerHTML = `
                <span class="cart-count">0</span>
                <i class="fas fa-shopping-cart"></i>
            `;
            document.body.appendChild(cartIcon);

            // Create cart modal
            const cartModal = document.createElement('div');
            cartModal.className = 'cart-modal';
            cartModal.innerHTML = `
                <div class="cart-modal-content">
                    <span class="close-cart">&times;</span>
                    <h2>Your Cart</h2>
                    <div class="cart-items"></div>
                    <div class="cart-total">Total: $0.00</div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            `;
            document.body.appendChild(cartModal);

            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);

            // Add event listeners
            cartIcon.addEventListener('click', () => this.toggleCart());
            document.querySelector('.close-cart').addEventListener('click', () => this.toggleCart());
            document.querySelector('.checkout-btn').addEventListener('click', () => this.checkout());
        }
    }

    // Update cart icon count
    updateCartIcon() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Toggle cart modal
    toggleCart() {
        const cartModal = document.querySelector('.cart-modal');
        cartModal.classList.toggle('show');
        if (cartModal.classList.contains('show')) {
            this.updateCartDisplay();
        }
    }

    // Update cart display
    updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">Price: ${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="cart.updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="cart.removeItem('${item.name}')">×</button>
            </div>
        `).join('');

        cartTotal.textContent = `Total: ${this.formatPrice(this.calculateTotal())}`;
    }

    // Show notification
    showNotification(message) {
        const notification = document.querySelector('.notification');
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Checkout process
    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!');
            return;
        }
        
        // Here you would typically redirect to a checkout page
        alert('Proceeding to checkout...');
        window.location.href = 'invoice.html';
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Add click handlers to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src
            };
            cart.addItem(product);
        });
    });
});