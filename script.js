const slides=['slides/slide1.png','slides/slide2.png','slides/slide3.png'];
let current=0;
const img=document.getElementById('slide');
function show(){img.src=slides[current];}
function nextSlide(){current=(current+1)%slides.length;show();}
function prevSlide(){current=(current-1+slides.length)%slides.length;show();}
setInterval(nextSlide,5000);