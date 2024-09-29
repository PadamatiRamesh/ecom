// Fetch products from the API
async function fetchProducts(category = '') {
    try {
        const response = await fetch(`https://fakestoreapi.com/products${category ? `/category/${category}` : ''}`);
        const products = await response.json();
        console.log(products); // Debugging: log the fetched products
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch categories from the API
async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    const categoryList = document.getElementById('category-list');
    categoryList.classList.add('hidden');
    productList.innerHTML = products.map(product => `
        <div class="product" onclick="openModal(${product.id})">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button>Add to Cart</button>
        </div>
    `).join('');
}

// Display categories
function displayCategories(categories) {
    const categoryList = document.getElementById('category-list');
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    categoryList.innerHTML = categories.map(category => `
        <div class="category" onclick="fetchProducts('${encodeURIComponent(category)}')">
            <h4>${category}</h4>
        </div>
    `).join('');
    categoryList.classList.remove('hidden');
}

// Show Home
function showHome() {
    const productList = document.getElementById('product-list');
    const categoryList = document.getElementById('category-list');
    productList.innerHTML = '<h2>Welcome to My E-Commerce!</h2>';
    categoryList.classList.add('hidden');
}

// Show Products
function showProducts() {
    fetchProducts();
}

// Show Categories
function showCategories() {
    fetchCategories();
}

// Open modal with product details
function openModal(productId) {
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            modalImage.src = product.image;
            modalTitle.textContent = product.title;
            modalDescription.textContent = product.description;
            modalPrice.textContent = `$${product.price}`;
            modal.style.display = "block";
        })
        .catch(error => console.error('Error fetching product details:', error));
}

// Close modal
document.getElementById('close-modal').onclick = function() {
    document.getElementById('product-modal').style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Initialize the app
showHome(); // Show home on load
