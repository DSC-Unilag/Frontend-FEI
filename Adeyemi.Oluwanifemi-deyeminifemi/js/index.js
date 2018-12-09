const getInfo = async (query) => {
    if(query){
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ng&apiKey=9ac2b559698d40bc9757fb14d7a6925c&q=${query}`);
        console.log(await response);
    }
}
getInfo("Dogs");