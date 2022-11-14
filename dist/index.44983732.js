// Nav menu.
const hamburger = document.querySelector("[data-hamburger]");
const close = document.querySelector("[data-close-button]");
const modal = document.querySelector("[data-modal]");
// Opens the modal.
hamburger.addEventListener("click", (e)=>{
    modal.classList.add("open");
});
// Closes the modal.
close.addEventListener("click", (e)=>{
    modal.classList.remove("open");
});
// Slider.
const track = document.querySelector("[data-track]");
const slides = [
    ...track.children
];
const prevButton = document.querySelector("[data-prev-button]");
const nextButton = document.querySelector("[data-next-button]");
// Defines width of slide.
const slideWidth = slides[0].getBoundingClientRect().width;
// Sets the slides side by side.
function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);
// Moves the track side to side.
// targetSlide, sometimes is next, sometimes is previous.
function moveToSlide(track, currentSlide, targetSlide) {
    track.style.transform = `translate(-` + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}
nextButton.addEventListener("click", (e)=>{
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndex = slides.indexOf(currentSlide);
    // Stops function from running if it is the last slide
    if (currentIndex === slides.length - 1) return;
    moveToSlide(track, currentSlide, nextSlide);
});
prevButton.addEventListener("click", (e)=>{
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndex = slides.indexOf(currentSlide);
    // Stops function from running if it is the first slide
    if (currentIndex === 0) return;
    moveToSlide(track, currentSlide, prevSlide);
});

//# sourceMappingURL=index.44983732.js.map
