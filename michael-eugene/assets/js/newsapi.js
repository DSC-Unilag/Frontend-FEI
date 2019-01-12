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
        <div class="img-wrapper" style="background-image:url(${
          art.urlToImage
        });">
        <div class="liked-container"><i class="fas fa-heart liked" id="heart"></i></div>
        </div>
        <div class="hero-txt">
        <h2 class="grid-txt">${art.title}</h2>
        <p class="grid-txt">${art.description}</p>
        <div><a href="${
          art.url
        }" class="btn-sec">Read More &rightarrow;</a></div>
        </div>
        </div>
        `;
      })
    );
}
// function storeNewsToLocalStorage(url) {
//   fetch(url)
//     .then(res => res.json())
//     .then(res =>
//       myStorage.setItem('art', JSON.stringify(res))
//     )
// }






fetchAndRenderNews(bbc, 0);
fetchAndRenderNews(techcrunch, 1);
fetchAndRenderNews(mtv, 2);
fetchAndRenderNews(espn, 3);

// storeNewsToLocalStorage(bbc);
// storeNewsToLocalStorage(techcrunch);
// storeNewsToLocalStorage(mtv);
// storeNewsToLocalStorage(espn);

setTimeout(() => {
  document.querySelectorAll("#heart").forEach((el, i, v) => {
    el.addEventListener("click", () => {
      el.classList.toggle("red");
      if(el.classList.contains('red')) {
        myStorage.setItem(i, JSON.stringify(storage));
      } else {
        myStorage.removeItem(i)
      }
    });
  });
}, 4000);


let key = 'art';
let value = 'value';



let storage = [
  {
    value: ''
  }
];

for (let i = 0; i < storage.length; i++){
  let key = storage[i].key;
  let value = storage[i].value;
  console.log(key, value);
}