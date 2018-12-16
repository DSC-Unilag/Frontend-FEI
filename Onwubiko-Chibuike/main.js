let url = 'https://newsapi.org/v2/top-headlines?' +
            'country=ng&category=sports&'+
            'apiKey=7293043e37d649e28cd3848e276a7d3e';
let req = new Request(url);

let input = document.querySelectorAll('.news');
let image = document.querySelectorAll('img');

function validateAndReturnResponse(res) {
    if(!res.ok) {
        throw error(res.statusText);
    }
    return res.json();
}

function displayOutput(output) {
    for (let i = 0; i < input.length; i++) {
        input[i].textContent = output.articles[i].title;
        input[i].href = output.articles[i].url;
        image[i].src = output.articles[i].urlToImage;
        console.log(output.articles[i]);
    }
}

function catchError(error) {
    console.log('looks like there was a problem: \n' + error );
}

function makeRequest(req) {
    fetch(req)
    .then(validateAndReturnResponse)
    .then(displayOutput)
    .catch(catchError)
}

makeRequest(req);

/*
fetch(req)
.then(function (res) {
    if(!res.ok) {
        throw error(res.statusText);            
    }
    return res.json();
})
.then(function(output) {
    for (let i = 0; i < input.length; i++) {
        input[i].textContent = output.articles[i].title;
        input[i].href = output.articles[i].url;
        image[i].src = output.articles[i].urlToImage;
        //console.log(output.articles[i]);
    }
})
.catch(function(error) {
    console.log('looks like there was a problem: \n' + error );
});
*/

