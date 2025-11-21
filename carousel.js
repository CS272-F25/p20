const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const container = document.querySelector('.carousel-container');

let index = 0;

function updateCarousel() {
    const slideStyle = getComputedStyle(slides[0]);
    const slideWidth = slides[0].getBoundingClientRect().width + parseFloat(slideStyle.marginRight);

    const visibleCount = Math.floor(container.offsetWidth / slideWidth);

    const maxIndex = slides.length - visibleCount;
    if (index > maxIndex) index = 0; 

    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    index++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = slides.length - Math.floor(container.offsetWidth / slides[0].getBoundingClientRect().width);
    updateCarousel();
});

setInterval(() => {
    index++;
    updateCarousel();
}, 3000);

window.addEventListener('resize', updateCarousel);

updateCarousel();
