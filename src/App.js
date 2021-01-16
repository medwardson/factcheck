import "./App.css";
import axios from 'axios';
import React, {useState} from 'react';
import { hello } from "./twitter.js";

const GOOGLE_API_KEY = 'AIzaSyDIYOa7B1fMDyEcBifamgtQvWmS4zoSTqw'

function App() {

  const [query, setQuery] = useState('');

  const getFactData = () => {
    console.log(`Making API call to:\n\nhttps://factchecktools.googleapis.com/v1alpha1/claims:search?key=${GOOGLE_API_KEY}&query=trump did 9/11`)
    axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${GOOGLE_API_KEY}&languageCode=en-US&query=${query}`).
    then((data)=>{
      console.log('data: ', data);
      console.log('claims: ', data.data.claims); 
      //store array of claims
      var claimArray = data.data.claims;
      var relevantClaims = [];

      //grab only False or True-rated claims 
      claimArray.forEach((arrayItem) => {
        if(arrayItem.claimReview[0].textualRating.includes("False") || arrayItem.claimReview[0].textualRating.includes("True")){
          //var ratingText = arrayItem.claimReview[0].textualRating;
          //console.log(arrayItem.text);
          relevantClaims.push(arrayItem.claimReview[0]);
          //console.log(arrayItem.text + arrayItem.claimReview[0].textualRating);
        }
      }); 

      //go through filtered claims and return textualRating Website
      relevantClaims.forEach((claim) => {
        console.log(claim.textualRating); //print true/false textRating
        console.log(claim.url); //print website
      })

    }).catch((e) => {
      console.log('BIG F WE GOT ANOTHER ERROR: ', e);
    });
  }

  return (
    <div className="App">
        Fact Check - Hack the North 2021
        <input type="text" autoFocus="true" label="query" value={query} onChange={e => setQuery(e.target.value)}/>
        <button onClick={getFactData} variant="primary">Get Data</button>
    </div>
  );
}

export default App;
