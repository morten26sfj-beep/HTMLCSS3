/*
  The carousel originally used separate code for every image.
  That would have created unnecessary repetition, so the images
  are now stored as gallery buttons and handled with one system.
*/

// Select all clickable gallery images.
const galleryItems = document.querySelectorAll(".gallery-item");

// Select the carousel and its controls.
const carousel = document.querySelector("#carousel");
const carouselImage = document.querySelector("#carouselImage");
const carouselCaption = document.querySelector("#carouselCaption");

const closeButton = document.querySelector("#closeButton");
const previousButton = document.querySelector("#previousButton");
const nextButton = document.querySelector("#nextButton");

// Stores the index of the image currently being displayed.
let currentIndex = 0;

/*
  Opens the carousel.
  The index tells the function which image was clicked.
*/
function openCarousel(index) {
  currentIndex = index;

  updateCarousel();

  carousel.classList.add("active");
  carousel.setAttribute("aria-hidden", "false");

  // Prevents the background page from scrolling while the carousel is open.
  document.body.style.overflow = "hidden";
}

/*
  Updates the large image and caption.
  A previous mistake was using the small thumbnail size in the carousel.
  The original image source is used here instead.
*/
function updateCarousel() {
  const selectedItem = galleryItems[currentIndex];
  const selectedImage = selectedItem.querySelector("img");
  const selectedCaption = selectedItem.querySelector("span");

  carouselImage.src = selectedImage.src;
  carouselImage.alt = selectedImage.alt;
  carouselCaption.textContent = selectedCaption.textContent;
}

/*
  Closes the carousel and restores normal page scrolling.
*/
function closeCarousel() {
  carousel.classList.remove("active");
  carousel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/*
  Moves to the next image.
  If the last image is reached, the carousel starts again at image one.
*/
function showNextImage() {
  currentIndex++;

  if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }

  updateCarousel();
}

/*
  Moves to the previous image.
  If the first image is reached, the carousel goes to the last image.
*/
function showPreviousImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  }

  updateCarousel();
}

// Adds a click event to every gallery image.
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openCarousel(index);
  });
});

// Adds functionality to the carousel buttons.
closeButton.addEventListener("click", closeCarousel);
nextButton.addEventListener("click", showNextImage);
previousButton.addEventListener("click", showPreviousImage);

/*
  Clicking the dark background closes the carousel.
  The check is important because clicking the image itself
  should not close the carousel.
*/
carousel.addEventListener("click", (event) => {
  if (event.target === carousel) {
    closeCarousel();
  }
});

/*
  Keyboard controls make the carousel easier to use:
  - Right arrow: next image
  - Left arrow: previous image
  - Escape: close carousel
*/
document.addEventListener("keydown", (event) => {
  if (!carousel.classList.contains("active")) {
    return;
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }

  if (event.key === "Escape") {
    closeCarousel();
  }
});
