let online = navigator.onLine;

if(online){
    const displayTopStories = getStories({country : "us",limit : 10})
    displayTopStories.then((data)=>fillBlock(data,"top",6));    
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
    displayLatestStories();
    setInterval(displayLatestStories,600000);
}else{
    document.querySelector('div.error').style.display = "block";
    setInterval(() => {
        if(navigator.onLine){
            location.reload();
        };
    },3000)
    const sections = ['top','politics','business','sports','tech','arts','entertainment','travel','style','health'];
    const news = localStorage.getItem("home-news") ? JSON.parse(localStorage.getItem("home-news")) : {};
    if(Object.keys(news).length){
        sections.forEach((e) => {
            fillBlock(news[e],e,e === "top" ? 6 : 4,0);
        })
    }else{
        //Wipe Stories Container and Show Error Message
    }
    displayLatestStories();
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