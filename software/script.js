// Initialize variables to track the cart
let cart = [];

// Get references to DOM elements
const addProductButton = document.getElementById('add-product-btn');
const generateInvoiceButton = document.getElementById('generate-invoice-btn');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantityInput = document.getElementById('product-quantity');
const cartTableBody = document.querySelector('#cart tbody');
const totalPriceElement = document.getElementById('total-price');
const taxPriceElement = document.getElementById('tax-price');
const finalTotalElement = document.getElementById('final-total');

// Function to update the cart table
function updateCartTable() {
    cartTableBody.innerHTML = '';
    let total = 0;

    // Loop through the cart array and create rows for each item
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    // Update the total price, tax, and final total
    const tax = total * 0.05;
    const finalTotal = total + tax;

    totalPriceElement.textContent = total.toFixed(2);
    taxPriceElement.textContent = tax.toFixed(2);
    finalTotalElement.textContent = finalTotal.toFixed(2);
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCartTable();
}

// Event listener for the "Add to Cart" button
addProductButton.addEventListener('click', () => {
    const productName = productNameInput.value.trim();
    const productPrice = parseFloat(productPriceInput.value);
    const productQuantity = parseInt(productQuantityInput.value);

    if (!productName || isNaN(productPrice) || isNaN(productQuantity) || productQuantity <= 0) {
        alert('Please enter valid product details.');
        return;
    }

    // Add the product to the cart
    cart.push({ name: productName, price: productPrice, quantity: productQuantity });
    updateCartTable();

    // Clear the input fields
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';
});

// Event listener for the "Generate Invoice" button
generateInvoiceButton.addEventListener('click', () => {
    let invoice = 'Invoice:\n\n';
    cart.forEach(item => {
        invoice += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    const total = parseFloat(totalPriceElement.textContent);
    const tax = parseFloat(taxPriceElement.textContent);
    const finalTotal = parseFloat(finalTotalElement.textContent);

    invoice += `\nTotal: $${total.toFixed(2)}\nTax (5%): $${tax.toFixed(2)}\nFinal Total: $${finalTotal.toFixed(2)}`;

    alert(invoice); // For simplicity, just showing it in an alert box
});
