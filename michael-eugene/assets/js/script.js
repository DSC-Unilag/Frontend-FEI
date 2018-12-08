// Navigation Bar
const navToggle = document.querySelector('.menu-icon')

navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-is-visible")
})




// TechRadar API
const url = "https://newsapi.org/v2/top-headlines?sources=techradar&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((data) => 

    document.getElementsByClassName('grid-item')[4].innerHTML = `
    <div class="img-wrapper"></div>
    <div>
        <p class="grid-txt">${data.articles[0].title}</p>
        <div><a href="#" class="btn-sec">Read More</a></div>
    </div>
    `);