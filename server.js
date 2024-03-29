const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const cors = require('cors');

const bearer = 'AAAAAAAAAAAAAAAAAAAAACxdLwEAAAAAMCd47gyu2r7pQ6EboheLNzED2o0%3DhToZZoq0JAJ3khR0reVFaxkmAk9EgCv9yZIFvANz0AUfzZ3LWR'

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/factCheck', async (req, res) => {
  return await axios.get(`https://api.twitter.com/2/tweets/${req.query.tweetID}`, {
    headers:{
      'Authorization': `Bearer ${bearer}`
    }
  })
  .then(response => {
      console.log('success: ', response.data);
      return res.status(200).json({data: response.data})
  }).catch(error => {
    console.log('error : ', error)
    return res.status(404).json({data: 'failure'})
  })
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})