// Get all gallery images
const galleryItems = document.querySelectorAll(".gallery-item");
const images = document.querySelectorAll(".gallery-item img");

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Store currently visible images
let visibleImages = [];
let currentIndex = 0;


// ===============================
// OPEN LIGHTBOX
// ===============================

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        // Get all currently visible gallery items
        visibleImages = Array.from(galleryItems)
            .filter(item => item.style.display !== "none");

        // Find clicked image
        currentIndex = visibleImages.indexOf(item);

        showImage();

        lightbox.style.display = "flex";
    });

});


// ===============================
// SHOW IMAGE
// ===============================

function showImage() {

    const selectedItem = visibleImages[currentIndex];

    const image = selectedItem.querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
}


// ===============================
// NEXT IMAGE
// ===============================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();
});


// ===============================
// PREVIOUS IMAGE
// ===============================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();
});


// ===============================
// CLOSE LIGHTBOX
// ===============================

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});


// Close when clicking outside image
lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});


// ===============================
// CATEGORY FILTER
// ===============================

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        const category = button.dataset.category;

        galleryItems.forEach((item) => {

            const itemCategory = item.dataset.category;

            if (category === "all" || category === itemCategory) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", (event) => {

    // Escape → Close
    if (event.key === "Escape") {
        lightbox.style.display = "none";
    }

    // Right arrow → Next
    if (event.key === "ArrowRight") {

        if (lightbox.style.display === "flex") {
            nextBtn.click();
        }

    }

    // Left arrow → Previous
    if (event.key === "ArrowLeft") {

        if (lightbox.style.display === "flex") {
            prevBtn.click();
        }

    }

});