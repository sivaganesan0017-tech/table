// DOM elements select pannrom
const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

// Products data store panna
let products = [];

 //  Fetch products from API
async function loadProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    loadCategories();
    showProducts(products);
  } catch (err) {
    productsDiv.innerHTML = "Failed to load products";
  }
}

   //Load category options
function loadCategories() {
  const categories = ["all", ...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

//   Display products
function showProducts(list) {
  productsDiv.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.title}</h3>
      <p>${item.category}</p>
      <span>$${item.price}</span>
    `;

    productsDiv.appendChild(div);
  });
}

//   Search + Filter + Sort
function filterProducts() {
  let result = [...products];

  // Category filter
  if (categoryFilter.value !== "all") {
    result = result.filter(p => p.category === categoryFilter.value);
  }

  // Search filter
  if (searchInput.value) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  // Sort filter
  if (sortFilter.value === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sortFilter.value === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  showProducts(result);
}


  // Events
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
sortFilter.addEventListener("change", filterProducts);

// Start app
loadProducts();
