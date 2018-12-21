let apikeys = '7293043e37d649e28cd3848e276a7d3e';
let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=ng&'+
            'apiKey='+apikeys;
let sportsUrl = 'https://newsapi.org/v2/top-headlines?'
                + 'country=ng&'
                + 'category=sports&'
                + 'apiKey='+apikeys;
let technologyUrl = 'https://newsapi.org/v2/top-headlines?'
                    + 'country=ng&'
                    + 'category=technology&'
                    + 'apiKey='+apikeys;

let req = new Request(url);
let sportsRequest = new Request(sportsUrl);
let technologyRequest = new Request(technologyUrl);

let input = document.querySelectorAll('.news');
let topNewsImages = document.querySelectorAll('.top-news-images');
let sportsNews = document.querySelectorAll('.sport-news');
let sportsNewsImages = document.querySelectorAll('.sport-news-img');
let techNews = document.querySelectorAll('.tech-news');
let techNewsImages = document.querySelectorAll('.technology-news-image');
let searchHeader = document.createElement('h3');


let search = document.getElementById("search");

let body = document.querySelector('body');
let main = document.querySelector('main');
let preLoader = document.querySelector('.lds-ellipsis');
let newsContainer = document.querySelector('.news-container');

let header = document.querySelector('#header');

function validateAndReturnResponse(res) {
    if(!res.ok) {
        throw error(res.statusText);
    }
    return res.json();
}

function displaySportsOutput(output) {
    for (let i = 0; i <= sportsNews.length-1; i++) {
        sportsNews[i].textContent = output.articles[i].title;
        sportsNews[i].href = output.articles[i].url;
        sportsNewsImages[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
    return;
}

function displayOutput(output) {
    for (let i = 0; i <= input.length-1; i++) {
        input[i].textContent = output.articles[i].title;
        input[i].href = output.articles[i].url;
        topNewsImages[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
    return;
}

function displayTechnologyOutput(output) {
    for (let i = 0; i <= techNews.length-1; i++) {
        techNews[i].textContent = output.articles[i].title;
        techNews[i].href = output.articles[i].url;
        techNewsImages[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
    return;
}

function displaySearchOutput(output) {
    newsContainer.style.display = 'none';
    if(output.totalResults > 1) {
         wordings = " Search results for ";
    } else {
         wordings = " Search result for "
    }
    searchHeader.textContent = output.totalResults + wordings + search.value;
    main.appendChild(searchHeader);
    for (let i = 0; i < output.articles.length; i++) {
        if(i != 10 || i <= output.articles.length) {
            let searchResult = document.createElement('div');
            let a = document.createElement('a');
            let p = document.createElement('p');
            let searchResultLink = searchResult.appendChild(a);
            let searchResultContent = searchResult.appendChild(p);
            searchResult.setAttribute('class', 'search-results');
            searchResultLink.textContent = output.articles[i].title;
            searchResultLink.href = output.articles[i].url;
            searchResultContent.textContent = output.articles[i].description;
            //console.log(output.articles[i]);
            main.appendChild(searchResult);
        }
    }
    return;
}

function catchError(error) {
    console.log('looks like there was a problem: \n' + error );
    main.textContent = "Kindly Check your internet connection";
    main.setAttribute('class', 'all__font-size');
}

function makeRequest(req,displayOutput) {
    fetch(req)
    .then(validateAndReturnResponse)
    .then(displayOutput)
    .catch(catchError)
}

makeRequest(req, displayOutput);
makeRequest(sportsRequest, displaySportsOutput);
makeRequest(technologyRequest, displayTechnologyOutput);

//Search scipt

window.addEventListener('DOMContentLoaded', getSearch);

function getSearch() {
    let getSearchResult = document.getElementById('form');
    getSearchResult.addEventListener('submit', makeSearchRequest, false);
    return;
}

function removePreviousSearchResult() {
    let query = document.querySelectorAll('.search-results');
    query.forEach( (q) => {q.remove();});
    searchHeader.remove();
    return;
}


function makeSearchRequest(e) {
    e.preventDefault();

    removePreviousSearchResult();
    
    let formData = new FormData(document.getElementById('form')); 

    var data = new URLSearchParams();
    for (let pair of formData) {
        data.append(pair[0],pair[1]);
    }

    data.append('apikey', apikeys);
    data.toString();

    let searchUrl = 'https://newsapi.org/v2/top-headlines?' + data;

    let init = {
        method: 'GET',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
    };

    let request = new Request(searchUrl, init);
    
    makeRequest(request, displaySearchOutput);
    return;
}

//Setting Navbar
//window.addEventListener('scroll', fixNavbar);
function fixNavbar() {
    header.style.width = '100%';
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
}


//Setting a preloader icon

window.addEventListener('load', timing);
function timing() {
    let timeOut = setTimeout(loadPage, 3000);
}
function loadPage() {
    preLoader.style.display = 'none';
    newsContainer.style.display = 'grid';
}

//Collapsible mobile navbar

