const articles = localStorage.getItem("bookmarked") ? JSON.parse(localStorage.getItem("bookmarked")) : [];
if(articles.length){
    articles.forEach((e) => {
        document.querySelector("#stories").appendChild(createCard(e))
    })
}else{
    document.querySelector('div.error').style.display = "block"
}