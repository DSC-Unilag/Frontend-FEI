
const getStories = async (args,type = "top") => {
    let request;
    if(args.category){
        request = `https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c&category=${args.category}&pageSize=${args.pageSize}&country=us&page=${args.page}`;
    }else{
        request = type === "top" ? 'https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c' : 'https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c';
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
    const response = await fetch(request);
    return await response.json();
}

const createCarouselItem = (article,articleNum) => {
    const item = document.createElement('div');
    item.classList.add('item');
    if(articleNum === 1){
        item.classList.add('active');
    }
    item.id = `item-${articleNum}`;
    const image = document.createElement('img');
    image.src = article.urlToImage;
    const itemInfo = document.createElement('div');
    itemInfo.classList.add('iteminfo');
    const link = document.createElement('a');
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
    try{
        if(category){
            latestStories = await getlastestStories(category);
        }else{
            latestStories = await getlastestStories();
        }   
    }catch{
        const latestStories = news['latest'];
        
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
const createCard = (data) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = data.urlToImage;
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
    const contentArr = data.content.split(' ');
    const content = contentArr.splice(0,10).join(" ");
    desc.innerText = content + '...';
    span.appendChild(title)
    span.appendChild(desc)
    card.appendChild(imgdiv);
    card.appendChild(span)
    card.innerHTML += `<button><a href= '${data.url}'>Read more</a></button>`
    return card;    
}

const fillBlock = (data,block,numOfArticles = 4,mode = 1) => {
    if(mode){   
        const news = localStorage.getItem("news") ?  JSON.parse(localStorage.getItem("news")) : {};
        news[block] = data;
        localStorage.setItem("news",JSON.stringify(news));  
    }  
    const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content)
    let created = 0;
    for(let i = 0;created < numOfArticles && i < data.totalResults;i++){
        const article = articles[created];
        if(article.title && article.url && article.urlToImage && article.content){
            document.querySelector(`#${block}-card-${created+1} .loader`).style.display = "none";
            document.querySelector(`#${block}-card-${created+1}`).appendChild(mode ? createCard(article) : createOfflineCard(article));
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
const createOfflineCard = (data,page = "index") => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = page === "index" ?  "images/default.jpg" : "../images/default.jpg";
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
    const contentArr = data.content.split(' ');
    const content = contentArr.splice(0,10).join(" ");
    desc.innerText = content + '...';
    span.appendChild(title)
    span.appendChild(desc)
    card.appendChild(imgdiv);
    card.appendChild(span)
    card.innerHTML += `<button><a href= '${data.url}'>Read more</a></button>`
    return card;    
}
