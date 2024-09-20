"use strict";

// Common Variables
const productsContainerCards = document.querySelector(".products .container");
let cart = [];

// Local Storage: Initialize cart from local storage if available
if (localStorage.getItem("items")) {
  cart = JSON.parse(localStorage.getItem("items"));
}
getDataFromLocalStorage();

// Common Function: Fetch data from JSON
const getProducts = async function (
  jsonPath,
  pageNumber = 1,
  itemsPerPage = 18
) {
  try {
    const res = await fetch(jsonPath);
    const data = await res.json();

    const start = (pageNumber - 1) * itemsPerPage;
    const end = pageNumber * itemsPerPage;

    const paginationData = data.slice(start, end);

    const finishedData = paginationData
      .map((product) => {
        return `
          <div class="card">
            <div class="pro-img">
              <img src="${product.img}" alt="${product.name}" />
            </div>
            <div class="pro-info">
              <h3>${product.name}</h3>
              <p>$${product.price}</p>
            </div>
            <div class="overlay">
              <div class="overlay-btns">
                <button 
                  class="add-to-cart" 
                  data-id="${product.id}" 
                  data-img="${product.img}" 
                  data-name="${product.name}" 
                  data-price="${product.price}">
                  Add to Cart
                </button>
                <button
                  class="buy-now"
                  data-id="${product.id}" 
                  data-img="${product.img}" 
                  data-name="${product.name}" 
                  data-price="${product.price}">
                  Buy Now
                </button>
              </div>
            </div>
          </div>`;
      })
      .join("");

    if (productsContainerCards) {
      productsContainerCards.innerHTML = finishedData;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Common Function: Add items to the cart
function addToCart(cart) {
  const cartContent = document.querySelector(".cart-content");
  const markup = cart
    .map((item) => {
      if (!item.id || !item.img || !item.name || !item.price) {
        console.error("Invalid item: Missing properties", item);
        return;
      }
      return `
        <div class="product-cart" data-id="${item.id}">
          <div class="product-image">
            <img src="${item.img}" alt="${item.name}" />
          </div>
          <div class="product-text">${item.name}</div>
          <div class="product-price">
            <p>$${item.price}</p>
          </div>
          <div class="product-icon">
            <i class="fa-solid fa-trash delete-from-cart"></i>
          </div>
        </div>`;
    })
    .join("");

  if (cartContent) {
    cartContent.innerHTML = markup;
  }
}

// Function: Handle rendering one product page
function oneProductPageF(item) {
  const onePageCon = document.querySelector(".item_detail .container");

  if (!onePageCon) {
    console.error("Target container not found!");
    return;
  }

  const markup = `
    <div class="img_item">
      <div class="big_img">
        <img id="bigImage"  src="${item.img}" alt="${item.name}">
      </div>
    </div>
    <div class="details_item">
      <h1 class="name">${item.name}</h1>
      <div class="stars">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="price">
        <p><span>${item.price}</span></p>
      </div>
      <h5>Availability: <span>In Stock</span></h5>
      <h5>SKU: <span>Lorem ipsum dolor sit amet.</span></h5>
      <p class="text_p">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <h4>${item.name}</h4>
      <button class="opp-add-to-cart" 
        data-id="${item.id}" 
        data-img="${item.img}" 
        data-name="${item.name}" 
        data-price="${item.price}">
        Add to cart <i class="fa-solid fa-cart-plus"></i>
      </button>
      <div class="icons">
        <span><i class="fa-solid fa-heart"></i></span>
        <span><i class="fa-solid fa-sliders"></i></span>
        <span><i class="fa-solid fa-print"></i></span>
        <span><i class="fa-solid fa-share-nodes"></i></span>
      </div>
    </div>
  `;

  onePageCon.innerHTML = markup;
}

// Event listeners: Add and remove items from the cart
document.addEventListener("click", function (event) {
  const addToCartButton = event.target.closest(".add-to-cart");
  const oppaddToCartButton = event.target.closest(".opp-add-to-cart");
  const buyNowButton = event.target.closest(".buy-now");

  if (addToCartButton || oppaddToCartButton) {
    const button = addToCartButton || oppaddToCartButton;
    const item = {
      id: button.dataset.id,
      img: button.dataset.img,
      name: button.dataset.name,
      price: button.dataset.price,
    };

    if (!item.id || !item.img || !item.name || !item.price) {
      console.error("Invalid item: Missing properties", item);
      return;
    }

    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      cart.push(item);
      addToCart(cart);
      addDataToLocalStorage(cart);
      calculateTotal();
      console.log("Item added to cart:", item);
    } else {
      console.log("Item already exists in cart");
    }
  }

  // Removing item
  const trash = event.target.closest(".delete-from-cart");
  if (trash) {
    const productCartElement = trash.closest(".product-cart");
    const itemToDeleteId = productCartElement.dataset.id;
    const itemIndex = cart.findIndex((item) => item.id === itemToDeleteId);

    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      addToCart(cart);
      addDataToLocalStorage(cart);
      calculateTotal();
    }

    productCartElement.remove();
  }

  if (buyNowButton) {
    const item = {
      id: buyNowButton.dataset.id,
      img: buyNowButton.dataset.img,
      name: buyNowButton.dataset.name,
      price: buyNowButton.dataset.price,
    };

    if (!item.id || !item.img || !item.name || !item.price) {
      console.error("Invalid item: Missing properties", item);
      return;
    }

    localStorage.setItem("selectedItem", JSON.stringify(item));
    window.location.href = "./onePageProduct.html";
  }
});

// On DOM load for individual product page
document.addEventListener("DOMContentLoaded", function () {
  const item = JSON.parse(localStorage.getItem("selectedItem"));
  if (item) {
    oneProductPageF(item);
  }
});

// Function: Save the cart data to local storage
const addDataToLocalStorage = (arrOfCart) => {
  localStorage.setItem("items", JSON.stringify(arrOfCart));
};

// Function: Fetch cart data from local storage
function getDataFromLocalStorage() {
  const data = localStorage.getItem("items");
  if (data) {
    cart = JSON.parse(data);
    addToCart(cart);
    calculateTotal();
  }
}

// For page navigation (Optional: Depending on your page setup)
document.querySelectorAll(".arrow-text .link").forEach((span) => {
  span.addEventListener("click", () => {
    window.location.href = span.getAttribute("data-href");
  });
});

// for pagination
let n = 1;

// Call the getProducts function depending on the page (if products container exists)
if (productsContainerCards) {
  const jsonPath = window.location.pathname.includes("product.html")
    ? "../Allitems.json"
    : "../items.json";
  getProducts(jsonPath, n, 18);

  // Pagination
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  const firstPage = document.querySelector(".first-page");
  console.log(firstPage);
  const secondPage = document.querySelector(".second-page");
  const thirdPage = document.querySelector(".third-page");

  // Initial page (1 = firstPage)

  nextButton.addEventListener("click", function () {
    n++;
    productsContainerCards.scrollIntoView({ behavior: "smooth" });
    getProducts(jsonPath, n, 18);
    if (n === 2) {
      firstPage.classList.remove("active");
      secondPage.classList.add("active");
    }
    if (n === 3) {
      secondPage.classList.remove("active");
      thirdPage.classList.add("active");
    }
    if (n > 3) {
      n = 3; // Prevent n from exceeding the number of pages
    }
  });

  prevButton.addEventListener("click", function () {
    n--;
    productsContainerCards.scrollIntoView({ behavior: "smooth" });

    getProducts(jsonPath, n, 18);
    if (n === 1) {
      secondPage.classList.remove("active");
      firstPage.classList.add("active");
    }
    if (n === 2) {
      thirdPage.classList.remove("active");
      secondPage.classList.add("active");
    }
    if (n < 1) {
      n = 1; // Prevent n from going below 1
    }
  });

  firstPage.addEventListener("click", function () {
    n = 1;
    productsContainerCards.scrollIntoView({ behavior: "smooth" });

    getProducts(jsonPath, n, 18);
    firstPage.classList.add("active");
    secondPage.classList.remove("active");
    thirdPage.classList.remove("active");
  });

  secondPage.addEventListener("click", function () {
    n = 2;
    productsContainerCards.scrollIntoView({ behavior: "smooth" });

    getProducts(jsonPath, n, 18);
    firstPage.classList.remove("active");
    secondPage.classList.add("active");
    thirdPage.classList.remove("active");
  });

  thirdPage.addEventListener("click", function () {
    n = 3;
    productsContainerCards.scrollIntoView({ behavior: "smooth" });

    getProducts(jsonPath, n, 18);
    firstPage.classList.remove("active");
    secondPage.classList.remove("active");
    thirdPage.classList.add("active");
  });
}

function calculateTotal() {
  let subTotalPrice = 0;

  // Calculate the total from the cart items
  cart.forEach((pro) => {
    if (pro.price) {
      subTotalPrice += parseFloat(pro.price);
    }
  });

  // Update the subtotal element if it exists
  const subtotal = document.querySelector(".subtotal-price");
  if (subtotal) {
    subtotal.innerHTML = `$${subTotalPrice.toFixed(2)}`; // Ensure it's formatted properly
  }

  // Number of product in car
  let proNo = cart.length ;
  const productNum = document.querySelector(".product-no");

  productNum.innerHTML = proNo;

  console.log("Total: ", subTotalPrice);
}

// Call this function after every cart update
calculateTotal();
