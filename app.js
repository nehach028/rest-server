// Express server app to process json request 
// and return filtered json response
// Author: "Neha Chaturvedi"
// Date: 16/3/21


const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000
app.use(bodyParser.json());

app.post('/v1/results', (req, res) => {
  
  try {
    const { payload } = req.body
    const filteredData = payload && payload.filter(p => p.drm && p.episodeCount > 0)
    
    if (filteredData.length > 0) {
      const responseObj = filteredData.map(fd => {
        return {
          image: fd.image.showImage || '',
          slug: fd.slug || '',
          title: fd.title || '',
        }
      })
      res.status(200).json({
        response: responseObj,
      })
    } else {
      // if payload has dm: true && episode>0 and does not have valid image, slug, title
      // then return error response  
      res.status(400).json({
        error: 'Could not decode request: JSON parsing fail',
      });
    }
  } catch (e) {
    res.status(400).json({
      error: 'Could not decode request: JSON parsing fail',
    });
  }
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})