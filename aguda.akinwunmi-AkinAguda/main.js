var nav = document.getElementById('nav');
var mask = document.getElementById("mask");
var links = document.getElementsByClassName('item');
var img = document.getElementsByTagName("header");
var shouldSlide = true;
var startSlide = false;
nav.style.width = '0%';
//Mobile Sliding Navigation
function animHam(x) {
    x.classList.toggle("change");
    if(shouldSlide){
        if(window.matchMedia("(min-width : 640px)").matches){
            for(i = 0; i < links.length; i++){
                links[i].style.visibility = "visible";
            }
            nav.style.width = '35%';
        }
        else{
            for(i = 0; i < links.length; i++){
                links[i].style.visibility = "visible";
            }
            nav.style.width = '94%';
        }
        shouldSlide = false;
    }
    else{
        shouldSlide = true;
        nav.style.width = '0%';
        for(i = 0; i < links.length; i++){
            links[i].style.visibility = "hidden";
        }
    }
}
//Animated Top Menu Bar
window.onscroll = function(){headerAnim()}
function headerAnim(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        document.getElementById("top").classList.add("topAnim");
        document.getElementById("line").classList.add("lineVanish")
    }
    else{
        document.getElementById("top").classList.remove("topAnim");
        document.getElementById("line").classList.remove("lineVanish")
    }
}
function checkMedia(){
    if(window.matchMedia("(min-width : 768px)").matches){
        document.getElementById("top").appendChild(nav);
    }
    else{
        document.getElementById("navigation").appendChild(nav);
    }
}
//flashing images
// var images = ['url("images/stocks.jpg")', 'url("images/streets.jpg")', 'url("images/tech.jpg")']
// var i=1;
// function switchImage(){
//     checkMedia();
//         setInterval(function(){
//                 img[0].classList.add("flash");
//                 setTimeout(function(){
//                     img[0].classList.remove("flash");
//                 },600)
//                 setTimeout(function(){
//                     img[0].style.backgroundImage = images[i];
//                 },550)
//                  i++;
//                  if(i == images.length){
//                     i = 0;
//                  }
//             },5000)
// }
window.onresize = checkMedia();
//fetching and displaying  news
var getNews = function(id, section, number, random, tileOrBlock, maxWidth){
    this.fetchApi = () => {
        var unit = `px`;
        shouldStartSlide = true;
        if(window.matchMedia(`(min-width : ${maxWidth}px)`).matches){
            maxWidth = maxWidth;
        }
        else{
            shouldStartSlide = false;
            maxWidth = 100;
            unit = `%`;
        }
        fetch(section)
        .then(function(result){
            return(result.json());
        })
        .then(function(print){
            var length = print.articles.length;
            var each = [0];
            for (i = each.length; i < length; i++){
                each.push(i);
            }
            if(random){
                for(i = each.length-1; i > 0; i--){
                    var randomNo = Math.floor(Math.random()*(i+1));
                    lasteach = each[i];
                    each[i] = each[randomNo];
                    each[randomNo] = lasteach;
                }
            }
            console.log(each)
            console.log(print)
            for(i = 0; i != number; i++){
                if (tileOrBlock == "block"){
                    var cont = document.getElementById(id);
                    cont.setAttribute("style", `width:${maxWidth}${unit};`)
                    cont.innerHTML += `<div class = "card" style = min-width:${maxWidth}${unit} id = "id-${id}";>
                    <img src="${print.articles[each[i]].urlToImage}" 
                    class="news-image"><p class = "caption">${print.articles[each[i]].title}"</p>
                    <p class="story">${print.articles[each[i]].description}</p>
                    <p class = "date">${print.articles[each[i]].source.name} on ${print.articles[each[i]].publishedAt}</p></div>`;
                }
                if (tileOrBlock == "tile"){
                    var cont = document.getElementById(id);
                    cont.setAttribute("style", `max-width:${maxWidth}${unit};`)
                    cont.innerHTML += `<div class = "tile" style = min-width:${maxWidth}${unit};>
                    <div>
                    <img src="${print.articles[each[i]].urlToImage}" 
                    class="tileNews-image">
                    </div>
                    <div>
                    <p class = "tileCaption">${print.articles[each[i]].title}"</p>
                    <p class = "tileDate">${print.articles[each[i]].source.name} on ${print.articles[each[i]].publishedAt}
                    </p></div>`;
                }
            }
            if(shouldStartSlide){
                startSlide = true;
                setInterval(move(maxWidth), 5000);
            }
        })
    }
}
var techCrunch = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=78c7a959be2d49cb8b88e9a2895ed5c9" ;
var topUs = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=78c7a959be2d49cb8b88e9a2895ed5c9";
var news = new getNews("req", techCrunch, 5, false, "block", 400);
var tiledNews = new getNews("tiles", techCrunch, 4, false, "tile", 400);
var tiledTopNews = new getNews("top-stories", topUs, 5, false, "tile", 400);
tiledNews.fetchApi();
tiledTopNews.fetchApi();
news.fetchApi();
function move(maxW){
    if(startSlide){
            var components = document.getElementsByClassName("card");
            for (var i = 0; i < components.length; i++) {
                // components[i].classList.add('sliding');
                // setTimeout(function(i){components[i].classList.remove('sliding')},1000)
            }
    }  
    
}
setAttribute('style', `transform:translateX(-${maxW}px)`)