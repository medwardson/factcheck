/*global chrome*/
import "./App.css";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import newspaper from "./newspaper.png"
import { getTweetByID } from "./server/twitter.js"; 
import ProgressBar from '@ramonak/react-progress-bar';

function App() {

  let tweetIDTest = '1350246702989549570'
  const [verifiedClaims, setVerifiedClaims] = useState([]); //mesha u can use this array of claims to render their urls on screen!
  const [percentTrue, setPercentTrue] = useState(0);
  const [percentFalse, setPercentFalse] = useState(0);
  const [tweetData, setTweetData] = useState('');

  useEffect(() => {
    getUrl();
  }, []);

  const getUrl = () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      let claims = [];
      let tweetID = '';
      let tweetData = '';
      let url = tabs[0].url;

      if(url.includes('status')){
        tweetID = url.slice(url.length - 19)
        
        tweetData = await getTweetByID(tweetID); // doop
        setTweetData(tweetData.text);
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
          });

          totalSourceCount = trueCount + falseCount;
          setPercentTrue(trueCount/totalSourceCount * 100);
          setPercentFalse(falseCount/totalSourceCount * 100);
          console.log("Based on " + totalSourceCount + " sources, this claim is " + trueCount + " true " + falseCount + " false.");
          console.log('percent true: ', trueCount/totalSourceCount * 100, 'percent false: ', falseCount/totalSourceCount * 100)
        } else { //no claims in array
          console.log("We couldn't find any results, sorry about that");
        }

      }).catch((e) => {
        console.log('BIG F WE GOT ANOTHER ERROR: ', e);
      });
  }

  return (
    <div className="App">
      <div className="topHalf">
        <div className="title">Fact Checker</div>
        <div className="false-info">False Information Detected in this tweet</div>
        <div className="progress-bars">
          <div className="single-progress-bar">True</div>
          <ProgressBar width={'85%'} height={'15px'} completed={percentTrue} bgcolor={'#5DB075'} labelColor={'#000000'} margin={'2px'}/>

          <div className="single-progress-bar">False</div>
          <ProgressBar width={'85%'} height={'15px'} completed={percentFalse} bgcolor={'#F38016'} labelColor={'#000000'} margin={'2px'}/>
        </div>
      </div>
      <div className="line">--------------------------------------</div>
      <div className="topHalf">
        <div className="row-newspaper">
          <img src={newspaper} className='newspaper'/>
          Top Result
        </div>
        
        <div className="row-profile">
          <div className="profile">
            S
          </div>
          <div className="column-profile">
            <div className="row-mini">Result: {percentTrue >= percentFalse ? <div className="true">True</div> : <div className="false">False</div>}</div>
            <div className="claim">Claim: {tweetData}</div>
            <div> </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
