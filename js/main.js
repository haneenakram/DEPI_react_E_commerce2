import handelRemoteRequest, { getManyRequests } from "./shares/api.js";
import "./shares/api.js";
import {
  loadingElement,
  errorElement,
  loadingProducts,
  errorProducts,
  mainElement,
  categoriesContainer,
  itemsElement,
} from "./shares/ui/DOM-elements.js";

import { successProducts } from "./features/products.js";
import { successCategories } from "./features/categories.js";
// import {successSingleProduct} from "./features/singleProduct.js";
import CartManager from "./features/cart/cartManager.js";

const feedback = document.querySelector(".feedback");
const total = $("#total");
var cnt = Number(JSON.parse(localStorage.getItem("total"))) || 0;
var cart = JSON.parse(localStorage.getItem("cart")) || [];

const requestsConfig = [
  {
    endpoint: "products/categories",
    success: (data) => successCategories(data),
  },
  {
    endpoint: "products",
    success: (data) => successProducts(data),
  },
];

getManyRequests(
  {
    startLoading,
    error,
    stopLoading,
  },
  requestsConfig
).then(() => handelGetProductsByCategory());

function handelGetProductsByCategory() {
  categoriesContainer.children().on("click", (e) => {
    // console.log(e.target.id);
    handelRemoteRequest(
      `products/category/${e.target.id}`,
      successProducts,
      errorItems,
      loadingItemsArea,
      stopLoadingItems
    );
  });
}

function loadingItemsArea() {
  loadingProducts.removeClass("d-none");
  loadingProducts.addClass("d-flex");
}
function stopLoadingItems() {
  loadingProducts.removeClass("d-flex");
  loadingProducts.addClass("d-none");
}
function errorItems() {
  //error
  errorProducts.removeClass("d-none");
  errorProducts.addClass("d-flex");
  itemsElement.removeClass("row");
  itemsElement.addClass("d-none");
  errorProducts.find(".alert").text(err.message);
}

function calctotal() {
  cnt = 0;
  if (cart.length >= 0) {
    for (let i = 0; i < cart.length; i++) {
      cnt += cart[i].total;
    }
    cnt = Number(cnt.toFixed(2));
    console.log(cnt);
  } else cnt = 0;
  total.html(`${cnt} $`);
}

function showFeedback() {
  // const feedback = document.querySelector(".feedback"); // Define the feedback variable
  feedback.classList.replace("d-none", "d-block");
  feedback.style.opacity = "1";

  setTimeout(() => {
    feedback.style.opacity = "0";
  }, 1000); // Show for 1 second

  setTimeout(() => {
    feedback.classList.replace("d-block", "d-none");
    feedback.style.opacity = "1"; // Reset opacity for next use
  }, 2000); // Hide after an additional 0.5 second for the fade-out
}
function startLoading() {
  console.log("load");
  loadingElement.removeClass("d-none");
  loadingElement.addClass("d-flex");
}
function stopLoading() {
  console.log("stop");
  loadingElement.removeClass("d-flex");
  loadingElement.addClass("d-none");
}
function error(err) {
  errorElement.removeClass("d-none");
  errorElement.addClass("d-flex");
  mainElement.removeClass("row");
  mainElement.addClass("d-none");
  errorElement.find(".alert").text(err.message);
}



const cartManager = new CartManager();
//while items is loading disable all other elements in the categories
