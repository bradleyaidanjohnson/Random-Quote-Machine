import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Component, useEffect, setState } from "react";

import useFetch from "react-fetch-hook";

const UseFetch = () => {
  const {
    data: quotes,
    isLoading,
    error,
  } = useFetch(
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  );

  // Show a loading message while data is fetching
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // Handle error
  if (error) {
    return <div className="error">Error: error fetching</div>;
  }
  let quote = quotes["quotes"][1].quote;
  let author = quotes["quotes"][1].author;

  const generateRandomQuote = () => {
    const i = Math.floor(Math.random() * 102);
    quote = quotes["quotes"][i].quote;
    author = quotes["quotes"][i].author;
    return [quote, author];
  };

  return <QuoteBox quotes={quotes} />;
};

class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = { quoteIndex: Math.floor(Math.random() * 102) };
    this.randomQuote = this.randomQuote.bind(this);
  }
  randomQuote() {
    this.setState({
      quoteIndex: Math.floor(Math.random() * 102),
    });
  }

  render() {
    const quote = this.props.quotes["quotes"][this.state.quoteIndex].quote;
    const author = this.props.quotes["quotes"][this.state.quoteIndex].author;
    const tweet = `https://twitter.com/intent/tweet?text='${quote.replaceAll(
      " ",
      "%20"
    )}'%0A%20%20-${author.replaceAll(" ", "%20")}`;
    console.log(tweet);
    return (
      <div id="quote-box">
        <div id="text">
          <blockquote>{quote}</blockquote>
        </div>
        <div id="author">{author}</div>
        <button id="new-quote" onClick={this.randomQuote}>
          Click for New Quote
        </button>
        <a
          className="twitter-share-button"
          href={tweet}
          id="tweet-quote"
          target="_blank"
          rel="noreferrer"
        >
          Click to Tweet
        </a>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UseFetch />
  </React.StrictMode>
);
