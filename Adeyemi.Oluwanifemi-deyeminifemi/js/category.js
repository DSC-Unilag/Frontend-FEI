if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('../sw.js')
        .then((data) => {
            console.log('Service Worked Registered')
        })
        .catch((err) => {
            console.log(err)
        })
}



const sections = ['business','sports','technology','entertainment','health','science'];
if(location.search && sections.filter(elem => location.search.includes(elem)).length > 0){    
    const category = location.search.split('&')[0].split('=')[1];
    const page = location.search.split('&')[1] ? location.search.split('&')[1].split('=')[1] : '1';
    document.querySelector('#links input').value = category;
    document.querySelector(`#page-${page}`).classList.add('active');
    document.querySelector('#prev-page').value = page == 1 ? 1 : page - 1;
    document.querySelector('#next-page').value = parseInt(page) + 1;
    if(page === 10){
        document.querySelector('#next-page').style.display = "none";
    }
    const displayStories = (data) => {
        if(data){
            data.articles.forEach((e,index) => {
                e.id = `${category}-${index + 1}`;
            }) 
            const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content);
            const totalPages = parseInt(data.totalResults / 20);
            for(let i = totalPages + 1;i <= 10;i++){
                document.querySelector(`#page-${i}`).style.display = "none";
            }
            if(page > totalPages){
                document.querySelector('#page-1').click();
            }
            for(let i = 1;i <= 20;i++){
                article = articles[i-1];
                if(document.querySelector(`#story-item-${i} .loader`)){
                    document.querySelector(`#story-item-${i} .loader`).style.display = "none";
                }
                document.querySelector(`#story-item-${i}`).innerHTML = '';
                document.querySelector(`#story-item-${i}`).appendChild(createCard(article,`${category}-${i}`,category));
            } 
            document.querySelector('#links').style.display = navigator.onLine ? "block" : "none";
            document.querySelectorAll('.bookmark').forEach((e) => {
                e.addEventListener('click',() => {
                    const active = toggleClass(e,'active');
                    active ? addBookmark(e.id,category) : removeBookmark(e.id);
                })
            })
            const bookmarked = localStorage.getItem("bookmarked") ? JSON.parse(localStorage.getItem("bookmarked")) : [];
            if(bookmarked.length > 0){
                bookmarked.forEach((e) => {
                    const bookmark = document.getElementById(`${e.id}`);
                    if(bookmark){
                        bookmark.classList.add('active')
                        bookmark.children[0].innerText = "Remove Bookmark"
                    }
                })
            }
        }
    }
    const cachedCarouselArticles = getStories({
        cache : true,
        category
    })
    cachedCarouselArticles.then(displayCarouselArticles);
    const carouselArticles = getStories({category});
    carouselArticles.then(displayCarouselArticles);
    let currentCarouselArticle = 1;
    document.querySelector('#prevbtn').addEventListener('click',() => {
        document.querySelector(`#item-${currentCarouselArticle}`).classList.remove('active');
        currentCarouselArticle === 1 ? currentCarouselArticle = 5 : currentCarouselArticle--;
        document.querySelector(`#item-${currentCarouselArticle}`).classList.add('active');
    })
    document.querySelector('#nextbtn').addEventListener('click',() => {
        document.querySelector(`#item-${currentCarouselArticle}`).classList.remove('active');
        currentCarouselArticle === 5 ? currentCarouselArticle = 1 : currentCarouselArticle++;
        document.querySelector(`#item-${currentCarouselArticle}`).classList.add('active');
    })
    displayLatestStories({category});
    setInterval(() => {
        displayLatestStories({category})
    },600000)

    let categoryname = category.split('');
    categoryname[0] = categoryname[0].toUpperCase();
    categoryname = categoryname.join('');
    document.querySelector('title').innerText = categoryname;
    document.querySelector('#category_name').innerText = categoryname;    
    const cachedStories = page == 1 ?  getStories({
        category,
        pageSize : 30,
        cache : true,
    }) : getStories({
        category,
        pageSize : 30,
        cache : true,
        page
    });
    cachedStories.then(displayStories)
    const stories = page == 1 ? getStories({
        category,
        pageSize : 30
    }) : getStories({
        category,
        pageSize : 30,
        page
    });
    stories.then(displayStories)
}else{
    document.querySelector('.nav-brand a').click();
}

// Code for responsive navbar
window.addEventListener('resize',(e) => {    
    if(window.innerWidth > 700){
        document.querySelector('nav').classList.remove('active');
    }
})
let display = 0;
document.querySelector('#navsmallbtn').addEventListener('click', () => {
    if(display){
        document.querySelector('nav').classList.remove('active');
        display--;
    }else{
        document.querySelector('nav').classList.add('active');
        display++;
    }
})
