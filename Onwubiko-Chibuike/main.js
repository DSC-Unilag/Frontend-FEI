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

let displayTech = document.querySelector('.displayTech');
let displaySport = document.querySelector('.displaySport');

let form = document.getElementById("form");
let searchIcon = document.querySelector('.search');
let mobileHeader = document.querySelector('.mobile-header');
let form1 = document.querySelector('.form1');
let cancelIcon = document.querySelector('.cancel-icon');
let closeLikedNews = document.querySelector('.close-liked-news');

let body = document.querySelector('body');
let main = document.querySelector('main');
let preLoader = document.querySelector('.lds-ellipsis');
let newsContainer = document.querySelector('.news-container');


let header = document.querySelector('#header');
let nav = document.querySelector('nav');

let noOfNewsCategory = 3;

function validateAndReturnResponse(res) {
    if(!res.ok) {
        throw error(res.statusText);
    }
    return res.json();
}

//TO set local storage for top news
function storeLocally(news, output) {
    localStorage.setItem(news, JSON.stringify(output));
    return;
}

//To get news from local storage
function getFromLocalStorage(news,show) {
    let getItem = JSON.parse(localStorage.getItem(news));
    if(typeof getItem !== 'undefined' && getItem !== null) {
        show(getItem);
    }
    return;
}

