import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useEffect } from "react";

import useFetch from "react-fetch-hook";

const UseFetch = () => {
  const {
    data: posts,
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

  const i = Math.floor(Math.random() * 102);
  const randomQuote = posts["quotes"][i];

  // newQuote = () => console.log("hi");

  return (
    <div id="quote-box">
      <div id="text">
        <blockquote>{randomQuote.quote}</blockquote>
      </div>
      <div id="author">{randomQuote.author}</div>
      <button
        id="new-quote"
        // onClick={newQuote()}
      >
        Click for New Quote
      </button>
      <a
        href="http://twitter.com/"
        id="tweet-quote"
        target="_blank"
        rel="noreferrer"
      >
        Click to Tweet
      </a>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UseFetch />
  </React.StrictMode>
);
