const supertest = require('supertest')
const app = require('../app')
const sampleRequest = require('../request.json')
const sampleResponse = require('../response.json')


describe('Testing the /v1/results API', () => {
  it("tests the route '/' and return true for status 200", async() => {
    
    const response  = await supertest(app).get('/')
    expect(response.status).toBe(200)  
  })

  it("tests to get '/v1/results' and check if response has message property", async() => {
    const response  = await supertest(app).get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("This is a rest api to render json response")
    expect(response.body).toHaveProperty('message');
  })

  it("tests the post route '/v1/results' and filter out the data which has drm: true and episodeCount>0", async() => {
    const response  = await supertest(app).post('/v1/results').send(sampleRequest)
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(sampleResponse)
    expect(response.body).toHaveProperty('response');
  })

  it("tests the bad request to post route '/v1/results' and return true for status 400", async() => {
    // send bad request for example : empty string
    const response  = await supertest(app).post('/v1/results').send("")
    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Could not decode request: JSON parsing fail")
    expect(response.body).toHaveProperty('error');
  })


})
