if('serviceWorker' in navigator){
    navigator.serviceWorker
        .register('sw.js')
        .then((data) => {
            console.log('Service Worked Registered')
        })
        .catch((err) => {
            console.log(err)
        })
}


const networkDataRecieved = {
    top : false,
    politics : false,
    business : false,
    sports : false,
    tech : false,
    entertainment : false,
    health : false
}
const displayTopStories = getStories({country : "us"})
displayTopStories.then((data)=> {
    if(data){
        networkDataRecieved.top = true;
    }
    fillBlock(data,"top",6);
})
const displayPolitics = getStories({category : "politics"});
displayPolitics.then((data) =>  {
    if(data){
        networkDataRecieved.politics = true;
    }
    fillBlock(data,"politics");
})
const displayBusiness = getStories({category : "business"});
displayBusiness.then((data) =>  {
    if(data){
        networkDataRecieved.business = true;
    }
    fillBlock(data,"business");
})
const displaySports = getStories({category : "sports"});
displaySports.then((data) =>  {
    if(data){
        networkDataRecieved.sports = true;
    }
    fillBlock(data,"sports");
})
const displaytech = getStories({category : "technology"});
displaytech.then((data) =>  {
    if(data){
        networkDataRecieved.tech = true;
    }
    fillBlock(data,"tech");
})
const displayentertainment = getStories({category : "entertainment"});
displayentertainment.then((data) =>  {
    if(data){
        networkDataRecieved.entertainment = true;
    }
    fillBlock(data,"entertainment");
})
const displayhealth = getStories({category : "health"});
displayhealth.then((data) =>  {
    if(data){
        networkDataRecieved.health = true;
    }
    fillBlock(data,"health");
})
displayLatestStories();
setInterval(displayLatestStories,600000);
const sections =  ["top" ,"politics" ,"business" ,"sports" ,"technology" ,"entertainment","health"]
sections.forEach((section) => {
    if(!networkDataRecieved[section]){
        if(section == "top"){
            getStories({country : "us",cache : true})
            .then((data) => {
                if(data){
                    fillBlock(data,section,6)
                }
            })
        }else{
            getStories({category : section,cache : true})
            .then((data) => {
                if(data){
                    if(section === "technology"){
                        section = "tech"
                    }
                    fillBlock(data,section)
                }
            })
        }
    }
})  
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

// document.querySelectorAll('.bookmark').forEach((e) => {
//     e.addEventListener('click',() => {
//         const active = toggleClass(e,'active');
//         active ? addBookmark(e.id) : removeBookmark(e.id);
//     })
// })