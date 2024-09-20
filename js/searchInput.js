const searchIcon = document.querySelector(".search-icon");
const searchForm = document.querySelector(".searchform");
const searchInput = searchForm.querySelector("input"); // Assuming there's an input inside the form

// Toggle search form visibility on search icon click
searchIcon.addEventListener("click", function (event) {
  searchForm.classList.toggle("active");

  // Prevent the event from bubbling up to the document click listener
  // event.stopPropagation();

  // Focus the input if the form is active
  if (searchForm.classList.contains("active")) {
    searchInput.focus();
  }
});

// Close search form when clicking anywhere outside the search bar
document.addEventListener("click", function (event) {
  // If the clicked element is not inside the search form or the search icon, close the form
  if (
    !searchForm.contains(event.target) &&
    !searchIcon.contains(event.target)
  ) {
    searchForm.classList.remove("active");
  }
});
