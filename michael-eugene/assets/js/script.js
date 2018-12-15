// If you are reading this, im new to javascript so most of my code will be irrelevant.... lol
// Please feel free to help refactor my code... I would greatly appreciate it ;) Cheers

var animate;
const BREAKINGNEWS = document.querySelector('.marquee');



function loaderAnimation() {
    animate = setTimeout(showPage, 100);
}
function showPage() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('myDiv').style.display = "block";
}


// Navigation Slide Out Menu
const navToggle = document.querySelector('.menu-icon')
navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-is-visible");
})

var world = document.querySelectorAll('.nav-link')[1];
var tech = document.querySelectorAll('.nav-link')[2];
var ent = document.querySelectorAll('.nav-link')[3];
var sports = document.querySelectorAll('.nav-link')[4];

function navItemIsClicked(item) {
    item.addEventListener("click", () => {
        document.body.classList.remove("nav-is-visible");
    })
}
navItemIsClicked(world);
navItemIsClicked(tech);
navItemIsClicked(ent);
navItemIsClicked(sports);

fetch('https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04')
    .then((res) => res.json())
    .then((res) => 
    res.articles.slice(-1).forEach(num => {
        BREAKINGNEWS.innerHTML += `
        <p class="marquee-text">Breaking News</p>
                <marquee behavior="scroll" direction="left" id="breaking-news">${res.articles[0].description}</marquee>
        `
    }))