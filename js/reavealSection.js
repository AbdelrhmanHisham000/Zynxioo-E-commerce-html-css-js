//Reveal section

// const allSection = document.querySelectorAll("section");


// const revealSection = function (entries, observer) {
//   const [entry] = entries;
  
//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section--hidden");
//   observer.unobserver(entry.target);
// };
// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.10,
// });

// allSection.forEach(function (section) {
//   sectionObserver.observe(section); //tells the IntersectionObserver to start observing each section (watch for when it comes into view)
//   section.classList.add("section--hidden");
// });


// Lazy Loading Images