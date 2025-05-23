const input = document.getElementById("searchInput");

function openSearch() {
    document.getElementById("popup").style.display = "flex";
    input.focus();
}

document.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        input.blur();
    }
})

input.onblur = function(){
    const link = document.createElement('a');
    // this link can be set to the result page + redirect to the search input.
    link.setAttribute("href", "#");
    link.click();
    closeSearch();
}

function closeSearch() {
    input.value = "";
  document.getElementById("popup").style.display = "none";
}

const images = document.querySelectorAll('#slider img');

images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    let container = document.querySelector(".dots");
    container.appendChild(dot);
});

const dots = document.querySelectorAll(".dot")
let current = 0;

function animationEnd(){
    images[current].classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    images[current].removeEventListener('animationend', animationEnd);
}

function showNextImage() {
    const currentImg = images[current];
    currentImg.removeEventListener('animationend', animationEnd);
    const next = (current + 1) % images.length;
    const nextImg = images[next];

    currentImg.classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    currentImg.classList.add('slide-out');

    nextImg.classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    nextImg.classList.add('slide-in');

    dots[current].classList.remove("active");
    dots[next].classList.add("active");

    currentImg.addEventListener('animationend', animationEnd);

    current = next;
}

let id = setInterval(showNextImage, 5000);

function resetInterval(){
    clearInterval(id);
    id = setInterval(showNextImage, 5000);
}

function onNextClick(){
    showNextImage();
    resetInterval();
}

function onPreviousClick(){
    const currentImg = images[current];
    currentImg.removeEventListener('animationend', animationEnd);
    let next = (current - 1);
    if(next < 0){
        next = images.length - 1;
    }
    const nextImg = images[next];

    currentImg.classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    currentImg.classList.add('previous-slide-out');

    nextImg.classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    nextImg.classList.add('previous-slide-in');

    dots[current].classList.remove("active");
    dots[next].classList.add("active");

    currentImg.addEventListener('animationend', animationEnd);

    current = next;
    resetInterval();
}

dots.forEach(dot =>{
    dot.addEventListener("click", function(event){
        const index = event.currentTarget.dataset.index;
        onDotClick(index);
    })
})

function onDotClick(index){
    if(index == current){
        return;
    }
    const currentImg = images[current];
    currentImg.removeEventListener('animationend', animationEnd);
    const next = index;
    const nextImg = images[next];

    currentImg.classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    if(next > current){
        currentImg.classList.add('slide-out');
    }else{
        currentImg.classList.add('previous-slide-out');
    }

    nextImg.classList.remove("slide-in", "slide-out", "previous-slide-in", "previous-slide-out");
    if(next > current){
        nextImg.classList.add('slide-in');
    }else{
        nextImg.classList.add('previous-slide-in');
    }

    dots[current].classList.remove("active");
    dots[next].classList.add("active");

    currentImg.addEventListener('animationend', animationEnd);

    current = next;
    resetInterval();
}