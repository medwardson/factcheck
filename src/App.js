/*global chrome*/
import "./App.css";
import axios from 'axios';
import React, {useState} from 'react';
import { getTweetByID } from "./server/twitter.js"; 
import { getFactData } from "./server/google.js"; 

function App() {

  const [twitterText, setTwitterText] = useState('');
  const [query, setQuery] = useState('');
  let tweetIDTest = '1350246702989549570'

  const getFacts = () => {
    
    getFactData(twitterText);
  }

  const getTweet = async () => {
    const tweetData = await getTweetByID('1350246702989549570');
    console.log('tweet contents: ', tweetData.text);
    setTwitterText(tweetData.text);
  }

  const getUrl = () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      let claims = [];
      let tweetID = '';
      let tweetData = '';
      let url = tabs[0].url;

      if(url.includes('status')){
        tweetID = url.slice(url.length - 19)
        
        tweetData = await getTweetByID(tweetID); // doop
        console.log('tweet from front end: ', tweetData.text);

        claims = await getFactData(tweetData.text);
        console.log('claims from front end: ', claims);
      }
    });
  }


  return (
    <div className="App">
        Fact Check - Hack the North 2021
        {/* <input type="text" autoFocus={true} label="query" value={query} onChange={e => setQuery(e.target.value)}/>
        <button onClick={getFacts} variant="primary">Get Data</button>
        <button onClick={getTweet}>Twitter</button> */}
        <button onClick={getUrl}>Verify Tweet</button>
    </div>
  );
}

export default App;
