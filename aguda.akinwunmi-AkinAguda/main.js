var nav = document.getElementById('nav');
var mask = document.getElementById("mask");
var links = document.getElementsByClassName('item');
var img = document.getElementsByTagName("header");
let shouldSlide = true;
nav.style.width = '0%';
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
            nav.style.width = '100%';
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
var images = ['url("images/stocks.jpg")', 'url("images/streets.jpg")', 'url("images/tech.jpg")']
var i=1;
function switchImage(){
    checkMedia();
        setInterval(function(){
                img[0].classList.add("flash");
                setTimeout(function(){
                    img[0].classList.remove("flash");
                },600)
                setTimeout(function(){
                    img[0].style.backgroundImage = images[i];
                },550)
                 i++;
                 if(i == images.length){
                    i = 0;
                 }
            },5000)
}
window.onresize = checkMedia();
var getNews = function(className, section, number){
    this.fetchApi = () => {
        fetch(`https://newsapi.org/v2/everything?q=${section}&apiKey=78c7a959be2d49cb8b88e9a2895ed5c9`)
        .then(function(result){
            return(result.json());
        })
        .then(function(print){
            console.log(print)
            for(i = 0; i != number; i++){
                var rand  = Math.floor(Math.random()*print.articles.length);
                document.getElementById(className).innerHTML += 
                `<div class = "card"><img src="${print.articles[rand].urlToImage}" 
                class="news-image"><p class = "caption">${print.articles[rand].title}"</p>
                <p class="story">${print.articles[rand].description}</p></div>`;
                var rand  = Math.floor(Math.random()*print.articles.length); 
            }
        })
    }
}
var news = new getNews("req", "bitcoin", "3");
news.fetchApi();
