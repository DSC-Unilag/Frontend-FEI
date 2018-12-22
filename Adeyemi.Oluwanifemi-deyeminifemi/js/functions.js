if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('sw.js')
        .then((data) => {
            console.log('Service Worked Registered')
        })
        .catch((err) => {
            console.log(err)
        })
}

const getStories = async (args,type = "top") => {
    let request;
    if(args.category){
        request = `https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c&category=${args.category}&pageSize=${args.pageSize}&country=us&page=${args.page}`;
    }else{
        request = type === "top" ? 'https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c' : 'https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&sortBy=publishedAt';
        request = args.query ? request += `&q=${args.query}` : request;
        request = args.limit ? request += `&pageSize=${args.limit}` : request;
        request = args.country ? request += `&country=${args.country}` : request;
    } 
    try{
        const response = await fetch(request);
        return await response.json();   
    }catch{
        return undefined;
    }
}

const getlastestStories = async (category = "") => {
    const now = new Date();
    let from = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const hours = now.getMinutes() - 30 < 0 ? now.getHours() - 1 : now.getHours();
    const minutes = now.getMinutes() - 30 < 0 ? now.getMinutes() : now.getMinutes() - 30;
    from += `${hours}:${minutes}:00`
    let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&language=en&from=${from}&domains=washingtontimes.com,domain=bbc.co.uk,bleacherreport.com,businessinsider.com,dailymail.co.uk,espn.com,mashable.com,mtv.com,talksport.com,techradar.com,nytimes.com&sortBy=publishedAt`;
    request += category ? `&query=${category}` : "";
    try{
        const response = await fetch(request);
        return await response.json();   
    }catch{
        return undefined;
    }
}

const createCarouselItem = (article,articleNum,mode = 1) => {
    const item = document.createElement('div');
    item.classList.add('item');
    if(articleNum === 1){
        item.classList.add('active');
    }
    item.id = `item-${articleNum}`;
    const image = document.createElement('img');
    image.src = article.urlToImage;
    const publishedAt = new Date(article.publishedAt);
    image.id = 'carousel-' + article.title.split(' ').join('') + '-' + publishedAt.getTime();
    image.addEventListener("error",(e) => {
        document.getElementById(e.target.id).src = page === "index" ?  "images/default.jpg" : "../images/default.jpg";        
    })
    const itemInfo = document.createElement('div');
    itemInfo.classList.add('iteminfo');
    const link = document.createElement('a');
    link.href = article.url;
    const title = document.createElement('h2');
    title.innerText = article.title;
    const desc = document.createElement('p');
    desc.innerHTML = article.description;
    link.appendChild(title);
    link.appendChild(desc);
    itemInfo.appendChild(link);
    item.appendChild(image);
    item.appendChild(itemInfo)
    return item;
}

const displayLatestStories = async (category = "") => {
    let latestStories;
    if(category){
        latestStories = await getlastestStories(category);
    }else{
        latestStories = await getlastestStories();
    }
    if(!latestStories){
        latestStories = localStorage.getItem(`${category ? category-'latest-news' : 'home-latest-news'}`) ? JSON.parse(localStorage.getItem(`${category ? category-'news' : 'home-latest-news'}`)) : {};
        date = new Date();
        const difference = date.getTime() - latestStories.time
        if(!(Object.keys(latestStories).length && !(difference  > 30 * 60000))){
            document.querySelector('#latest-stories ul').innerHTML = '<li class = "error">You are not online you don\'t have access to latest news</li>'       
            return;
        }
    }else{
        latestStories.time = new Date().getTime();
        localStorage.setItem(`${category ? category-'latest-news' : 'home-latest-news'}`,JSON.stringify(latestStories));
    }
    document.querySelector('#latest-stories ul').innerHTML = '';
    for(let i = 0;i < latestStories.articles.length && i < 20;i++){
        const article = latestStories.articles[i];
        const li = document.createElement('li');
        const span = document.createElement('span');
        const link = document.createElement('a');
        link.href = article.url;
        span.classList.add('text-muted');
        const date = new Date(article.publishedAt);
        span.textContent = `${date.getHours() % 12}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
        link.appendChild(span);
        link.innerHTML += article.title;
        li.appendChild(link)
        document.querySelector('#latest-stories ul').appendChild(li);
    }
}
const createCard = (data,id,page = "index") => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = data.urlToImage;
    const publishedAt = new Date(data.publishedAt);
    img.id = data.title.split(' ').join('') + '-' + publishedAt.getTime();
    img.addEventListener("error",(e) => {
        document.getElementById(e.target.id).src = page === "index" ?  "images/default.jpg" : "../images/default.jpg";        
    })
    const imgdiv = document.createElement('div');
    imgdiv.classList.add('img-div');
    imgdiv.appendChild(img);
    const span = document.createElement('span');
    span.classList.add('top-story-summary');
    let title = document.createElement('p');
    title.classList.add('title')
    title.innerText = data.title;
    const desc = document.createElement('p');
    desc.classList.add('text-muted');
    const contentArr = data.content ? data.content.split(' ') : data.description.split(' ');
    const content = contentArr.splice(0,10).join(" ");
    desc.innerText = content + '...';
    const bookmark = document.createElement('button');
    bookmark.id = id;
    bookmark.classList.add('bookmark');
    bookmark.innerHTML += "<span>Bookmark</span>"
    span.appendChild(title);
    span.appendChild(desc);
    card.appendChild(imgdiv);
    card.appendChild(span);
    card.appendChild(bookmark);
    card.innerHTML += `<button class = 'read-more'><a href= '${data.url}'>Read more</a></button>`
    return card;    
}

