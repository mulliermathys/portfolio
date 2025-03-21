
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const scrollAmount = document.getElementsByClassName('card')[0].clientWidth; // Adjust based on card width and gap

prevBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Optional: Disable buttons at the edges
const checkButtons = () => {
  prevBtn.disabled = carousel.scrollLeft === 0;
  nextBtn.disabled = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth;
};

carousel.addEventListener('scroll', checkButtons);
window.addEventListener('resize', checkButtons);

checkButtons();
