const getStories = async (args,type = "top") => {
    let request = type === "top" ? 'https://newsapi.org/v2/top-headlines?apiKey=9ac2b559698d40bc9757fb14d7a6925c' : 'https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c';
    request = args.query ? request += `&q=${args.query}` : request;
    request = args.limit ? request += `&pageSize=${args.limit}` : request;
    request = args.country ? request += `&country=${args.country}` : request;
    const response = await fetch(request);
    return await response.json();
}

const getlastestStories = async () => {
    const now = new Date();
    let from = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const hours = now.getMinutes() - 30 < 0 ? now.getHours() - 1 : now.getHours();
    const minutes = now.getMinutes() - 30 < 0 ? now.getMinutes() : now.getMinutes() - 30;
    from += `${hours}:${minutes}:00`
    let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&language=en&from=${from}&domains=washingtontimes.com,domain=bbc.co.uk,bleacherreport.com,businessinsider.com,dailymail.co.uk,espn.com,mashable.com,mtv.com,talksport.com,techradar.com,nytimes.com&sortBy=publishedAt`;
    const response = await fetch(request);
    return await response.json();
}
const displayTopStories = getStories({country : "us",limit : 10})

displayTopStories.then((data)=>fillBlock(data,"top",6))

const displayPolitics = getStories({query : "politics"},"politics");
displayPolitics.then((data) => fillBlock(data,"politics"))
const displayBusiness = getStories({query : "business"},"business");
displayBusiness.then((data) => fillBlock(data,"business"))
const displaySports = getStories({query : "sports"},"sports");
displaySports.then((data) => fillBlock(data,"sports"))
const displaytech = getStories({query : "tech"},"tech");
displaytech.then((data) => fillBlock(data,"tech"))
const displayarts = getStories({query : "arts"},"arts");
displayarts.then((data) => fillBlock(data,"arts"))
const displayentertainment = getStories({query : "entertainment"},"entertainment");
displayentertainment.then((data) => fillBlock(data,"entertainment"))
const displaytravel = getStories({query : "travel"},"travel");
displaytravel.then((data) => fillBlock(data,"travel"))
const displaystyle = getStories({query : "style"},"style");
displaystyle.then((data) => fillBlock(data,"style"))
const displayhealth = getStories({query : "health"},"health");
displayhealth.then((data) => fillBlock(data,"health"))


const fillBlock = (data,block,numOfArticles = 4) => {
    const articles = data.articles.filter((elem) => elem.title && elem.url && elem.urlToImage && elem.content)
    let created = 0;
    for(let i = 0;created < numOfArticles && i < data.totalResults;i++){
        const article = articles[created];
        if(article.title && article.url && article.urlToImage && article.content){
            document.querySelector(`#${block}-card-${created+1} .loader`).style.display = "none";
            document.querySelector(`#${block}-card-${created+1}`).appendChild(createCard(article));
            created++;
        }
    }
}
const displayLatestStories = async () => {
    const latestStories = await getlastestStories();
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
displayLatestStories();

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