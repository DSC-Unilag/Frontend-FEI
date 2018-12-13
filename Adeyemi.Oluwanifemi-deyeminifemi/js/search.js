let searchQuery = location.search.split('&')[0].split('=')[1];
document.querySelector('#search-lg input').value = searchQuery;
document.querySelector('#links input').value = searchQuery;
const page = location.search.split('&')[1] ? location.search.split('&')[1].split('=')[1] : '1';
document.querySelector(`#page-${page}`).classList.add('active');
document.querySelector('#prev-page').value = page == 1 ? 1 : page - 1;
document.querySelector('#next-page').value = parseInt(page) + 1;
if(page === 10){
    document.querySelector('#next-page').style.display = "none";
}
let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&q=${searchQuery}&language=en`;
request += page !== 1 ? `&page=${page}` : page;
const search = async (request,args = {}) => {
    args.sortBy = args.sortBy ? args.sortBy : "publishedAt";
    request += `&sortBy=${args.sortBy}`;
    const reply = await fetch(request);
    const replyjson = await reply.json();
    return replyjson;
}


const processData = (data) => {
    if(data.totalResults){
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
    }else{
        document.querySelector('')
    }
}

search(request).then(processData)



document.querySelector('#filter select').addEventListener('change',(e) => {
    document.querySelector('#loader').style.display = "block";
    document.querySelector('#results').style.display = "none";
    document.querySelector('#links').style.display = "none";
    document.querySelector('#results').innerHTML = '';
    search(request,{sortBy : e.target.value}).then(processData)
})

document.querySelector('#search-lg button').addEventListener('click',(e) => {
    document.querySelector('#loader').style.display = "block";
    document.querySelector('#results').style.display = "none";
    document.querySelector('#links').style.display = "none";
    document.querySelector('#results').innerHTML = '';
    searchQuery = document.querySelector('#search-lg input').value
    request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&q=${searchQuery}&language=en`;
    search(request).then(processData)
})



