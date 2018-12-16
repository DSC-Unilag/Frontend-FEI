// If you are reading this, im new to javascript so most of my code will be irrelevant.... lol
// Please feel free to help refactor my code... I would greatly appreciate it ;) Cheers


const bbc = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
const techcrunch = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
const mtv = "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
const espn = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";



function fetchAndRenderNews(url, index) {
    fetch(url)
    .then((res) => res.json())
    .then((res) =>
    res.articles.slice(0,4).forEach((art,num)  => {
    document.getElementsByClassName("wrapper")[index].innerHTML += `
    <div class="grid-item sm">
    <i class="fas fa-heart liked" id=""></i>
    <div class="img-wrapper" style="background-image:url(${art.urlToImage});"></div>
    <div class="hero-txt">
    <h2 class="grid-txt">${art.title}</h2>
    <p class="grid-txt">${art.description}</p>
    <div><a href="${art.url}" class="btn-sec">Read More &rightarrow;</a></div>
    </div>
    </div>
    `
    }))
}
fetchAndRenderNews(bbc, 0);
fetchAndRenderNews(techcrunch, 1);
fetchAndRenderNews(mtv, 2);
fetchAndRenderNews(espn, 3);