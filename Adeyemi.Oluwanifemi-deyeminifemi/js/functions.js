const CURRENT_DYNAMIC_CACHE = 'dynamic-v9'

const toggleClass = (elem,classs) => {
    if(elem.classList.contains(classs)){
        elem.classList.remove(classs)
        return false;
    }else{
        elem.classList.add(classs)
        return true;
    }
}
const addBookmark = (id) => {
    const bookmarked = localStorage.getItem('bookmarked') ? JSON.parse(localStorage.getItem('bookmarked')) : [];
    const currentArticles = JSON.parse(localStorage.getItem('current-articles'));
    let article;
    Object.keys(currentArticles).forEach((key) => {
        const block = currentArticles[key];
        Object.keys(block).forEach((key) => {
           if(block[key].id === id){
               article = block[key];
           }
           return; 
        })
        if(article)return;
    })
    document.getElementById(id).children[0].innerText = 'Remove Bookmark';
    bookmarked.push(article);
    localStorage.setItem("bookmarked",JSON.stringify(bookmarked))
}
const removeBookmark = (id) => {
    const bookmarked = JSON.parse(localStorage.getItem('bookmarked'));
    const index = bookmarked.findIndex((e) => e.id == id)
    if(index >= 0){
        bookmarked.splice(index,1);
    }
    document.getElementById(id).children[0].innerText = 'Add Bookmark';
    localStorage.setItem("bookmarked",JSON.stringify(bookmarked))
}
const getStories = async (args) => {
    let request;
    // if(args.category){
    request = `https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c&country=us`;
    request += args.category ? `&category=${args.category}` : '';
    request += args.pageSize ? `&pageSize=${args.pageSize}` : '';
    request += args.page ? `&page=${args.page}` : '';
    // }else{
        // request = type === "top" ? 'https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c' : 'https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&sortBy=publishedAt';
        // request = args.query ? request += `&q=${args.query}` : request;
        // request = args.limit ? request += `&pageSize=${args.limit}` : request;
    // } 
    if(args.cache){
        return await caches.open(CURRENT_DYNAMIC_CACHE)
        .then((cache) => caches.match(request))
        .then((response) => response.json())
    }else{
       try{
            const response = await fetch(request);
            return await response.json();   
        }catch{
            return undefined;
        }
    }
}

const getlastestStories = async (args) => {
    const now = new Date();
    const hours = now.getMinutes() - 30 < 0 ? now.getHours() - 1 : now.getHours();
    const minutes = now.getMinutes() - 30 < 0 ? now.getMinutes() : now.getMinutes() - 30;
    const from = args.cache ? localStorage.getItem(`${args.category ? args.category : 'index'}-from`) : `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}${hours}:${minutes}:00`
    let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&language=en&from=${from}&domains=washingtontimes.com,domain=bbc.co.uk,bleacherreport.com,businessinsider.com,dailymail.co.uk,espn.com,mashable.com,mtv.com,talksport.com,techradar.com,nytimes.com&sortBy=publishedAt`;
    request += args.category ? `&query=${args.category}` : "";
    if(args.cache){
        return await caches.open(CURRENT_DYNAMIC_CACHE)
        .then((cache) => caches.match(request))
        .then((response) => response.json())
    }else{
        try{
            localStorage.setItem(`${args.category ? args.category : 'index'}-from`,from);
            const response = await fetch(request);
            return await response.json();   
        }catch{
            return undefined;
        }
    }
}
const displayLatestStories = async (args = {}) => {
    category = args.category ? args.category : undefined;
    let latestStories = await getlastestStories(args);
    if(await latestStories){
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


const createCard = (data) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = data.urlToImage;
    const publishedAt = new Date(data.publishedAt);
    img.id = data.title.split(' ').join('') + '-' + publishedAt.getTime();
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
    bookmark.id = data.url;
    bookmark.classList.add('bookmark');
    bookmark.innerHTML += "<span>Add Bookmark</span>"
    span.appendChild(title);
    span.appendChild(desc);
    card.appendChild(imgdiv);
    card.appendChild(span);
    card.appendChild(bookmark);
    card.innerHTML += `<button class = 'read-more'><a href= '${data.url}'>Read more</a></button>`
    return card;    
}

const fillBlock = (data,block,numOfArticles = 4,mode = 1) => {  
    if(data){
        const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content)
        let created = 0;
        articles.forEach((e) => {
            e.id = e.url;
        })
        const currentArticles = localStorage.getItem('current-articles') ? JSON.parse(localStorage.getItem('current-articles')) : {};
        currentArticles[block] = articles;
        localStorage.setItem('current-articles',JSON.stringify(currentArticles));
        for(let i = 0;created < numOfArticles && i < data.totalResults;i++){
            const article = articles[created];
            if(article.title && article.url && article.urlToImage && article.content){
                if(document.querySelector(`#${block}-card-${created+1} .loader`)){
                    document.querySelector(`#${block}-card-${created+1} .loader`).style.display = "none";                
                }
                const card = document.querySelector(`#${block}-card-${created+1}`);
                card.innerHTML = ''
                card.appendChild(createCard(article));
                const bookmark = document.querySelector(`#${block}-card-${created+1} .bookmark`);
                const bookmarked = localStorage.getItem('bookmarked') ? JSON.parse(localStorage.getItem('bookmarked')) : [];
                if(bookmarked.findIndex((e) => e.id === bookmark.id) !== -1){
                    bookmark.classList.add('active');
                    bookmark.children[0].innerText = "Remove Bookmark"
                }
                bookmark.addEventListener('click',() => {
                    const state = toggleClass(bookmark,'active');
                    state ? addBookmark(bookmark.id) : removeBookmark(bookmark.id);
                })
                created++;
            } 
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

const displayCarouselArticles = (data) => {
    if(data){
        for(let i = 1;i <= 5;i++){
            if(document.querySelector(`#carousel #item-${i}`)){
                document.querySelector(`#carousel #item-${i}`).remove()
            }
        }
        const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content);        
        for(let i = 1;i <= 5;i++){
            document.querySelector('#carousel').appendChild(createCarouselItem(articles[i],i))
        }
    }
}
