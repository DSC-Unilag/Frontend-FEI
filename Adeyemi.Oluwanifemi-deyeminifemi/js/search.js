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

search(request).then(processData).then((data) => {
    if(page > data){
        document.querySelector('#page-1').click();
    }
})



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
