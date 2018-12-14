//DATE FOR HEADER//

const date = new Date();
const day = date.getDay();
const month = date.getMonth();
const datenum = date.getDate();
const year = date.getFullYear();

//date format = dayname, month, date,year
const monthArr = ["JANUARY","FEBRUARY","MARCH","APRIL",
                  "MAY","JUNE","JULY","AUGUST",
                  "SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"  
                 ];
const daysArr = ["SUNDAY","MONDAY", "TUESDAY", "WEDNESDAY", 
                 "THURSDAY","FRIDAY", "SATURDAY"
                ]                 

const fulldate = `${daysArr[day]}, ${monthArr[month]} ${datenum} , ${year}`;

document.getElementById("today").append(fulldate);

//SIDE NAV FOR MOBILE//

const sidenav = document.querySelector('.categories');
const openSidenav = document.querySelector('.toggle-categories');
const closeSidenav = document.querySelector('#close-btn');

openSidenav.addEventListener("click",function()
    {
        
       
       sidenav.style.left = "0";            
       
        
    },false);

closeSidenav.addEventListener("click", function () 
{
    console.log("close")
    sidenav.style.left = "-231px";

}, false);

window.addEventListener("resize", function () 
{

    if(window.innerWidth>760)
   { sidenav.style.left = "0";}


},false)

const categories = [...document.querySelectorAll(".categories li")];
categories.forEach( category => category.addEventListener("click",Showpage,false) );




const trending = document.querySelector(".trending");
let pageContent = document.querySelector(".pageContent");
const carousel = document.querySelector(".carousel");

function Showpage(event) 
{
    
    let category = event.target.attributes.name.value;
    console.log(category);
    carousel.style.display = "none"
    trending.style.display = "none"; 
    loader.style.display="block";
    GetCatPage(category); 
    pageContent.style.display = "block";  
}

function Hidepage() 
{
    
    carousel.style.display = "block"
    trending.style.display = "block";
    pageContent.style.display = "none";
}


// loaderSection

const loader = document.getElementById("loader");

function GetPage() 
{
    let url = 'https://newsapi.org/v2/top-headlines?' +
              'country=us&' +
              'apiKey=95b59d83c586471e8438bc6e0eb91bba';
  
    let req = new Request(url);
   
    fetch(req)
        .then(resp => resp.json())
        .then(data => 
            {
            let doc = document.createDocumentFragment();
                [...data.articles].forEach( article =>
                    {
                    let panel = document.createElement("div");                   
                    let imagediv = document.createElement("div");
                    let image = document.createElement("img");
                    let desc = document.createElement("div");
                    let link = document.createElement("a");
                  
                    panel.classList.add("panel"); 
                    imagediv.classList.add("panel-img"); 
                    desc.classList.add("panel-desc");
                    link.classList.add("read-more");

                    image.src = article["urlToImage"];
                    
                    imagediv.appendChild(image);
                    desc.innerHTML = article["title"];
                    link.href = article["url"];
                    link.target="_blank";
                    link.innerHTML = "Read More...";


                    panel.appendChild(imagediv);
                    panel.appendChild(desc)
                    panel.appendChild(link);  
                    doc.appendChild(panel)   

                    }
                    
                    )
          
            trending.append(doc);
            loader.style.display = "none";

        })
        .catch(err => 
            {
                console.log(err);
            trending.innerHTML =`<h1 class="error">Unable to retrieve news articles. Try refreshing the page<h1>`
            loader.style.display = "none";          
            })    
        
    
}






function GetCatPage(category) 
{
   

    let url = `https://newsapi.org/v2/top-headlines?country=us`+
               `&category=${category}`+
               `&apiKey=95b59d83c586471e8438bc6e0eb91bba`;    
    pageContent.innerHTML = null;
    const homebtn = document.createElement('span');
    homebtn.innerHTML = " Home &#8629;";
    homebtn.setAttribute("id", "home-btn");
    pageContent.appendChild(homebtn);
    homebtn.addEventListener("click", Hidepage, false);


    // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=95b59d83c586471e8438bc6e0eb91bba
    let req = new Request(url);

    fetch(req)
        .then(resp => resp.json())
        .then(data => {

           
            let doc = document.createDocumentFragment();
            [...data.articles].forEach(article => {
                let panel = document.createElement("div");
                let imagediv = document.createElement("div");
                let image = document.createElement("img");
                let desc = document.createElement("div");
                let link = document.createElement("a");

                panel.classList.add("panel");
                imagediv.classList.add("panel-img");
                desc.classList.add("panel-desc");
                link.classList.add("read-more");

                image.src = article["urlToImage"];

                imagediv.appendChild(image);
                desc.innerHTML = article["title"];
                link.href = article["url"];
                link.target = "_blank";
                link.innerHTML = "Read More...";


                panel.appendChild(imagediv);
                panel.appendChild(desc)
                panel.appendChild(link);
                doc.appendChild(panel)

            }

            )

            pageContent.append(doc);
            loader.style.display = "none";

        }).catch(err => {
            console.log(err);
            pageContent.innerHTML = `<h1 class="error">Unable to retrieve news articles. Try refreshing the page<h1>`
            loader.style.display = "none";
        })    

}

window.onload = GetPage;