const articles = localStorage.getItem("bookmarked") ? JSON.parse(localStorage.getItem("bookmarked")) : [];
if(articles.length){
    articles.forEach((e,index) => {
        document.querySelector("#stories").appendChild(createCard(e,e.id,"bookmarked"))
    })
}else{
    document.querySelector('div.no_bookmark').style.display = "block"
}
if(!(navigator.onLine)){
    document.querySelector('div.offline').style.display = "block";
}
// Code for responsive navbar
window.addEventListener('resize',(e) => {    
    if(window.innerWidth > 700){
        document.querySelector('nav').classList.remove('active');
    }
})
let display = 0;
document.querySelector('#navsmallbtn').addEventListener('click', () => {
    if(display){
        document.querySelector('nav').classList.remove('active');
        display--;
    }else{
        document.querySelector('nav').classList.add('active');
        display++;
    }
})
document.querySelectorAll('.bookmark').forEach((e) => {
    e.classList.add('active')
})
document.querySelectorAll('.bookmark').forEach((e) => {
    e.addEventListener('click',() => {
        const active = toggleClass(e,'active');
        active ? addBookmark(e.id) : removeBookmark(e.id);
        location.reload();
    })
})