const supertest = require('supertest')
const app = require('./server')
const db = require('./_helpers/database')
const request = supertest(app)

beforeAll(async () => await db.connect())
// afterEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('User Endpoints', () => {
  let token = null
  let driverId = null
  let userId = null
  let rideId = null

  // User

    it('Post /user/register should register user', async () => {
      const res = await request.post('/users/register').send({
          username: "Adede11",
          phoneNumber: "0714029924",
          password: "tester"
      
      })
      userId = res.body.id
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('id')
    });

    it('Post /user/login should login user', async () => {
      const res = await request.post('/users/login').send({
        username: 'Adede11',
        password: 'tester'
      });

      token = res.body.token

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('token')
    });

    // Drivers

    it('Post /drivers/register should register driver', async () => {
      const res = await request.post('/drivers/register').send({
        username: "Ndugu124",
        phoneNumber: "0713034023",
        password: "tester",
      });
      driverId = res.body.id
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('id')
    });

    it('Post /drivers/login should login driver', async () => {
      const res = await request.post('/drivers/login').send({
          username: "Ndugu124",
          password: "tester"
      
      });
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('token')
    });

  it('Get /drivers/:id should show driver by id', async () => {
      const res = await request.get(`/drivers/${ driverId }`).set('Authorization', 'Bearer ' + token) 
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('id')
  });

  it('Post /drivers/driver/:id/suspend should suspend driver by id', async () => {
      const res = await request.post(`/drivers/driver/${ driverId }/suspend`).set('Authorization', 'Bearer ' + token)
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('Delete /drivers/driver/:id/suspend should remove suspension of driver by id', async () => {
      const res = await request.delete(`/drivers/driver/${ driverId }/suspend`).set('Authorization', 'Bearer ' + token)
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
  });

  // Rides

  it('Post /rides/ride/:passengerid/:driverid should start a ride', async () => {
    const res = await request.post(`/rides/ride/${ userId}/${ driverId }`).set('Authorization', 'Bearer ' + token).send({
      pickupLocation:  { 
          "type": "Point", 
          "coordinates": [ 25.2239771, 51.4993224 ] 
          },
      destinationLocation: { 
          "type": "Point", 
          "coordinates": [ 25.2239771, 51.4993224 ] 
          }
  });
    rideId = res.body.user.id
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.user).toHaveProperty('id')
  });

  it('Post /rides/:rideid/stop should stop a ride', async () => {
      const res = await request.post(`/rides/${ rideId }/stop`).set('Authorization', 'Bearer ' + token)
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('id')
  });

  it('Getr /rides/ride/ongoing should fetch all ongoing rides', async () => {
      const res = await request.get('/rides/ride/ongoing').set('Authorization', 'Bearer ' + token)
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
  });

  
  });
