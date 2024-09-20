var swiper = new Swiper(".mySwiper", {
  loop: true, // Enable looping
  autoplay: {
    delay: 2000, // Delay between slides in milliseconds
    reverseDirection: false, // Start moving right (default)
    disableOnInteraction: false, // Keep autoplay even when user interacts
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  on: {
    slideChangeTransitionEnd: function () {
      if (this.realIndex === 0) {
        // Reverse the direction when it reaches the first slide
        this.autoplay.reverseDirection = !this.autoplay.reverseDirection;
      }
    },
  },
});
