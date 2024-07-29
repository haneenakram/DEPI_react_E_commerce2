import CartManager from "./cart/cartManager.js";
// $(function () {

//       });
let loadHTML = (file, elementId) => {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));
};
let cartManager;
let loadCart = async () => {
  try {
    await Promise.all([
      // $("#navbar-container").load("navbar.html"),
      // $("#cart-container").load("cart.html"),
      loadHTML("navbar.html", "navbar-container"),
      loadHTML("cart.html", "cart-container"),
    ]);
  } catch (e) {
    console.log(e);
  }
};

loadCart().then(() => {
  cartManager = new CartManager();
  console.log(cartManager);
  console.log(document.querySelector("#cart"));
});

var cnt = Number(JSON.parse(localStorage.getItem("total"))) || 0;
async function fetchProductData(productId) {
  try {
    // console.log(productId);
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
function renderProductDetails(product) {
  var carousel = $(".carousel-inner");
  // console.log(carousel);
  if (carousel) {
    product.images.forEach((image, index) => {
      let activeClass = index === 0 ? "active" : ""; // Add 'active' class to first item
      let carouselItem = `
      <div class="carousel-item ${activeClass}">
        <img src="${image}" class="d-block w-50 text-center mx-auto" style="max-width: 75%;" alt="Slide ${
        index + 1
      }">
      </div>
      `;
      carousel.append(carouselItem);
    });
  }
  const productContainer = $(".content");
  if (productContainer) {
    productContainer.html(`
          <h2>${product.title}</h2>
          <h4>Price: ${product.price} $</h4>
          <h5>Description: </h5>
          <p>${product.description}</p>
          <div class="d-flex gap-2 mb-3 align-items-center">
            <span class="text-warning">★</span>
            <div class="px-2 bg-danger bg-opacity-75 rounded-2">
              ${product.rating}
            </div>
          </div>
          <h5>Category: </h5>
          <p>${product.category}</p>
          <h5>Brand: </h5>
          <p>${product.brand}</p>
          <h5>Warranty: </h5>
          <p>${product.warrantyInformation}</p>
          <h5>Shipping: </h5>
          <p>${product.shippingInformation}</p>
          <h5>Stock: </h5>
          <p>${product.availabilityStatus}</p>
          <h5>Return policy: </h5>
          <p>${product.returnPolicy}</p>

    `);
    const allReviews = $(".reviews");
    if (allReviews) {
      product.reviews.forEach((review, index) => {
        let rev = `
            <P>Rate: ${review.rating}</p>
            <P>Comment: ${review.comment}</p>
            <P>Date: ${review.date}</p>
            <P>Name: ${review.reviewerName}</p>
            <P>Email: ${review.reviewerEmail}</p>
            <hr />
         
          `;
        allReviews.append(rev);
      });
    }
  }
}
async function initializeProductPage() {
  try {
    const productId = getProductIdFromUrl();
    // console.log(productId); tmamm
    const product = await fetchProductData(productId);
    console.log(product);
    renderProductDetails(product);
  } catch (error) {
    console.error("Error initializing product page:", error);
  }
}

function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

initializeProductPage();
