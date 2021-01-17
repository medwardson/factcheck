/*global chrome*/
import "./App.css";
import axios from 'axios';
import React, {useState} from 'react';
import { getTweetByID } from "./server/twitter.js"; 

function App() {

  let tweetIDTest = '1350246702989549570'
  const [verifiedClaims, setVerifiedClaims] = useState([]); //mesha u can use this array of claims to render their urls on screen!
  const [percentTrue, setPercentTrue] = useState(0);
  const [percentFalse, setPercentFalse] = useState(0);

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

  const getFactData = (query) => {
    console.log(`Making API call to:\n\nhttps://factchecktools.googleapis.com/v1alpha1/claims:search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&query=trump did 9/11`)
    axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&languageCode=en-US&query=${query}`).
      then((data) => {
        console.log('data: ', data);
        console.log('claims: ', data.data.claims);
        var trueCount = 0;
        var falseCount = 0;
        var totalSourceCount = 0;
        var returnedClaims = (data.data.claims);
        var relevantClaims = []; //stores only False or True claims

        if (returnedClaims.length != 0) { //grab only False or True-rated claims if array is populated
          returnedClaims.forEach((arrayItem) => {
            if (arrayItem.claimReview[0].textualRating == ("False") || arrayItem.claimReview[0].textualRating == ("True")) {
              relevantClaims.push(arrayItem.claimReview[0]);
              setVerifiedClaims(verifiedClaims => [...verifiedClaims, arrayItem.claimReview[0]]);
            }
          });

          relevantClaims.forEach((claim) => { //go through filtered claims and return textualRating Website
            if (claim.textualRating == "True") {
              trueCount+= 1;
            } else if (claim.textualRating == "False") {
              falseCount+= 1;
            }
            console.log("URL: " + claim.url + "  Rating: " + claim.textualRating); //print true/false and website
          });

          totalSourceCount = trueCount + falseCount;
          setPercentTrue(trueCount/totalSourceCount * 100);
          setPercentFalse(falseCount/totalSourceCount * 100);
          console.log("Based on " + totalSourceCount + " sources, this claim is " + trueCount + " true " + falseCount + " false.");
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
        <button onClick={getUrl}>Verify Tweet</button>
        
        <button onClick={getFactData} variant="primary">Get Data</button>
        
        <text>True percent: {percentTrue}</text>
        <text>False percent: {percentFalse}</text>
        <text>length of verified claims array: {verifiedClaims.length}</text>
    </div>
  );
}

export default App;
