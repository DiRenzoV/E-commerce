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
// Cart.
const cartItemsContainer = document.querySelector("[data-cart-items-container]");
const itemTemplate = document.getElementById("template");
// Create cart.
const LOCAL_STORAGE_ITEMS_KEY = "cart.items";
const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY)) || [];
const openCartButton = document.querySelector("[data-open-cart-button]");
openCartButton.addEventListener("click", ()=>{
    const cart = document.querySelector("[data-cart]");
    cart.classList.toggle("open");
});
// Update quantity indicator.
const quantityDisplay = document.querySelector("[data-quantity]");
const increaseQuantityButton = document.querySelector("[data-increase-quantity-button]");
const decreaseQuantityButton = document.querySelector("[data-decrease-quantity-button]");
let shopQuantity = 1;
quantityDisplay.innerHTML = shopQuantity;
increaseQuantityButton.addEventListener("click", ()=>{
    shopQuantity++;
    quantityDisplay.innerHTML = shopQuantity;
});
decreaseQuantityButton.addEventListener("click", ()=>{
    if (shopQuantity === 1) return;
    shopQuantity--;
    quantityDisplay.innerHTML = shopQuantity;
});
// Create items.
function createItem(price, quantity) {
    return {
        id: Date.now().toString(),
        price: price,
        quantity: quantity,
        total: price * quantity
    };
}
// Add items to cart.
const addItemButton = document.querySelector("[data-add-item-button]");
addItemButton.addEventListener("click", ()=>{
    const price = 125;
    const quantity = shopQuantity;
    const item = createItem(price, quantity);
    if (cartItems.length !== 0) cartItems.splice(0, cartItems.length);
    cartItems.push(item);
    saveAndRender();
    hideShowCheckoutButton();
    updateCartQuantity();
});
// Show and hide checkout button.
const checkoutButton = document.querySelector("[data-checkout-button]");
const cartText = document.querySelector("[data-cart-text]");
const thankyou = document.querySelector("[data-thankyou]");
thankyou.style.display = "none";
checkoutButton.addEventListener("click", ()=>{
    cartItems.pop();
    saveAndRender();
    hideShowCheckoutButton();
    updateCartQuantity();
    // thank you card.
    thankyou.style.display = "flex";
    cartText.style.display = "none";
    setTimeout(hideShowCartText, 2500);
});
function hideShowCartText() {
    cartText.style.display = "block";
    thankyou.style.display = "none";
}
function hideShowCheckoutButton() {
    checkoutButton.classList.add("is-hidden");
    if (cartItems.length !== 0) checkoutButton.classList.remove("is-hidden");
    else checkoutButton.classList.add("is-hidden");
}
// Render items in cart;
function renderItems() {
    const itemElement = document.importNode(itemTemplate.content, true);
    cartItems.forEach((item)=>{
        const itemPrice = itemElement.querySelector("[data-item-price]");
        itemPrice.innerHTML = `$${item.price.toFixed(2)} x `;
        const itemQuantity = itemElement.querySelector("[data-item-quantity]");
        itemQuantity.innerHTML = item.quantity;
        const total = itemElement.querySelector("[data-total]");
        total.innerHTML = `$${item.total.toFixed(2)}`;
        // Remove item from cart.
        const deleteItemButton = itemElement.querySelector("[data-delete-item-button]");
        deleteItemButton.id = item.id;
        deleteItemButton.addEventListener("click", ()=>{
            cartItems.splice(0, 1);
            saveAndRender();
            hideShowCheckoutButton();
            updateCartQuantity();
        });
        cartItemsContainer.appendChild(itemElement);
    });
}
// clears element before adding item to cart.
function clearElement(element) {
    while(element.firstChild)element.removeChild(element.firstChild);
}
// Saves and renders.
function saveAndRender() {
    save();
    render();
}
// Save itemto local storage.
function save() {
    localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(cartItems));
}
// Clears element and renders items.
function render() {
    clearElement(cartItemsContainer);
    renderItems();
}
render();
hideShowCheckoutButton();
// Uppdate icon item indicator. 
function updateCartQuantity() {
    const cartQuantity = document.querySelector("[data-cart-quantity]");
    if (cartItems.length === 1) {
        cartQuantity.style.display = "block";
        cartQuantity.innerHTML = cartItems[0].quantity;
    } else cartQuantity.style.display = "none";
}
updateCartQuantity();
// Slider.
const lightbox = document.querySelector("[data-lightbox]");
const track = document.querySelector("[data-carousel-track]");
const slides = [
    ...track.children
];
const prevButton = document.querySelector("[data-prev-button]");
const nextButton = document.querySelector("[data-next-button]");
const slideWidth = slides[0].getBoundingClientRect().width;
// Arrange slides side by side.
function setSlidePosition(slide, index) {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);
// Move to slide.
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
// Slide to right.
function slideRight() {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const targetIndex = slides.findIndex((slide)=>slide === nextSlide);
    const currentThumbnail = sliderNav.querySelector(".current-slide");
    const nextThumbnail = currentThumbnail.nextElementSibling;
    if (targetIndex === -1) return;
    moveToSlide(track, currentSlide, nextSlide);
    updateArrows(slides, targetIndex, prevButton, nextButton);
    updateThumbnails(currentThumbnail, nextThumbnail);
}
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
// slideRight()
});
// Slide to left.
function slideLeft() {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const targetIndex = slides.findIndex((slide)=>slide === prevSlide);
    const currentThumbnail = sliderNav.querySelector(".current-slide");
    const prevThumbnail = currentThumbnail.previousElementSibling;
    if (targetIndex === -1) return;
    moveToSlide(track, currentSlide, prevSlide);
    updateArrows(slides, targetIndex, prevButton, nextButton);
    updateThumbnails(currentThumbnail, prevThumbnail);
}
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
// slideLeft()
});
// thumbnails.
const sliderNav = document.querySelector("[data-slider-nav]");
const thumbnails = [
    ...sliderNav.children
];
sliderNav.addEventListener("click", (e)=>{
    const targetThumbnail = e.target.closest(".thumbnail");
    if (!targetThumbnail) return;
    const currentSlide = track.querySelector(".current-slide");
    const currentThumbnail = sliderNav.querySelector(".current-slide");
    const targetIndex = thumbnails.findIndex((thumbnail)=>thumbnail === targetThumbnail);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateArrows(slides, targetIndex, prevButton, nextButton);
    updateThumbnails(currentThumbnail, targetThumbnail);
});
// Lightbox.
const sliderContainer = document.querySelector("[data-slider-container]");
sliderContainer.addEventListener("click", ()=>{
    // Prevents lightbox from openning on mobile devices.
    if (window.innerWidth < 768) return;
    lightbox.classList.add("lightbox-open");
    const slider = sliderContainer.cloneNode(true);
    lightbox.appendChild(slider);
    // Close lightbox.
    const closeLightboxButton = lightbox.querySelector("[data-lightbox-close-button]");
    closeLightboxButton.style.display = "block";
    closeLightboxButton.addEventListener("click", ()=>{
        lightbox.classList.remove("lightbox-open");
    });
    // Lightbox slider.
    const track = lightbox.querySelector("[data-carousel-track]");
    const slides = [
        ...track.children
    ];
    const sliderNav = lightbox.querySelector("[data-slider-nav]");
    const thumbnails = [
        ...sliderNav.children
    ];
    const nextButton = lightbox.querySelector("[data-next-button]");
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
    const prevButton = lightbox.querySelector("[data-prev-button]");
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
    sliderNav.addEventListener("click", (e)=>{
        const targetThumbnail = e.target.closest(".thumbnail");
        if (!targetThumbnail) return;
        const currentSlide = track.querySelector(".current-slide");
        const currentThumbnail = sliderNav.querySelector(".current-slide");
        const targetIndex = thumbnails.findIndex((thumbnail)=>thumbnail === targetThumbnail);
        const targetSlide = slides[targetIndex];
        moveToSlide(track, currentSlide, targetSlide);
        updateArrows(slides, targetIndex, prevButton, nextButton);
        updateThumbnails(currentThumbnail, targetThumbnail);
    });
});

//# sourceMappingURL=index.44983732.js.map
