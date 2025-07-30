const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Shows new quote
function newQuoteGenarator() {
  loading();
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quote from API

async function getQuotes() {
  loading();
  try {
    const response = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );
    apiQuotes = await response.json();
    newQuoteGenarator();
  } catch (error) {
    // Catch error here
    console.log(error);
  }
}

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

// On Load
getQuotes();

newQuoteButton.addEventListener("click", newQuoteGenarator);
twitterBtn.addEventListener("click", tweetQuote);
