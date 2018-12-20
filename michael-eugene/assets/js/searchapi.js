/*jshint esversion: 6 */

var searchIndex = location.search.split('=')[1];
var url = 'https://newsapi.org/v2/everything?q=' + searchIndex + '&language=en&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04';




function fetchAndRenderSearchResults(url, index) {
    fetch(url)
    .then((res) => res.json())
    .then ((res) => 
    res.articles.slice(index).forEach(art => {
        document.querySelector('#wrapper').innerHTML += `
        <div class="grid-item sm fav">
        <div class="liked-container"><i class="fas fa-heart liked" id=""></i></div>
        <div class="img-wrapper" style="background-image:url(${art.urlToImage});"></div>
        <div class="hero-txt">
        <h2 class="grid-txt">${art.title}</h2>
        <p class="grid-txt">${art.description}</p>
        <div><a href="${art.url}" class="btn-sec">Read More &rightarrow;</a></div>
        </div>
        </div>
        `;
    }));
}

fetchAndRenderSearchResults(url, -10);





