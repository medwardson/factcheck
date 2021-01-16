import axios from "axios";

const bearer = 'AAAAAAAAAAAAAAAAAAAAACxdLwEAAAAAMCd47gyu2r7pQ6EboheLNzED2o0%3DhToZZoq0JAJ3khR0reVFaxkmAk9EgCv9yZIFvANz0AUfzZ3LWR'
const testid = '1350477569968144384'

export const main = () => {
  console.log('twitter api call...');
  axios.get('https://api.twitter.com/2/tweets/1350477569968144384', {
    'Authorization': `Bearer ${bearer}`, 
  })
  .then(response => {
      console.log('success: ', response.data);
  }).catch(error => {
    console.log('error : ', error)
  })
};

// const instance = axios.create({
//   baseURL: 'https://api.twitter.com/2/tweets',
//   headers: {'Authorization': 'Bearer '+token}
// });