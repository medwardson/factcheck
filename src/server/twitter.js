import axios from "axios";

export const getTweetByID = (tweetID) => {
  console.log('twitter api call ...');
  console.log('twitter id: ', tweetID);
  return axios.get(`http://localhost:5000/factCheck?tweetID=${tweetID}`)
  .then(response => {
      return response.data.data.data;
  }).catch(error => {
    console.log('error : ', error)
  })
};


