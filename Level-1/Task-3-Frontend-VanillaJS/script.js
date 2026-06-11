/**
 * Products Dashboard - Frontend Script
 * 
 * Handles all frontend logic for the Products Dashboard including:
 * - Fetching products from API
 * - Adding new products
 * - Deleting products
 * - Loading states and error handling
 */

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api/products';

// DOM Elements
const elements = {
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    errorMessage: document.getElementById('errorMessage'),
    mainContent: document.getElementById('mainContent'),
    productForm: document.getElementById('productForm'),
    productsList: document.getElementById('productsList'),
    emptyState: document.getElementById('emptyState'),
    productCount: document.getElementById('productCount'),
    refreshBtn: document.getElementById('refreshBtn'),
    retryBtn: document.getElementById('retryBtn'),
    toast: document.getElementById('toast'),
    toastIcon: document.getElementById('toastIcon'),
    toastMessage: document.getElementById('toastMessage'),
    apiUrl: document.getElementById('apiUrl')
};

// Update API URL display
elements.apiUrl.textContent = API_BASE_URL;

/**
 * Show loading state
 */
function showLoading() {
    elements.loadingState.classList.remove('hidden');
    elements.errorState.classList.add('hidden');
    elements.mainContent.classList.add('hidden');
}

/**
 * Hide loading state
 */
function hideLoading() {
    elements.loadingState.classList.add('hidden');
}

/**
 * Show error state
 */
function showError(message) {
    hideLoading();
    elements.errorState.classList.remove('hidden');
    elements.mainContent.classList.add('hidden');
    elements.errorMessage.textContent = message;
}

/**
 * Show main content
 */
function showMainContent() {
    hideLoading();
    elements.errorState.classList.add('hidden');
    elements.mainContent.classList.remove('hidden');
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    elements.toast.classList.remove('hidden', 'success', 'error');
    elements.toast.classList.add(type);
    
    // Update SVG icon based on type
    if (type === 'success') {
        elements.toastIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
    } else {
        elements.toastIcon.innerHTML = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
    }
    
    elements.toastMessage.textContent = message;
    
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

/**
 * Fetch all products from API
 */
async function fetchProducts() {
    showLoading();
    
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            renderProducts(result.data);
            showMainContent();
        } else {
            throw new Error(result.message || 'Failed to fetch products');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        showError(`Failed to load products: ${error.message}`);
    }
}

/**
 * Render products to the DOM
 */
function renderProducts(products) {
    elements.productsList.innerHTML = '';
    
    if (products.length === 0) {
        elements.emptyState.classList.remove('hidden');
        elements.productCount.textContent = '0 products';
        return;
    }
    
    elements.emptyState.classList.add('hidden');
    elements.productCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        elements.productsList.appendChild(productCard);
    });
}

/**
 * Create a product card element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-header">
            <span class="product-id">#${product.id}</span>
        </div>
        <h3 class="product-name">${escapeHtml(product.name)}</h3>
        <span class="product-category">${escapeHtml(product.category)}</span>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-actions">
            <button class="btn btn-danger delete-btn" data-id="${product.id}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete
            </button>
        </div>
    `;
    
    // Add delete button event listener
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteProduct(product.id));
    
    return card;
}

/**
 * Add a new product
 */
async function addProduct(productData) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Product added successfully!', 'success');
            fetchProducts(); // Refresh the list
            elements.productForm.reset();
        } else {
            throw new Error(result.message || 'Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
        showToast(`Failed to add product: ${error.message}`, 'error');
    }
}

/**
 * Delete a product
 */
async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            showToast('Product deleted successfully!', 'success');
            fetchProducts(); // Refresh the list
        } else {
            throw new Error(result.message || 'Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        showToast(`Failed to delete product: ${error.message}`, 'error');
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handle form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(elements.productForm);
    const productData = {
        name: formData.get('name').trim(),
        price: parseFloat(formData.get('price')),
        category: formData.get('category').trim()
    };
    
    // Validate
    if (!productData.name || !productData.category || isNaN(productData.price) || productData.price <= 0) {
        showToast('Please fill in all fields correctly', 'error');
        return;
    }
    
    addProduct(productData);
}

/**
 * Initialize the application
 */
function init() {
    // Event Listeners
    elements.productForm.addEventListener('submit', handleFormSubmit);
    elements.refreshBtn.addEventListener('click', fetchProducts);
    elements.retryBtn.addEventListener('click', fetchProducts);
    
    // Fetch products on load
    fetchProducts();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
