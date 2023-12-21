

function hideAllContent() {
  var contentElements = document.querySelectorAll('.content');
  contentElements.forEach(function (element) {
    element.style.display = 'none';
  });
}

// mostrar el contenido correspondiente al hacer clic en el menú
function showContent(contentId) {
  hideAllContent();
  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = 'block';

    if (contentId === 'productos') {
      // Muestra solo los primeros 10 productos al seleccionar la sección de "Productos"
      paginaActual = 1; // Reinicia la página actual al mostrar la sección de productos
      mostrarProductos(); // Llama a la función para mostrar los productos
    }
  }
}

// Oculta todos los elementos de contenido al cargar la página
window.onload = function () {
  hideAllContent();
  // Muestra el contenido de inicio por defecto al cargar la página
  showContent('inicio');
};

// Número de productos a mostrar por página
var productosPorPagina = 10;
// Índice inicial de la página actual
var paginaActual = 1;

// Función para mostrar los productos de la página actual
function mostrarProductos() {
  // Calcular el rango de productos a mostrar
  var inicio = (paginaActual - 1) * productosPorPagina;
  var fin = inicio + productosPorPagina;

  // Obtener todos los productos
  var productos = Array.from(document.querySelectorAll('.product'));

  // Ocultar todos los productos
  productos.forEach(function (producto) {
    producto.style.display = 'none';
  });

  // Mostrar los productos en el rango actual
  var productosAMostrar = productos.slice(inicio, fin);
  productosAMostrar.forEach(function (producto) {
    producto.style.display = 'block';
  });
}

// Función para mostrar la página anterior
function mostrarPaginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    mostrarProductos();
  }
}

// Función para mostrar la página siguiente
function mostrarPaginaSiguiente() {
  // Puedes ajustar este límite según sea necesario
  var cantidadTotalPaginas = Math.ceil(document.querySelectorAll('.product').length / productosPorPagina);
  if (paginaActual < cantidadTotalPaginas) {
    paginaActual++;
    mostrarProductos();
  }
}

// Asignar funciones a los eventos de clic de los botones
var btnAnterior = document.querySelector('.navigation-buttons button:first-child');
var btnSiguiente = document.querySelector('.navigation-buttons button:last-child');

btnAnterior.addEventListener('click', mostrarPaginaAnterior);
btnSiguiente.addEventListener('click', mostrarPaginaSiguiente);

// Variables
var originalProducts; // Guardará los productos originales

// Función para obtener productos que coinciden con el término de búsqueda
function getMatchingProducts(searchTerm) {
    return originalProducts.filter(function (product) {
        return product.textContent.toLowerCase().includes(searchTerm);
    });
}

// Función para mostrar los resultados de búsqueda en el contenedor
function displaySearchResults(products) {
    // Oculta todos los productos
    originalProducts.forEach(function (product) {
        product.style.display = 'none';
    });

    // Muestra solo los productos filtrados
    products.forEach(function (product) {
        product.style.display = 'block';
    });
}

// Evento de carga del documento
document.addEventListener("DOMContentLoaded", function () {
    // Obtén la barra de búsqueda y el contenedor de productos
    var searchInput = document.getElementById('searchInput');
    var searchButton = document.getElementById('searchButton'); // Corregir el ID aquí
    var productContainer = document.getElementById('productContainer');

    // Almacena los productos originales al cargar la página
    originalProducts = Array.from(document.querySelectorAll('.product'));

    // Maneja el evento de entrada en la barra de búsqueda
    searchInput.addEventListener('input', function () {
        // Obtiene el término de búsqueda
        var searchTerm = searchInput.value.trim().toLowerCase();

        // Filtra los productos que coinciden con el término de búsqueda
        var matchingProducts = getMatchingProducts(searchTerm);

        // Muestra los resultados en el contenedor
        displaySearchResults(matchingProducts);
    });

    // Asigna la función de búsqueda al evento clic del botón
    searchButton.addEventListener('click', search);
});

// Añade esta función para realizar la búsqueda al presionar la tecla Enter
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search();
    }
});

// Añade esta función para mostrar todos los productos originales al borrar el contenido de la barra de búsqueda
function resetSearch() {
    displaySearchResults(originalProducts);
}
