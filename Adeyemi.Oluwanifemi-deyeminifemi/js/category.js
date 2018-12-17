
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
    const carouselArticles = getStories({category});
    let currentCarArticle = 1;
    const articles = localStorage.getItem(`carousel-${category}`) ? JSON.parse(localStorage.getItem(`carousel-${category}`)) : {};
    if(Object.keys(articles).length){
        for(let i = 1;i <= 5;i++){
            document.querySelector('#carousel').appendChild(createCarouselItem(articles[i],i))
        }    
    }
    carouselArticles.then((data) => {
        for(let i = 1;i <= 5;i++){
            if(document.querySelector(`#carousel #item-${i}`)){
                document.querySelector(`#carousel #item-${i}`).remove()
            }
        }
        let articles;
        if(data){
            articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content);
            localStorage.setItem(`carousel-${category}`,JSON.stringify(articles))
        }else{
            articles = localStorage.getItem(`carousel-${category}`) ? JSON.parse(localStorage.getItem(`carousel-${category}`)) : {};
            if(!(Object.keys(articles).length)){
                document.querySelector("#top-wrap").remove();
                document.querySelector("div.error").innerHTML += " and there is no saved carousel news please go online to access news"
                document.querySelector("div.error").style.display = "block";
                return;
            }
        }
        
        for(let i = 1;i <= 5;i++){
            document.querySelector('#carousel').appendChild(createCarouselItem(articles[i],i))
        }
    })
    document.querySelector('#prevbtn').addEventListener('click',() => {
        document.querySelector(`#item-${currentCarArticle}`).classList.remove('active');
        currentCarArticle === 1 ? currentCarArticle = 5 : currentCarArticle--;
        document.querySelector(`#item-${currentCarArticle}`).classList.add('active');
    })
    document.querySelector('#nextbtn').addEventListener('click',() => {
        document.querySelector(`#item-${currentCarArticle}`).classList.remove('active');
        currentCarArticle === 5 ? currentCarArticle = 1 : currentCarArticle++;
        document.querySelector(`#item-${currentCarArticle}`).classList.add('active');
    })
    displayLatestStories(category);
    setInterval(() => {
        displayLatestStories(category)
    },600000)

    let categoryname = category.split('');
    categoryname[0] = categoryname[0].toUpperCase();
    categoryname = categoryname.join('');
    document.querySelector('title').innerText = categoryname;
    document.querySelector('#category_name').innerText = categoryname;    
    const stories = page == 1 ? getStories({
        category,
        pageSize : 30
    }) : getStories({
        category,
        pageSize : 30,
        page
    });
    stories.then((data) => {
        let articles;
        if(data){
            data.articles.forEach((e,index) => {
                e.id = `${category}-${index + 1}`;
            })
            localStorage.setItem(`${category}-news`,JSON.stringify(data))
        }else{
            if(page > 1 || page < 0){
                location.assign(`category.html?s=${category}`)
            }
            document.querySelector('div.error').style.display = "block";
            setInterval(() => {
                if(navigator.onLine){
                    location.reload();
                };
            },600000)
            data = localStorage.getItem(`${category}-news`) ? JSON.parse(localStorage.getItem(`${category}-news`)) : {};
            if(!(Object.keys(data).length)){
                document.querySelector("#stories").remove();
                if(!(document.querySelector("div.error").innerText.includes('and there is no'))){
                    document.querySelector("div.error").innerHTML += " and there is no saved news please go online to access news"
                }else{
                    document.querySelector("div.error").innerHTML += "<br>There is no saved news either"
                }
                return;
            }
        } 
        articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content);
        const totalPages = parseInt(data.totalResults / 20);
        for(let i = totalPages + 1;i <= 10;i++){
            document.querySelector(`#page-${i}`).style.display = "none";
        }
        if(page > totalPages){
            document.querySelector('#page-1').click();
        }
        for(let i = 1;i <= 20;i++){
            article = articles[i-1];
            document.querySelector(`#story-item-${i} .loader`).style.display = "none";
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
                if(document.querySelector(`#${e.id}`)){
                    document.querySelector(`#${e.id}`).classList.add('active')
                }
            })
        }
    })
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
