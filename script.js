const buttons=document.querySelectorAll(".language button");

function activate(index){

buttons.forEach(btn=>btn.classList.remove("active"));

buttons[index].classList.add("active");

}

function showKR(){

document.getElementById("korean").style.display="block";
document.getElementById("english").style.display="none";

activate(0);

animateCards();

}

function showEN(){

document.getElementById("korean").style.display="none";
document.getElementById("english").style.display="block";

activate(1);

animateCards();

}

function animateCards(){

const section=document.getElementById("korean").style.display==="none"
    ? document.getElementById("english")
    : document.getElementById("korean");

const cards=section.querySelectorAll(".prayer-card");

cards.forEach((card,index)=>{

card.classList.remove("show");

setTimeout(()=>{

card.classList.add("show");

},index*180);

});

}

window.addEventListener("load",()=>{

showKR();

});

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:0.15});

document.querySelectorAll(".prayer-card").forEach(card=>{

observer.observe(card);

});