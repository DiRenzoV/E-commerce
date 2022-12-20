// Hamburger menu.
const hamburger = document.querySelector("[data-hamburger]");
const modal = document.querySelector("[data-modal]");
const menu = document.querySelector("[data-menu]");
// Opens hamburger menu.
hamburger.addEventListener("click", ()=>{
    modal.classList.add("open");
});
const closeModalButton = document.querySelector("[data-close-modal-button]");
// Closes hamburger menu.
closeModalButton.addEventListener("click", ()=>{
    modal.classList.remove("open");
});
// Create cart.
const openCartButton = document.querySelector("[data-open-cart-button]");
openCartButton.addEventListener("click", ()=>{
    const cart = document.querySelector("[data-cart]");
    cart.classList.toggle("open");
});
const carItemsContainer = document.querySelector("[data-cart-items-container]");
const cartItems = [];
// Create items.
// Add items to cart.
// Uppdate icon item indicator. 
// 
// Slider.
// Arrange slides side by side.
const track = document.querySelector("[data-carousel-track]");
const slides = [
    ...track.children
];
const lightbox = document.querySelector("[data-lightbox]");
const slideWidth = slides[0].getBoundingClientRect().width;
function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);
// Move to slide.
const prevButton = document.querySelector("[data-prev-button]");
const nextButton = document.querySelector("[data-next-button]");
function moveToSlide(track, currentSlide, targetSlide) {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}
// Enables and Disables arrows.
function updateArrows(slides, targetIndex, prevButton, nextButton) {
    if (targetIndex === 0) {
        prevButton.classList.add("is-disabled");
        nextButton.classList.remove("is-disabled");
    } else if (targetIndex === slides.length - 1) {
        nextButton.classList.add("is-disabled");
        prevButton.classList.remove("is-disabled");
    } else {
        prevButton.classList.remove("is-disabled");
        nextButton.classList.remove("is-disabled");
    }
}
// updates thumbnails 
function updateThumbnails(currentThumbnail, targetThumbnail) {
    currentThumbnail.classList.remove("current-slide");
    targetThumbnail.classList.add("current-slide");
}
// Slide to righ.
nextButton.addEventListener("click", ()=>{
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex((slide)=>slide === nextSlide);
    const currentThumbnail = sliderNav.querySelector(".current-slide");
    const nextThumbnail = currentThumbnail.nextElementSibling;
    if (targetIndex === -1) return;
    moveToSlide(track, currentSlide, nextSlide);
    updateArrows(slides, targetIndex, prevButton, nextButton);
    updateThumbnails(currentThumbnail, nextThumbnail);
});
// Slide to left.
prevButton.addEventListener("click", ()=>{
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex((slide)=>slide === prevSlide);
    const currentThumbnail = sliderNav.querySelector(".current-slide");
    const prevThumbnail = currentThumbnail.previousElementSibling;
    if (targetIndex === -1) return;
    moveToSlide(track, currentSlide, prevSlide);
    updateArrows(slides, targetIndex, prevButton, nextButton);
    updateThumbnails(currentThumbnail, prevThumbnail);
});
// thumbnails.
const sliderNav = lightbox.querySelector("[data-slider-nav]");
const thumbnails = [
    ...sliderNav.children
];
sliderNav.addEventListener("click", (e)=>{
    const targetThumbnail = e.target.closest(".thumbnail");
    if (!targetThumbnail) return;
    const currentSlide = track.querySelector(".current-slide");
    const currentThumbnail = sliderNav.querySelector(".current-slide");
    const targetIndex = thumbnails.findIndex((slide)=>slide === targetThumbnail);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateArrows(slides, targetIndex, prevButton, nextButton);
    updateThumbnails(currentThumbnail, targetThumbnail);
});
// Lightbox.
const sliderContainer = document.querySelector("[data-slider-container]");
sliderContainer.addEventListener("click", ()=>{
    lightbox.style.display = "block";
});
const closeLightboxButton = lightbox.querySelector("[data-lightbox-close-button]");
closeLightboxButton.addEventListener("click", ()=>{
    lightbox.style.display = "none";
});

//# sourceMappingURL=playground.44983732.js.map
