// producto.js

// Función para manejar clics en elementos .product
function handleProductClick() {
    var productNumber = this.querySelector('h2').textContent.match(/\d+/)[0];
    var redirectURL = 'producto.html?product=' + productNumber;
    window.location.href = redirectURL;
  }
  
  // Función para mostrar solo el producto correspondiente
  function showSelectedProduct() {
    var urlParams = new URLSearchParams(window.location.search);
    var productNumber = urlParams.get('product');
  
    if (productNumber) {
      var selectedProduct = document.getElementById('producto' + productNumber);
      var allProducts = document.querySelectorAll('.product');
  
      allProducts.forEach(function (product) {
        product.style.display = 'none';
      });
  
      if (selectedProduct) {
        selectedProduct.style.display = 'block';
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    // Obtén todos los elementos de clase "product"
    var products = document.querySelectorAll('.product');
  
    // Asigna un evento de clic a cada elemento de producto
    products.forEach(function (product) {
      product.addEventListener('click', handleProductClick);
    });
  
    // Llama a la función showSelectedProduct al cargar la página
    showSelectedProduct();
  });
  