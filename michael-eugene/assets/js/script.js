// If you are reading this, im new to javascript so most of my code will be irrelevant.... lol
// Please feel free to help refactor my code... I would greatly appreciate it ;) Cheers








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


// BBC API
var url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((response) => 

        response.articles.slice(-4).forEach(art => {
            document.getElementsByClassName('wrapper')[0].innerHTML += `
        <div class="grid-item sm">
            <div class="img-wrapper" style="background-image:url(${response.articles[0].urlToImage});"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${response.articles[0].title}</h2>
                <p class="grid-txt">${response.articles[0].description}</p>
                <div><a href="${response.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `
        }))

// Technology API
var url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((response) => 

        response.articles.slice(-4).forEach(art => {
            document.getElementsByClassName('wrapper')[1].innerHTML += `
        <div class="grid-item sm">
        <div class="img-wrapper" style="background-image:url(${response.articles[0].urlToImage});"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${response.articles[0].title}</h2>
                <p class="grid-txt">${response.articles[0].description}</p>
                <div><a href="${response.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `
        }))

// Entertainment API
var url = "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((response) => 

        response.articles.slice(-4).forEach(art => {
            document.getElementsByClassName('wrapper')[2].innerHTML += `
        <div class="grid-item sm">
        <div class="img-wrapper" style="background-image:url(${response.articles[0].urlToImage});"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${response.articles[0].title}</h2>
                <p class="grid-txt">${response.articles[0].description}</p>
                <div><a href="${response.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `
        }))

// Sport API
var url = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((response) => 

        response.articles.slice(-4).forEach(art => {
            document.getElementsByClassName('wrapper')[3].innerHTML += `
        <div class="grid-item sm">
        <div class="img-wrapper" style="background-image:url(${response.articles[0].urlToImage});"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${response.articles[0].title}</h2>
                <p class="grid-txt">${response.articles[0].description}</p>
                <div><a href="${response.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `
        }))


