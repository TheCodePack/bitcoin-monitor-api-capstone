'use strict';

const apiKey = "6738fe19faf24362b2143d0ef9ec4f59";

const searchURL = 'https://newsapi.org/v2/everything';

// create string array from params object and join to create the query string in the url
function formatArticleParam (params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
};

// displays articles in the DOM
function displayArticles (responseJson, resultsLimit) {
    
    console.log(responseJson);
    $('#news-cont').empty();

    for (let i=0; i < responseJson.articles.length & i < resultsLimit; i++) {
        $('#news-cont').append(
            `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
            <p>${responseJson.articles[i].source.name}</p>
            <p>By ${responseJson.articles[i].author}</p>
            <p>${responseJson.articles[i].description}</p>
            <img src='${responseJson.articles[i].urlToImage}'>
            </li>` 
        )};
        
        $('#news-cont').removeClass('hidden');
}

// fetch json data from the news API using API key and parameters 
function getArticles(query, resultsLimit=5) {
    const params = {
        q: query,
        language: "en"
    };
    const queryString = formatArticleParam(params)
    const url = searchURL + '?' + queryString;

    const options = {
        headers: new Headers({
            "X-API-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayArticles
        (responseJson,resultsLimit))
        .catch(err => {
            $('js-error-message').text(`Something went wrong: ${err.message}`);
        });
};

// Watch for newsfeed refresh
function watchNewsForm () {
    $('#news-button').click(event => {
        event.preventDefault();
        const newsFeedTerm = 'Bitcoin';
        const resultsLimit = 5;
        getArticles(newsFeedTerm, resultsLimit);
    });
};

$(watchNewsForm);