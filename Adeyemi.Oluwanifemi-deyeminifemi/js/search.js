const searchQuery = location.search.split('=')[1];
let request = `https://newsapi.org/v2/everything?apiKey=9ac2b559698d40bc9757fb14d7a6925c&q=${searchQuery}&language=en`;
const search = async (request) => {
    const reply = await fetch(request);
    const replyjson = await reply.json();
    return replyjson;
}

search(request).then((data) => {
    if(data.totalResults){
        data.articles.forEach((elem) => {
        if(elem.title && elem.description && elem.publishedAt){
            const title = elem.title;
            const desc = elem.description;
            const date = new Date(elem.publishedAt);
            const datetxt = `${date.getDay()}/${date.getMonth()}/${date.getYear()}`
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
    document.querySelector('#results    ').style.display = "block";
    }else{
        document.querySelector('')
    }
    
})


