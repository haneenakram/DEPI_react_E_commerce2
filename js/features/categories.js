import { mainElement,categoriesContainer } from "../shares/ui/DOM-elements.js";
export function successCategories(data) {
  mainElement.removeClass("d-none");
  mainElement.addClass("row");
  categoriesContainer.html(data
    .map((item) => {
      return `
        <li id="${item.slug}" class="fs-6 py-2 px-1">${item.name}</li>`;
    })
    .join("")

  )
}
// data.forEach((item) => {
//   document.getElementById(item.slug).addEventListener("click", function () {
//     handelRemoteRequest(
//       `products/category/${item.slug}`,
//       successProducts,
//       errorItems,
//       loadingItemsArea,
//       stopLoadingItems
//     );
//   });
// });
