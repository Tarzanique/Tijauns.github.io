
document.addEventListener('DOMContentLoaded', function() {
    // Generate random invoice number
    const invoiceNumber = 'INV-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    document.getElementById('invoice-number').textContent = invoiceNumber;

    // Set current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('current-date').textContent = currentDate;

    // Load cart items from localStorage
    const savedCart = localStorage.getItem('saxophoneCart');
    const cartItems = savedCart ? JSON.parse(savedCart) : [];

    // Populate items table
    const invoiceItemsContainer = document.getElementById('invoice-items');
    let subtotal = 0;

    cartItems.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}" class="item-image">
            </td>
            <td>
                <strong>${item.name}</strong>
            </td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        invoiceItemsContainer.appendChild(row);
    });

    // Calculate and display totals
    const tax = subtotal * 0.15; // 10% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
});
