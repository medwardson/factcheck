import axios from "axios";

export const getTweetByID = (tweetID) => {
  console.log('twitter api call 200...');
  return axios.get(`http://localhost:5000/factCheck?tweetID=${tweetID}`)
  .then(response => {
      console.log('success from helper function : ', response);
      return response;
  }).catch(error => {
    console.log('error : ', error)
  })
};


