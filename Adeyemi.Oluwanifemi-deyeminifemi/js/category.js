const getStories = async (category,pageSize = 20,page = 1) => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c&category=${category}&pageSize=${pageSize}&country=us&page=${page}`);
    return await response.json();
}

const getlastestStories = async (category) => {
    const now = new Date();
    let from = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const hours = now.getMinutes() - 30 < 0 ? now.getHours() - 1 : now.getHours();
    const minutes = now.getMinutes() - 30 < 0 ? now.getMinutes() : now.getMinutes() - 30;
    from += `${hours}:${minutes}:00`
    let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&language=en&from=${from}&domains=washingtontimes.com,domain=bbc.co.uk,bleacherreport.com,businessinsider.com,dailymail.co.uk,espn.com,mashable.com,mtv.com,talksport.com,techradar.com,nytimes.com&sortBy=publishedAt&query=${category}`;
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
    const title = document.createElement('h2');
    title.innerText = article.title;
    const desc = document.createElement('p');
    desc.innerHTML = article.description;
    itemInfo.appendChild(title);
    itemInfo.appendChild(desc);
    item.appendChild(image);
    item.appendChild(itemInfo)
    return item;
}

const displayLatestStories = async (category) => {
    const latestStories = await getlastestStories(category);
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
    const content = contentArr.splice(0,15).join(" ");
    desc.innerText = content + '...';
    span.appendChild(title)
    span.appendChild(desc)
    card.appendChild(imgdiv);
    card.appendChild(span)
    card.innerHTML += `<button><a href= '${data.url}'>Read more</a></button>`
    return card;    
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

    document.querySelector('category_name');
    const carouselArticles = getStories(category);
    let currentCarArticle = 1;
    carouselArticles.then((data) => {
        const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content)
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
    document.querySelector('#category_name').innerText = categoryname;    
    const stories = page == 1 ? getStories(category,30) : getStories(category,30,page);
    stories.then((data) => {
        const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content);
        const totalPages = parseInt(data.totalResults / 20);
        for(let i = totalPages + 1;i <= 10;i++){
            document.querySelector(`#page-${i}`).style.display = "none";
        }
        if(page > totalPages){
            document.querySelector('#page-1').click();
        }
        for(let i = 1;i <= 20;i++){
            article = articles[i];
            document.querySelector(`#story-item-${i} .loader`).style.display = "none";
            document.querySelector(`#story-item-${i}`).appendChild(createCard(article));
        }
        document.querySelector('#links').style.display = "block";
    })
 
}else{
    document.querySelector('.nav-brand a').click();
}

