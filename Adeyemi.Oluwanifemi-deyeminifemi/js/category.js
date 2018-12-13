const makeRequest = async (args,type = "top") => {
    let request = type === "top" ? `https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c` : "https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c";
    request += args.category ? `&category=${args.category}` : ''; 
    const respone = await fetch(request);
    return await respone.json();
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
    desc.innerText = article.description;
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

if(location.search){    
    const category = location.search.split('=')[1];
    const carouselArticles = makeRequest({category});
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
}else{
    document.querySelector('.nav-brand a').click();
}

