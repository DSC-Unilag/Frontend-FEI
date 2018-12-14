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
let display = 0;
let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&q=${searchQuery}&language=en`;
request += page !== 1 ? `&page=${page}` : page;
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
    }else{
        document.querySelector('#loader').style.display = "none";        
        document.querySelector('#errors').style.display = "block";        
        document.querySelector('#errors').innerHTML = data ?  "There were no results related to your search" : "You seem to be offline. Please connect to the internet and try again";
    }
}

search(request).then(processData)



document.querySelector('#filter select').addEventListener('change',(e) => {
    document.querySelector('#loader').style.display = "block";
    document.querySelector('#errors').style.display = "none";
    document.querySelector('#results').style.display = "none";
    document.querySelector('#links').style.display = "none";
    document.querySelector('#results').innerHTML = '';
    search(request,{sortBy : e.target.value}).then(processData)
})

document.querySelector('#search-lg button').addEventListener('click',(e) => {
    document.querySelector('#loader').style.display = "block";
    document.querySelector('#errors').style.display = "none";    
    document.querySelector('#results').style.display = "none";
    document.querySelector('#links').style.display = "none";
    document.querySelector('#results').innerHTML = '';
    searchQuery = document.querySelector('#search-lg input').value
    request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&q=${searchQuery}&language=en`;
    search(request).then(processData)
})


// Code for responsive navbar
window.addEventListener('resize',(e) => {    
    if(window.innerWidth > 700){
        document.querySelector('nav').classList.remove('active');
    }
})

document.querySelector('#navsmallbtn').addEventListener('click', () => {
    if(display){
        document.querySelector('nav').classList.remove('active');
        display--;
    }else{
        document.querySelector('nav').classList.add('active');
        display++;
    }
})
