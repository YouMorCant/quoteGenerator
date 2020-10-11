//declare constants for dynamic elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
//const btnContainer = document.getElementById('btn-Container');

//declare error counter
//var errorCounter = 0;

// Loader
function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// Hide loader
function hideLoadingSpinner(){
    if (!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}


//Get quote from API
async function getQuote(){
    showLoadingSpinner();
    //declare proxy URL
    const proxyURL = 'https://desolate-cove-30959.herokuapp.com/';
    //api url declared as constant
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        
        //If there isn't an author it is labelled unknown
        if (data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        
        //reduce font size for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        // Stop Loading, display quote
        hideLoadingSpinner(); 
    } catch (error) {
        //count errors up to ten, show error message
        //errorCounter = errorCounter + 1;
        
        ////if(error<10){
        //getQuote();
        //}else{
            //hide other elements show error
            //loader.hidden=true;
            //authorText.hidden=true;
            //quoteContainer.hidden=false;
            //quoteText.innerText= 'Whoops, something went wrong! Please try again later';

        //}

        getQuote();
    }

}

//Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();