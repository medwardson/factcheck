import "./App.css";
import axios from 'axios';
import React, {useState} from 'react';
import { main } from "./twitter.js";

const GOOGLE_API_KEY = 'AIzaSyDIYOa7B1fMDyEcBifamgtQvWmS4zoSTqw'

function App() {

  const [query, setQuery] = useState('');

  const getFactData = () => {
    console.log(`Making API call to:\n\nhttps://factchecktools.googleapis.com/v1alpha1/claims:search?key=${GOOGLE_API_KEY}&query=trump did 9/11`)
    axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${GOOGLE_API_KEY}&query=${query}`).
    then((data)=>{
      console.log('data: ', data);
      console.log('claims: ', data.data.claims);
    }).catch((e) => {
      console.log('BIG F WE GOT ANOTHER ERROR: ', e);
    });
  }

  return (
    <div className="App">
        Fact Check - Hack the North 2021
        <input type="text" autoFocus="true" label="query" value={query} onChange={e => setQuery(e.target.value)}/>
        <button onClick={getFactData} variant="primary">Get Data</button>
        <button onClick={main}>Twitter</button>
    </div>
  );
}

export default App;
