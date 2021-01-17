const axios = require('axios');

export const getFactData = (query) => {
    axios.get(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${process.env.REACT_APP_GOOGLE_API_KEY}&query=${query}`).
    then((data)=>{
      console.log('claims: ', data.data.claims);
    }).catch((e) => {
      console.log('BIG F WE GOT ANOTHER ERROR: ', e);
    });
  }