//To display sports news
function displaySportsOutput(output) {
    for (let i = 0; i <= sportsNews.length-1; i++) {
        sportsNews[i].textContent = output.articles[i].title;
        sportsNews[i].href = output.articles[i].url;
        sportsNewsImages[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
    window.addEventListener('DOMContentLoaded',storeLocally('sportsNews', output));
    return;
}

//To display top news
function displayOutput(output) {
    for (let i = 0; i <= input.length-1; i++) {
        input[i].textContent = output.articles[i].title;
        input[i].href = output.articles[i].url;
        topNewsImages[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
    window.addEventListener('DOMContentLoaded',storeLocally('topNews', output));
    return;
}

function displayTechnologyOutput(output) {
    for (let i = 0; i <= techNews.length-1; i++) {
        techNews[i].textContent = output.articles[i].title;
        techNews[i].href = output.articles[i].url;
        techNewsImages[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
    window.addEventListener('DOMContentLoaded',storeLocally('techNews', output));
    return;
}

function displaySearchOutput(output) {
    if(output.totalResults > 1) {
        wordings = " Search results for ";
    } else if(output.totalResults == 1 ) {
        wordings = " Search result for ";
    } else {
        wordings = "0 Search result for";
    }
    searchHeader.textContent = wordings + search.value;
    main.appendChild(searchHeader);
    for (let i = 0; i < output.articles.length; i++) {
        let searchResult = document.createElement('div');
        let a = document.createElement('a');
        let p = document.createElement('p');
        let searchResultLink = searchResult.appendChild(a);
        let searchResultContent = searchResult.appendChild(p);
        a.setAttribute('target', 'blank');
        searchResult.setAttribute('class', 'search-results');
        searchResultLink.textContent = output.articles[i].title;
        searchResultLink.href = output.articles[i].url;
        searchResultContent.textContent = output.articles[i].description;
        main.appendChild(searchResult);
    }
    return;
}

function catchError(error) {
    console.log('looks like there was a problem: \n' + error );
    let errorParagraph = document.createElement('p');
    errorParagraph.textContent = "Kindly Check your internet connection";
    //main.insertBefore(errorParagraph, newsContainer);
    //errorParagraph.setAttribute('class', 'all__font-size');
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


window.addEventListener('load', getFromLocalStorage('topNews',displayOutput));
window.addEventListener('load', getFromLocalStorage('sportsNews', displaySportsOutput));
window.addEventListener('load', getFromLocalStorage('techNews', displayTechnologyOutput));

//Making a search request for news
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

//Searching for news 
function makeSearchRequest(e) {
    e.preventDefault();

    removePreviousSearchResult();
    
    timing();

    newsContainer.style.display = 'none';
    displayTech.style.display = 'none';
    displaySport.style.display = 'none';

    let formData = new FormData(document.getElementById('form')); 

    var data = new URLSearchParams();
    for (let pair of formData) {
        data.append(pair[0],pair[1]);
    }

    data.append('apikey', apikeys);
    data.toString();

    let searchUrl = 'https://newsapi.org/v2/everything?' + data;

    let init = {
        method: 'GET',
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
    };

    let request = new Request(searchUrl, init);
    
    makeRequest(request, displaySearchOutput);
    return;
}

//Setting a preloader icon
function timing() {
    preLoader.style.display = 'block';
    let timeOut = setTimeout(loadPage, 3000);
}
function loadPage() {
    preLoader.style.display = 'none';
    return;
}

//Collapsible mobile navbar
let openIcon = document.querySelector('.fa-bars');
let closeIcon = document.querySelector('.close-icon');
openIcon.addEventListener('click', openNavbar, false);
closeIcon.addEventListener('click', closeNavbar, false);
function openNavbar() {
    nav.style.display = 'flex';
    openIcon.style.display = 'none';
    closeIcon.style.display = 'inline-flex';
    return;
}
function closeNavbar() {
    nav.style.display = 'none';
    openIcon.style.display = 'inline-flex';
    closeIcon.style.display = 'none';
    return;
}

//Create a bookmark functionality
let likeIcon = document.querySelectorAll('.like-icon>i');
likeIcon.forEach((like) => like.addEventListener('click', getBookmarked, false));
window.addEventListener('load', checkAlreadyBookmarked, false);
function checkAlreadyBookmarked() {
    for(let j = 0; j < likeIcon.length; j++) {
        let liked = likeIcon[j].parentNode.parentNode;
        let myFigureObject = {
            url : liked.firstElementChild.href,
            title : liked.firstElementChild.innerHTML,
        }
        for (let i = 0; i < localStorage.length; i++) {
            let checkBookmarked = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(localStorage.key(i) != 'topNews') {
                if(localStorage.key(i) != 'techNews') {
                    if(localStorage.key(i) != 'sportsNews') {
                        if(checkBookmarked.url == myFigureObject.url) {
                            likeIcon[j].style.color = "rgba(255,255,0,1)";
                        }
                    }
                }
            }
        }
    }
    return;
}

function checkBookmark(myFigureObject){
    for (let i = 0; i < localStorage.length; i++) {
        let checkBookmarked = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(localStorage.key(i) != 'topNews') {
            if(localStorage.key(i) != 'techNews') {
                if(localStorage.key(i) !=  'sportsNews') {
                    if(checkBookmarked.url == myFigureObject.url) {
                        return;
                    }
                }
            }
        }
    }
    storeLocally(Date(), myFigureObject);
    return;
}
function getBookmarked() {
    this.style.color = "rgba(255,255,0,1)";
    let figureObject = this.parentNode.parentNode;
    let myFigureObject = {
        url : figureObject.firstElementChild.href,
        title : figureObject.firstElementChild.innerHTML,
    }
    checkBookmark(myFigureObject);
    return;
}

//create Bookmark page
let likedNews = document.querySelector('.liked-news');
likedNews.addEventListener('click', activateClick, false);
function activateClick() {
	openIcon.style.display = 'none';
	likedNews.style.display = 'none';
	closeLikedNews.style.display = 'inline-flex';
    removePreviousSearchResult();
    for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) != 'topNews') {
            if(localStorage.key(i) != 'techNews') {
                if(localStorage.key(i) !=  'sportsNews') {
                    getFromLocalStorage(localStorage.key(i), createBookmarkPage);
                }
            }
        }
    }
    return createBookmarkPage();
}
function createBookmarkPage(locallyStoredBookmarks) {
    //console.log(locallyStoredBookmarks);
    let bookmarkLength = localStorage.length - noOfNewsCategory;
    newsContainer.style.display = 'none';
    displayTech.style.display = 'none';
    displaySport.style.display = 'none';
    if((bookmarkLength) > 1) {
         wordings = " bookmarks ";
         advice = "";
    } else {
         wordings = " bookmark "
         advice = " click the like button to add bookmarks";
    }
    searchHeader.textContent = bookmarkLength + wordings + advice;
    main.insertBefore(searchHeader, newsContainer);
    if(locallyStoredBookmarks){
        const searchResult = document.createElement('div');
        const a = document.createElement('a');
        const icon = document.createElement('i');
        const span = document.createElement('span');
        let searchResultLink = searchResult.appendChild(a);
        span.appendChild(icon);
        searchResult.appendChild(span);
        span.setAttribute('class', 'span')
        a.setAttribute('target', 'blank');
        icon.setAttribute('class', 'icon fas fa-times');
        searchResult.setAttribute('class', 'search-results');
        searchResultLink.textContent = locallyStoredBookmarks.title;
        searchResultLink.href = locallyStoredBookmarks.url;
        main.appendChild(searchResult);
    }
    return;
}

//close bookmark page
closeLikedNews.addEventListener('click', closeBookmark, false); 
function closeBookmark() {
		removePreviousSearchResult();
		closeLikedNews.style.display= 'none';
		openIcon.style.display = 'inline-flex';
		likedNews.style.display = 'inline-flex';
		newsContainer.style.display = 'grid';
		displayTech.style.display = 'grid';
		displaySport.style.display = 'grid';
}

//Delete bookmarks
document.addEventListener('click', (event) => {
    if(event.target.matches('.span>.fa-times')) {
        let searchResult = document.querySelector(".span>.fa-times").parentNode.parentNode;
        deleteBookmarked(searchResult);
    }
}, false);
function deleteBookmarked(searchResult) {
    let myFigureObject = {
        url : searchResult.firstElementChild.href,
        title : searchResult.firstElementChild.innerHTML,
    }
    for (let i = 0; i < localStorage.length; i++) {
        let checkBookmarked = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(localStorage.key(i) != 'topNews') {
            if(localStorage.key(i) != 'techNews') {
                if(localStorage.key(i) != 'sportsNews') {
                    if(checkBookmarked.url == myFigureObject.url) {
                        searchResult.remove();
                        localStorage.removeItem(localStorage.key(i));
                        activateClick();
                    }
                }
            }
        }
    }
    return;
}

//properly displaying navbar when width changes
/*window.addEventListener('resize',navDisplay);
function navDisplay() {
    if(window.screen.availWidth >= 800 ) {
        return nav.style.display = "flex";
    } else {
        openIcon.style.display = 'inline-flex';
        return nav.style.display = 'none';    
    }
}*/

//Toggling form in mobile view
searchIcon.addEventListener('click', openSearch, false);
function openSearch() {
	form1.style.display = 'flex';
	mobileHeader.style.display = 'none';
	cancelIcon.style.display = 'flex';
}
cancelIcon.addEventListener('click', closeSearch, false);
function closeSearch() {	
	form1.style.display = 'none';
	mobileHeader.style.display = 'flex';
	cancelIcon.style.display = 'none';
}