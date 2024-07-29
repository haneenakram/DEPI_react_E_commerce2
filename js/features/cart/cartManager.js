import { itemsElement } from "../../shares/ui/DOM-elements.js";
import CartItem from "./cartItem.js";
export default class CartManager {
  static localStorageKey = "cartItems";
  #cartItems;
  constructor() {
    const localStorageSavedItems =
      JSON.parse(localStorage.getItem(CartManager.localStorageKey)) || [];
    console.log(localStorageSavedItems);
    this.#cartItems = localStorageSavedItems.map((item) =>
      CartItem.formToCartItemInstance(item)
    );

    this.#handelToggleCart();
    this.#handleRender();
    this.#addProductToCart();
    this.#updateCartItem();
    // this.#updateLocalStorage();
  }
  #handelToggleCart = function () {
    $("#cart").on("click", function () {
      $(".cart-container").removeClass("hide");
    });
    $(".close").on("click", function () {
      $(".cart-container").addClass("hide");
    });
  };

  // addTocart = function (product) {
  //   const productIndex = cart.findIndex((item) => item.id === product.id);
  //   if (productIndex !== -1) {
  //     cart[productIndex].quantity = Number(cart[productIndex].quantity) + 1;
  //     cart[productIndex].total =
  //       cart[productIndex].quantity * Number(cart[productIndex].price);
  //   } else {
  //     cart.push(product);
  //     showFeedback();
  //   }
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   localStorage.setItem("total", JSON.stringify(cnt));

  //   calctotal();
  //   inCart();
  // };
  // inCart = function () {
  //   // console.log(cart);
  //   // if (cart.length > 0) {
  //   //   $("#items-count").removeClass("d-none");
  //   //   $("#items-count").html(`${this.#cartItems.length}`);
  //   //   $(".no-items").addClass("d-none");
  //   //   $("#cart-body").removeClass("d-none");
  //   //   $(".cart-checkout").removeClass("d-none");
  //   //   $("#cart-body").html(
  //   //     cart
  //   //       .map((item) => {
  //   //         // console.log(item);
  //   //         return `
  //   //     <div
  //   //             class="d-flex border m-2 p-1 position-relative justify-content-around align-items-center">
  //   //             <div class="remove top-0 start-0 me-5 position-absolute fs-5 bg-danger text-light p-1" id = "${item.id}">
  //   //               <i class="fa-solid fa-xmark" aria-hidden="true" ></i>
  //   //             </div>
  //   //             <div class="image w-25 me-2">
  //   //               <img
  //   //                 class="h-100 w-100 object-fit-cover img-fluid"
  //   //                 src="${item.thumbnail}"
  //   //                 alt=""
  //   //               />
  //   //             </div>
  //   //             <div class="product-content d-flex flex-column gap-2 justify-content-center align-items-center flex-wrap">
  //   //               <h5>${item.title}</h5>
  //   //               <p>
  //   //                 Price: <span>${item.quantity}</span> x <span>${item.price}</span> : <span>${item.total}</span>
  //   //               </p>
  //   //             </div>
  //   //             <div class="arrows row gap-2 cursor-pointer">
  //   //               <i class="fa-solid fa-up-long" data-inc-id="${item.id}"></i>
  //   //               <i class="fa-solid fa-down-long" data-dec-id="${item.id}"></i>
  //   //             </div>
  //   //           </div>`;
  //   //       })
  //   //       .join("")
  //   //   );
  //   // $("#cart-body").off("click", ".remove");
  //   // $("#cart-body").off("click", "[data-inc-id]");
  //   // $("#cart-body").off("click", "[data-dec-id]");

  //   // $("#cart-body").on("click", ".remove", function () {
  //   //   const id = this.id.replace("remove-", "");
  //   //   removeFromCart(id);
  //   // });
  //   // $("#cart-body").on("click", "[data-inc-id]", function () {
  //   //   const id = $(this).data("inc-id");
  //   //   increase(id);
  //   // });
  //   // $("#cart-body").on("click", "[data-dec-id]", function () {
  //   //   const id = $(this).data("dec-id");
  //   //   decrease(id);
  //   // });
  //   // } else {
  //   //   $("#items-count").addClass("d-none");
  //   //   $("#cart-body").addClass("d-none");
  //   //   $(".cart-checkout").addClass("d-none");
  //   //   $(".no-items").removeClass("d-none");
  //   // }
  // };

  #handleRender = function () {
    //get element render data

    if (this.#cartItems.length === 0) {
      $("#items-count").addClass("d-none");
      $("#cart-body").addClass("d-none");
      $(".cart-checkout").addClass("d-none");
      $(".no-items").removeClass("d-none");
    } else {
      $("#items-count").removeClass("d-none");
      $("#items-count").html(`${this.#cartItems.length}`);
      $(".no-items").addClass("d-none");
      $("#cart-body").removeClass("d-none");
      $(".cart-checkout").removeClass("d-none");
      $("#cart-body").html(
        this.#cartItems.map((item, index) => item.renderElement()).join("")
      );
    }
    //check array is empty
  };
  //add to cart
  #addProductToCart = function () {
    //listn button addCart
    itemsElement.on("click", (e) => {
      if ($(e.target).attr("data-product")) {
        const { id, title, image, price, stock } = JSON.parse(
          $(e.target).attr("data-product")
        );
        const exisitiongItem = this.#cartItems.find((item) => item.id === id);
        if (exisitiongItem) {
          exisitiongItem.increase();
          // console.log(exisitiongItem);
        } else {
          const cartItem = new CartItem(id, title, image, price, stock);
          this.#cartItems.push(cartItem);
        }
      }
      this.#updateLocalStorage();
      this.#handleRender();
    });
  };
  #updateLocalStorage = function () {
    localStorage.setItem(
      CartManager.localStorageKey,
      JSON.stringify(this.#cartItems)
    );
  };
  #updateCartItem = function () {
    const isUpdated = true;
    $("#cart-body").on("click", (e) => {
      const action = $(e.target).attr("data-action");
      const element = $(e.target);

      if (action === "remove") {
        const filterdItems = this.#cartItems.filter(
          (item) => item.id !== Number(element.attr("id"))
        );
        console.log(filterdItems);
        this.#cartItems = filterdItems;
        this.#updateLocalStorage();
        this.#handleRender();
      }
      if (action === "decrease") {
        const updatedCartItem = this.#cartItems.find(
          (item) => item.id === Number(element.attr("id"))
        );
        // console.log(updatedCartItem);
        if (updatedCartItem.quantity > 1) {
          updatedCartItem.decrease();
          this.#updateLocalStorage();
          this.#handleRender();
        } else {
          const filterdItems = this.#cartItems.filter(
            (item) => item.id !== Number(element.attr("id"))
          );
          console.log(filterdItems);
          this.#cartItems = filterdItems;
          this.#updateLocalStorage();
          this.#handleRender();
        }
      }
      if (action === "increase") {
        const updatedCartItem = this.#cartItems.find(
          (item) => item.id === Number(element.attr("id"))
        );
        updatedCartItem.increase();
        this.#updateLocalStorage();
        this.#handleRender();
      }
    });
  };
  // removeFromCart = function (id) {
  //   cart = cart.filter((item) => item.id != id);
  //   console.log(cart);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   calctotal();
  //   inCart();
  // };
}
