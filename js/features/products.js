import { itemsElement } from "../shares/ui/DOM-elements.js";
// console.log("here");
function renderProduct(product) {
  return `<div class="col-md-4 col-sm-12">
    <div class="border shadow rounded-2 px-3 py-2">
      <img
        src="${product.image}"
        class="w-100 mb-2"
        style="height: 200px"
      />
      <div class="mb-3">
        <h4 class="mb-1 text-center">${product.title}</h4>
        <p> <b>Availability:</b> ${product.availabilityStatus}</p>
        <p> <b>Return policy:</b> ${product.returnPolicy}</p>
        <p> <b>Shipping:</b> ${product.shippingInformation}</p>
        <div class="prod-desc">
        <p><b>Description:</b> </p>
        <p>${product.description}</p>
        </div>
      </div>
      <div class="d-flex gap-2 mb-3 align-items-center">
        <span class="text-warning">★</span>
        <div class="px-2 bg-danger bg-opacity-75 rounded-2">${
          product.rating
        }</div>
      </div>
      <div class="d-flex gap-3 align-items-center">
        <p class="fw-bold mb-0 fs-4">${product.price}</p>
        <button class="btn btn-primary add" data-product='${JSON.stringify(
          product
        )}'>Add To Chart</button>
      </div>
    </div>
  </div>`;
}

export function successProducts(data) {
  itemsElement.removeClass("d-none");
  itemsElement.addClass("row");
  itemsElement.html(
    data.products
      .map((item) =>
        renderProduct({
          id: item.id,
          title: item.title,
          image: item.images[0],
          price: item.price,
          stock: item.stock,
          availabilityStatus: item.availabilityStatus,
          returnPolicy: item.returnPolicy,
          shippingInformation: item.shippingInformation,
          description: item.description,
          rating: item.rating,
        })
      )
      .join("")
  );
}
itemsElement.on("click", function (e) {
  const productBox = $(e.target).closest(".col-md-4");
  console.log("Product box:", productBox);
  if (productBox) {
    const addButton = productBox.find(".btn");
    const productData = JSON.parse(addButton.attr("data-product"));
    console.log("Product Data:", productData);
    const itemId = $(e.target).attr("data-id");
    // window.location.href = `product.html?id=${itemId}`;
    // console.log(productData.id);
    const url = `product.html?id=${productData.id}`;
    window.location.href = url;
    // navigateTo(url);
  }
});
// console.log(itemsElement);
// Ensure you have adapted the following code to work with vanilla JS if you're not using jQuery
// document.querySelectorAll(".add").forEach((button) => {
//   button.addEventListener("click", function () {
//     const product = JSON.parse(this.getAttribute("data-product"));
//     addTocart(product);
//     // showPopupNotification(product.title);
//   });
// });