const fillBlock = (data,block,numOfArticles = 4,mode = 1) => {
    if(mode){ 
        const news = localStorage.getItem("home-news") ?  JSON.parse(localStorage.getItem("home-news")) : {};
        news[block] = data;
        news[block].articles.forEach((e,index) => {
            e.id = `${block}-${index+1}`
        })
        localStorage.setItem("home-news",JSON.stringify(news));  
    }  
    const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content)
    let created = 0;
    for(let i = 0;created < numOfArticles && i < data.totalResults;i++){
        const article = articles[created];
        if(article.title && article.url && article.urlToImage && article.content){
            if(document.querySelector(`#${block}-card-${created+1} .loader`)){
                document.querySelector(`#${block}-card-${created+1} .loader`).style.display = "none";                
            }
            document.querySelector(`#${block}-card-${created+1}`).appendChild(createCard(article,`${block}-${created+1}`));
            created++;
        } 
    }
}
const search = async (request,args = {}) => {
    try{
        args.sortBy = args.sortBy ? args.sortBy : "publishedAt";
        request += `&sortBy=${args.sortBy}`;
        const reply = await fetch(request);
        const replyjson = await reply.json();
        return replyjson;
    }catch(err){
        return undefined;
    }
}
const processData = (data) => {
    if(data && data.totalResults){
        const totalPages = parseInt(data.totalResults / 20);
        for(let i = totalPages + 1;i <= 10;i++){
            document.querySelector(`#page-${i}`).style.display = "none";
        }   
        data.articles.forEach((elem) => {
            if(elem.title && elem.description && elem.publishedAt){
                const title = elem.title;
                const desc = elem.description;
                const date = new Date(elem.publishedAt);
                const datetxt = `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = elem.url;
                const titleElem = document.createElement('p');
                titleElem.textContent = title;
                titleElem.classList.add('title')    
                const descElem = document.createElement('p');
                descElem.textContent = desc;
                descElem.classList.add('text-muted')
                const dateElem = document.createElement('span');
                dateElem.textContent = datetxt;
                dateElem.classList.add('date')    
                link.appendChild(titleElem)
                link.appendChild(descElem)
                link.appendChild(dateElem)
                li.appendChild(link);
                document.querySelector('#results').appendChild(li)
            }
        })
        document.querySelector('#loader').style.display = "none";
        document.querySelector('#results').style.display = "block";
        document.querySelector('#links').style.display = "block";
        return totalPages;
    }else{
        document.querySelector('#loader').style.display = "none";        
        document.querySelector('#errors').style.display = "block";        
        document.querySelector('#errors').innerHTML = data ?  "There were no results related to your search" : "You seem to be offline. Please connect to the internet and try again";
    }
}
const toggleClass = (elem,classs) => {
    if(elem.classList.contains(classs)){
        elem.classList.remove(classs)
        return false;
    }else{
        elem.classList.add(classs)
        return true;
    }
}
const addBookmark = (id,page = "") => {
    const bookmarked = localStorage.getItem('bookmarked') ? JSON.parse(localStorage.getItem('bookmarked')) : [];
    const saved = JSON.parse(localStorage.getItem(`${page ? page : 'home'}-news`));
    let article;
    if(page){
        const articleIndex = saved.articles.findIndex((e) => e.id === id)
        article = saved.articles[articleIndex];
    }else{
        const part = id.split('-')[0];
        const articleIndex = saved[part].articles.findIndex((e) => e.id === id)
        article = saved[part].articles[articleIndex];
    } 
    article.id = id;
    bookmarked.push(article);
    localStorage.setItem("bookmarked",JSON.stringify(bookmarked))
}
const removeBookmark = (id) => {
    const bookmarked = JSON.parse(localStorage.getItem('bookmarked'));
    const index = bookmarked.findIndex((e) => e.id == id)
    if(index >= 0){
        bookmarked.splice(index,1);
    }
    localStorage.setItem("bookmarked",JSON.stringify(bookmarked))
}
