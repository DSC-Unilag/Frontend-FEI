// Navigation Bar
const navToggle = document.querySelector('.menu-icon')

navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-is-visible")
})


var numbers_ = [1, 2, 3, 4, 5];
var text = "";
var i;
for (i = 0; i < numbers_.length; i++) { 
  text += numbers_[i] - 1
}


// BBC API
var url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((response) => 

        response.articles.slice(-4).forEach(art => {
            document.getElementsByClassName('wrapper')[0].innerHTML += `
        <div class="grid-item sm">
            <div class="img-wrapper"><img src="${response.articles[0].urlToImage}"></div>
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
            <div class="img-wrapper"><img src="${response.articles[0].urlToImage}"></div>
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
            <div class="img-wrapper"><img src="${response.articles[0].urlToImage}"></div>
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
            <div class="img-wrapper"><img src="${response.articles[0].urlToImage}"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${response.articles[0].title}</h2>
                <p class="grid-txt">${response.articles[0].description}</p>
                <div><a href="${response.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `
        }))


