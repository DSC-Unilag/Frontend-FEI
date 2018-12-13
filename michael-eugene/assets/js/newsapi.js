function fetchAndRenderNews(url, index) {
    fetch(url)
        .then((res) => res.json())
        .then((res) =>
            res.articles.slice(-4).forEach(art => {
                document.getElementsByClassName("wrapper")[index].innerHTML 
                += `
                <div class="grid-item sm">
                <div class="img-wrapper" style="background-image:url(${res.articles[0].urlToImage});"></div>
                    <div class="hero-txt">
                        <h2 class="grid-txt">${res.articles[0].title}</h2>
                        <p class="grid-txt">${res.articles[0].description}</p>
                        <div><a href="${res.articles[0].url}" class="btn-sec">Read More &rightarrow;</a></div>
                    </div>
                </div>
                `
            }))
}

// BBC API
var url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
fetchAndRenderNews(url, 0);

// Technology API
var url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
fetchAndRenderNews(url, 1);

// Entertainment API
var url = "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
fetchAndRenderNews(url, 2);

// Sport API
var url = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
fetchAndRenderNews(url, 3);