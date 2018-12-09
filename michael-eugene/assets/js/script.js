// Navigation Bar
const navToggle = document.querySelector('.menu-icon')

navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-is-visible")
})

// BBC API
var url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((data) => 

        document.getElementsByClassName('wrapper')[0].innerHTML = `
        <div class="grid-item">
            <div class="img-wrapper"><img src="${data.articles[0].urlToImage}"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${data.articles[0].title}</h2>
                <p class="grid-txt">${data.articles[0].description}</p>
                <div><a href="${data.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `);

// Technology API
var url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((data) => 

        document.getElementsByClassName('wrapper')[1].innerHTML = `
        <div class="grid-item">
            <div class="img-wrapper"><img src="${data.articles[0].urlToImage}"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${data.articles[0].title}</h2>
                <p class="grid-txt">${data.articles[0].description}</p>
                <div><a href="${data.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `);

// Entertainment API
var url = "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((data) => 

        document.getElementsByClassName('wrapper')[2].innerHTML = `
        <div class="grid-item">
            <div class="img-wrapper"><img src="${data.articles[0].urlToImage}"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${data.articles[0].title}</h2>
                <p class="grid-txt">${data.articles[0].description}</p>
                <div><a href="${data.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `);

// Sport API
var url = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

fetch(url)
    .then((response) => response.json())
    .then((data) => 

        document.getElementsByClassName('wrapper')[3].innerHTML = `
        <div class="grid-item">
            <div class="img-wrapper"><img src="${data.articles[0].urlToImage}"></div>
            <div class="hero-txt">
                <h2 class="grid-txt">${data.articles[0].title}</h2>
                <p class="grid-txt">${data.articles[0].description}</p>
                <div><a href="${data.articles[0].url}" class="btn-sec">Read More</a></div>
            </div>
        </div>
        `);

        
        // fetch(url)
        // .then((response) => response.json())
        // .then((data) => 
    
        //     document.getElementsByClassName('js-item')[1].innerHTML = `
        //     <div class="img-wrapper"></div>
        //     <div>
        //         <h3 class="grid-txt">${data.articles[1].title}</h3>
        //         <div><a href="${data.articles[1].url}" class="btn-sec">Read More</a></div>
        //     </div>
        //     `);

        // fetch(url)
        // .then((response) => response.json())
        // .then((data) => 
    
        //     document.getElementsByClassName('js-item')[2].innerHTML = `
        //     <div class="img-wrapper"></div>
        //     <div>
        //         <h3 class="grid-txt">${data.articles[2].title}</h3>
        //         <div><a href="${data.articles[2].url}" class="btn-sec">Read More</a></div>
        //     </div>
        //     `);

        // fetch(url)
        // .then((response) => response.json())
        // .then((data) => 
    
        //     document.getElementsByClassName('js-item')[3].innerHTML = `
        //     <div class="img-wrapper"></div>
        //     <div>
        //         <h3 class="grid-txt">${data.articles[3].title}</h3>
        //         <div><a href="${data.articles[3].url}" class="btn-sec">Read More</a></div>
        //     </div>
        //     `);

        // fetch(url)
        // .then((response) => response.json())
        // .then((data) => 
    
        //     document.getElementsByClassName('js-item')[4].innerHTML = `
        //     <div class="img-wrapper"></div>
        //     <div>
        //         <h3 class="grid-txt">${data.articles[4].title}</h3>
        //         <div><a href="${data.articles[4].url}" class="btn-sec">Read More</a></div>
        //     </div>
        //     `);

        // fetch(url)
        // .then((response) => response.json())
        // .then((data) => 
    
        //     document.getElementsByClassName('js-item')[5].innerHTML = `
        //     <div class="img-wrapper"></div>
        //     <div>
        //         <h3 class="grid-txt">${data.articles[5].title}</h3>
        //         <div><a href="${data.articles[5].url}" class="btn-sec">Read More</a></div>
        //     </div>
        //     `);



