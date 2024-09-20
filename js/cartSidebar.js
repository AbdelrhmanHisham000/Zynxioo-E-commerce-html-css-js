//? Start OF SIDEBAR
const cartIcon = document.querySelector(".fa-cart-shopping");
const cartCloseIcon = document.querySelector(".close-cart");
const sideBar = document.querySelector(".sidebar-cart");

cartIcon.addEventListener("click", function () {
  document.querySelector(".sidebar-cart").classList.toggle("open");
});
cartCloseIcon.addEventListener("click", function () {
  sideBar.classList.remove("open");
});
//? END OF SIDEBAR