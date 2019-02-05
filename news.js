if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw_bundle.js')
      .then(reg => console.log("Service Worker: Registered."))
      .catch(err => console.log(`Service Worker: ${err} Not registered.`))
  })
};

let hamburger_icon = document.getElementById('news__burger__icon');
let close_button = document.getElementById('news__close__icon');
let news_ul_links = document.getElementById('news__links');
let sports_loader_icon = document.getElementById('loader-icon-sports');
let headlines_loader_icon = document.getElementById('loader-icon-headlines');
let tech_loader_icon = document.getElementById('loader-icon-tech');
let my_logo = document.getElementById('logo');
let search_bar = document.getElementById('my_search_bar');
let news_header_animation = document.getElementById('news__header__animation');
let latest_news_text = document.getElementById('news_latest_text');
let justIn = document.getElementById('just_in');
let ng_politics_slideshow = document.getElementById("ng-politics-slideshow");

hamburger_icon.addEventListener('click', function () {
  news_ul_links.style.display = 'inline-block';
  hamburger_icon.style.display = 'none';
  close_button.style.display = 'inline-block';
  my_logo.style.display = 'inline-block';
  news_header_animation.style.animation = 'expand 0.8s ease-out forwards';
  search_bar.style.display = 'none';
});

close_button.addEventListener('click', function () {
  news_header_animation.style.animation = 'close 0.8s ease-out';
  hamburger_icon.style.display = 'inline-block';
  search_bar.style.display = 'inline-block';
  close_button.style.display = 'none';
  my_logo.style.display = 'none';
  news_ul_links.style.display = 'none';
})

let load_icon = function () {
  sports_loader_icon.style.visibility = "hidden";
  headlines_loader_icon.style.visibility = "hidden";
  tech_loader_icon.style.visibility = "hidden";
}

// function setUp(){
//     nocanvas(); 
//     loadJSON('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', getData, 'jsonp');
// }

// function getText(){

//     fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec")
function getText_tech() {

  //Create XHR Object
  let xhr = new XMLHttpRequest();

  //OPEB -type, url/file, aync(true/false)
  xhr.open('GET', 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', true);

  console.log('READYSTATE1: ', xhr.readyState);

  //OPTIONAL - used for loaders (yes, loaders are optional)

  xhr.onload = function () {
    console.log('READYSTATE: ', xhr.readyState);

    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      let name = JSON.parse(this.responseText);
      /*This tranforms the JSON data into a much readable form e.g 
      name - sunkanmi*/
      load_icon();
      setTimeout( function(){
        justIn.style.display = 'inline-block'}, 1600);
      let output = "";
      for (let i = 0; i < name.totalResults - 1; i++) {
        output +=
          '<div class="tech_news">' +
          '<div class="tech__news__api">' +
          '<a href="' + name.articles[i].url + '">' +
          '<img src="' + name.articles[i].urlToImage + '" />' +          
          '<h3>' + name.articles[i].title + '</h3>' +
          '</a>' +
          '<p>' + name.articles[i].description + '</p>' +
          '</div>' +
          '</div>';
      }
      document.getElementById('other__news__2').innerHTML = output;
    }
  }

  xhr.onerror = function () {
    console.log("Request error......");
  }

  // xhr.onreadystatechange = function(){
  //     console.log('READYSTATE: ', xhr.readyState);
  //     if(this.readyState == 4 && this.status == 200){
  //         // console.log(this.responseText);
  //     }
  // }

  // Sends request
  xhr.send();
};

getText_tech();

// readyState values
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready

// HTTP Statuses
// 200: "Ok"
// 403: "Forbidden"
// 404: "Not Found" 

function getText_main() {

  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', true);

  console.log('READYSTATE2: ', xhr.readyState);

  xhr.onload = function () {
    console.log('READYSTATE2 :', xhr.readyState);
    if (this.status == 200) {
      let news = JSON.parse(this.responseText);

      let output = "";
      for (let i = 0; i < news.totalResults - 4; i++) {
        output +=
          '<div class="main_news">' +
          '<div class="main__news__api">' +
          '<a href="' + news.articles[i].url + '">' +
          '<img src="' + news.articles[i].urlToImage + '" />' +
          '</a>' +
          '<h3>' + news.articles[i].title + '</h3>' +
          '<ul>' +
          '<li>' + news.articles[i].description + '</li>' +
          '<li>' + news.articles[i].publishedAt + '</li>' +
          '<hr>' +
          '</ul>' +
          '</div>' +
          '</div>';
      }
      document.getElementById('other__news__1').innerHTML = output;
    }

    xhr.onerror = function () {
      console.log("Request error......");
    }
  }
  xhr.send();
};


getText_main();

function getText_sports() {

  let xml = new XMLHttpRequest();

  xml.open('GET', 'https://newsapi.org/v2/top-headlines?country=ng&category=sports&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', true);

  console.log('READYSTATE3: ', xml.readyState);

  xml.onload = function () {
    if (this.status == 200) {
      let sports = JSON.parse(this.responseText);

      let output = "";
      for (let i = 0; i < sports.totalResults - 65; i++) {
        output +=
          '<div class="sports_news">' +
          '<div class="sports__news__api">' +
          '<a href="' + sports.articles[i].url + '">' +
          '<img src="' + sports.articles[i].urlToImage + '" />' +
          '<h3>' + sports.articles[i].title + '</h3>' +
          '</a>' +
          '<ul>' +
          '<li>' + sports.articles[i].title + '</li>' +
          '<li>' + sports.articles[i].description + '</li>' +
          '<li>' + sports.articles[i].publishedAt + '</li>' +
          '</ul>' +
          '</div>' +
          '</div>';
      }
      document.getElementById('sports__news').innerHTML = output;
    }
    xml.onerror = function () {
      console.log('Request error....');
    }
  }
  xml.send();
}

getText_sports();

(function getJustIn(){
  fetch('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec')
  .then((res) => res.json())
  .then((data) => {
    let output = '';
    for(let i = 0; i < data.totalResults - 6; i++){
      output+= `
      <h3>${data.articles[i].title} - ${data.articles[i].author} </h3>
      `
    }
    latest_news_text.innerHTML = output;
  
    latest_news_text.style.animation = 'left_move 40s 700ms linear forwards infinite';
  })
})();

function getNgBusinessNewsSlideshow(){
  let myXml = new XMLHttpRequest();

  myXml.open('GET', 'https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', true);

  console.log("READYSTATE: ", myXml.readyState);

  myXml.onload = function(){
    if(this.status == 200){
      let busNews = JSON.parse(this.responseText);

      let output = "";
      for(let i = 0; i < busNews - 65; i++){
        output+=
        '<div class="business_news">' +
        '<div class="business__news__api">' +
        '<img src="' + busNews.articles[i].urlToImage + '" />' +
        '<h3>' + busNews.articles[i].title + '</h3>' +
        '<a href="' + busNews.articles[i].url + '">' +
        '</a>' +
        '<ul>' +
        '<li>' + busNews.articles[i].description + '</li>' +
        '<li>' + busNews.articles[i].publishedAt + '</li>' +
        '</ul>' +
        '</div>' +
        '</div>';
      }
      document.getElementById('ng-business-news').innerHTML = output;
    }
    myXml.onerror = function(){
      console.log("Request error...");
    }
  }
  myXml.send();
}