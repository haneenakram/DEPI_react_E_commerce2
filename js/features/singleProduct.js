 async function fetchProductData(productId) {
  try {
    // console.log(productId);
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    // console.log(response);
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
  const productContainer = $(".content");
  if (productContainer) {
    productContainer.html(`
      <h2>${product.name}</h2>
      <p>Price: $${product.price}</p>
      <p>Description: ${product.description}</p>
    `);
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

  console.log("hereeeeeeeeeeeeeeeeeeee");
  initializeProductPage();
// async function navigateTo(pageUrl) {
//   const res = await fetch(pageUrl)
//     .then((response) => response.text())
//     .then((data) => {
//       console.log(data);
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(data, "text/html");
//       // const mainContent = doc.querySelector("#main-content").innerHTML;

//       // // Update the main content area
//       // document.getElementById("content-area").innerHTML = mainContent;
//     })
//     .catch((error) => {
//       console.error("Error loading page:", error);
//     });
// }
