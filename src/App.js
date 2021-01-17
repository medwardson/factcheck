import "./App.css";
import axios from 'axios';
import React, {useState} from 'react';
import { getTweetByID } from "./server/twitter.js"; 
import { getFactData } from "./server/google.js"; 

function App() {

  const [query, setQuery] = useState('');

  const getFacts = () => {
    getFactData(query);
  }

  const getTweet = () => {
    const tweetData = getTweetByID('1349817466050887681');
    console.log('tweet from front end: ', tweetData);
  }

  return (
    <div className="App">
        Fact Check - Hack the North 2021
        <input type="text" autoFocus={true} label="query" value={query} onChange={e => setQuery(e.target.value)}/>
        <button onClick={getFacts} variant="primary">Get Data</button>
        <button onClick={getTweet}>Twitter</button>
    </div>
  );
}

export default App;
