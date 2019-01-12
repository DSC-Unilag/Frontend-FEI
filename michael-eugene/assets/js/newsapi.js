/*jshint esversion: 6 */

const bbc =
  "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
const techcrunch =
  "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
const mtv =
  "https://newsapi.org/v2/top-headlines?sources=mtv-news&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";
const espn =
  "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=f3d6aa29b4af4d45ad9cb6542b496c04";

var myStorage = window.localStorage;

function fetchAndRenderNews(url, index) {
  fetch(url)
    .then(res => res.json())
    .then(res =>
      res.articles.slice(0, 4).forEach(art => {
        document.getElementsByClassName("wrapper")[index].innerHTML += `
        <div class="grid-item sm fav">
        <div class="img-wrapper image" style="background-image:url(${
          art.urlToImage
        });">
        <div class="liked-container"><i class="fas fa-heart liked" id="heart"></i></div>
        </div>
        <div class="hero-txt">
        <h2 class="grid-txt title">${art.title}</h2>
        <p class="grid-txt desc">${art.description}</p>
        <div><a href="${
          art.url
        }" class="btn-sec url">Read More &rightarrow;</a></div>
        </div>
        </div>
        `;
      })
    );
}

fetchAndRenderNews(bbc, 0);
fetchAndRenderNews(techcrunch, 1);
fetchAndRenderNews(mtv, 2);
fetchAndRenderNews(espn, 3);


let storage = {};

setTimeout(() => {
  document.querySelectorAll("#heart").forEach((el, i) => {
    el.addEventListener("click", () => {
      el.classList.toggle("red");
      if (el.classList.contains("red")) {
       let v = {
          desc: document.getElementsByClassName("desc")[i].innerHTML,
          image: document.getElementsByClassName("image")[i].style.backgroundImage.slice(4, -1).replace(/["']/g, ""),
          title: document.getElementsByClassName("title")[i].innerHTML,
          url: document.getElementsByClassName("url")[i].href
        };
        storage[i] = v;
        console.log(storage);
      } else {
        myStorage.removeItem(i);
        delete storage[i];
        console.log(storage);
      };
      myStorage.setItem(i, JSON.stringify(storage));
    });
  });
}, 4000);



