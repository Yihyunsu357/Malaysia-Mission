const slides = [
  'slides/slide1.png',
  'slides/slide2.png',
  'slides/slide3.png'
];

let current = 0;

const img = document.getElementById('slide');

function show() {
  img.src = slides[current];
}

window.nextSlide = function () {
  current = (current + 1) % slides.length;
  show();
};

window.prevSlide = function () {
  current = (current - 1 + slides.length) % slides.length;
  show();
};

setInterval(window.nextSlide, 8000);