
// function setUp(){
//     nocanvas(); 
//     loadJSON('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', getData, 'jsonp');
// }

// function getText(){

//     fetch("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec")

function getText(){
    
    //Create XHR Object
    let xhr = new XMLHttpRequest();
    
    //OPEB -type, url/file, aync(true/false)
    xhr.open('GET', 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=90b4f30d56b84ab3bd777d722f4ac2ec', true);

    console.log('READYSTATE: ', xhr.readyState);
    
    //OPTIONAL - used for loaders (yes, loaders are optional)

    xhr.onprogress = function(){
        console.log('READYSTATE: ', xhr.readyState);
    }

    //.onload is not going to run only if it's ready that is, it is on 4

    xhr.onload = function(){
        console.log('READYSTATE: ', xhr.readyState);
        if(this.status == 200){
            // console.log(this.responseText);
            let name = JSON.parse(this.responseText);
            /*This tranforms the JSON data into a much readable form e.g 
            name - sunkanmi*/
            let output = "";
            for(let i=0; i < name.totalResults - 1; i++){
            output += 
            '<div class="tech_news">' +
            '<a href="' + name.articles[i].url + '">' +
            '<div class="tech__news__api">' +
            '<img src="' + name.articles[i].urlToImage +'" />' +
            '<ul>' +
            '<li>Author ' + name.articles[i].author + '</li>' +
            '<li>' + name.articles[i].title + '</li>' +
            '<li>' + name.articles[i].description + '</li>' +
            '<li>' + name.articles[i].publishedAt + '</li>' +
            '</ul>' +
            '</div>' +
            '</a>' +
            '</div>';
            }
            document.getElementById('other__news__2').innerHTML = output;
        } 
    }

    xhr.onerror = function() {
        console.log("Request error......");
    }

    // xhr.onreadystatechange = function(){
    //     console.log('READYSTATE: ', xhr.readyState);
    //     if(this.readyState == 4 && this.status == 200){
    //         // console.log(this.responseText);
    //     }
    // }

    // Sends request
    xhr.send();
}

getText();

    // readyState values
    // 0: request not initialized
    // 1: server connection established
    // 2: request received
    // 3: processing request
    // 4: request finished and response is ready

    // HTTP Statuses
    // 200: "Ok"
    // 403: "Forbidden"
    // 404: "Not Found" 