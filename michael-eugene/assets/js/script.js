// If you are reading this, im new to javascript so most of my code will be irrelevant.... lol
// Please feel free to help refactor my code... I would greatly appreciate it ;) Cheers


// Animation Scripting
var animate;

function loaderAnimation() {
    animate = setTimeout(showPage, 4000);
}

function showPage() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('myDiv').style.display = "block";
}






// Navigation Scripting Begins

    // Navigation Slide Out Menu
    const navToggle = document.querySelector('.menu-icon')

    navToggle.addEventListener("click", () => {
        document.body.classList.toggle("nav-is-visible");
    })

    // Navigation Item Clicked Behaviour
    var navItem = document.querySelectorAll('.nav-link')[0];
    var navItem1 = document.querySelectorAll('.nav-link')[1];
    var navItem2 = document.querySelectorAll('.nav-link')[2];
    var navItem3 = document.querySelectorAll('.nav-link')[3];
    var navItem4 = document.querySelectorAll('.nav-link')[4];


    navItem.addEventListener("click", () => {
        document.body.classList.remove("nav-is-visible");
    })
    navItem1.addEventListener("click", () => {
        document.body.classList.remove("nav-is-visible");
    })
    navItem2.addEventListener("click", () => {
        document.body.classList.remove("nav-is-visible");
    })
    navItem3.addEventListener("click", () => {
        document.body.classList.remove("nav-is-visible");
    })
    navItem4.addEventListener("click", () => {
        document.body.classList.remove("nav-is-visible");
    })

// Navigation SCripting Ends.....





