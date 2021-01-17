import "./App.css";
import axios from 'axios';
import React, { useState } from 'react';
import { hello } from "./twitter.js";

const GOOGLE_API_KEY = 'AIzaSyDIYOa7B1fMDyEcBifamgtQvWmS4zoSTqw'

function App() {

  const [query, setQuery] = useState('');

  const getFactData = () => {
    console.log(`Making API call to:\n\nhttps://factchecktools.googleapis.com/v1alpha1/claims:search?key=${GOOGLE_API_KEY}&query=trump did 9/11`)
    axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${GOOGLE_API_KEY}&languageCode=en-US&query=${query}`).
      then((data) => {
        console.log('data: ', data);
        console.log('claims: ', data.data.claims);
        //store array of claims
        var claimArray = data.data.claims;
        var relevantClaims = []; //stores only False or True claims
        var trueCount = 0;
        var falseCount = 0;
        var totalSourceCount = 0;

        //grab only False or True-rated claims if there are any
        if (claimArray != undefined && claimArray.length != 0) {
          claimArray.forEach((arrayItem) => {
            if (arrayItem.claimReview[0].textualRating == ("False") || arrayItem.claimReview[0].textualRating == ("True")) {
              relevantClaims.push(arrayItem.claimReview[0]);
            }
          });

          //go through filtered claims and return textualRating Website
          relevantClaims.forEach((claim) => {
            if (claim.textualRating == "True") {
              trueCount += 1;
            } else if (claim.textualRating == "False") {
              falseCount += 1;
            }
            console.log("URL: " + claim.url + "  Rating: " + claim.textualRating); //print true/false and website
            console.log("############");
          });

          totalSourceCount = trueCount + falseCount;
          console.log("Based on " + totalSourceCount + "sources, this claim is " + trueCount + "true" + falseCount + "false");
        } else { //no claims in array
          console.log("We couldn't find any results, sorry about that");
        }

      }).catch((e) => {
        console.log('BIG F WE GOT ANOTHER ERROR: ', e);
      });
  }

  return (
    <div className="App">
      Fact Check - Hack the North 2021
      <input type="text" autoFocus="true" label="query" value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={getFactData} variant="primary">Get Data</button>
    </div>
  );
}

export default App;
