const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// To Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// To Hide Loading
function hideLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote

function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // 
    quoteText.textContent = quote.text;
    // Check if author data is available or not
    if(!quote.author){
        author.textContent = 'Someone Like You'
    }
    else{
        authorText.textContent = quote.author;
    }
    hideLoading();
}

// Get Quote From API
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        // getQuote();
        // console.log('Whoops, No Quote!', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote();
