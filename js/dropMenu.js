//?  Drop the Menu in the responsive
const bars = document.querySelector(".fa-bars");
const links = document.querySelector(".links");
const header = document.querySelector("header");
bars.addEventListener("click", function () {
  links.classList.toggle("active");
  header.classList.toggle("height");
});
// Reset header height on window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 991) {
    links.classList.remove("active");
    header.classList.remove("height");
  }
});
//? Drop the Menu in the responsive

//? The miny box for (pages) link in the navBar
const pages = document.querySelector(".pages");
const arrowText = document.querySelector(".arrow-text");

pages.addEventListener("click", function () {
  arrowText.classList.toggle("active");
});
//? The miny box for (pages) link in the navBar
