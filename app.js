window.addEventListener('DOMContentLoaded', displayProducts);

const URL = 'https://68e3eec68e116898997a7bae.mockapi.io/products';

function displayProducts() {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network error!');
      }
      return response.json();
    })
    .then((products) => {
      document.querySelector('.products-container').innerHTML = products
        .map(
          (product) => `
            <div class="product-card">
              <img
                src="${product.imageURL}"
                alt="Product image"
              />
              <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">${product.price} LEI</div>
                <div class="buttons">
                  <button class="details-btn">Details</button>
                  <button class="cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          `
        )
        .join('');
    })
    .catch((error) => {
      document.querySelector('.products-container').innerHTML =
        'Failed to load products: ' + error.message;
    });
}