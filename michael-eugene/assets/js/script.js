// If you are reading this, im new to javascript so most of my code will be irrelevant.... lol
// Please feel free to help refactor my code... I would greatly appreciate it ;) Cheers

/*jshint esversion: 6 */

var animate;

function loaderAnimation() {
  animate = setTimeout(showPage, 6000);
}
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

// Navigation Slide Out Menu
const navToggle = document.querySelector(".menu-icon");
navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-is-visible");
});

const navLink = document.querySelectorAll(".nav-link");
function navItemIsClicked() {
  navLink.forEach(el => {
    el.addEventListener("click", () => {
      document.body.classList.remove("nav-is-visible");
    });
  });
}
navItemIsClicked();
