const supertest = require('supertest')
const app = require('./server')
const request = supertest(app)

describe('User Endpoints', () => {

    it('Post /user/login should login user', async () => {
      const res = await request.post('/users/login').send({
        username: 'jason',
        password: 'tester'
      });
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('token')
    });

    it('Post /user/register should register user', async () => {
        const res = await request.post('/users/register').send({
            username: "Adede1",
            phoneNumber: "0714029924",
            password: "tester"
        
        });
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('id')
      });
  
  });

  describe('Driver Endpoints', () => {

    it('Post /drivers/register should register driver', async () => {
      const res = await request.post('/drivers/register').send({
        username: "Ndugu12",
        phoneNumber: "0713034023"
      });
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('id')
    });

    it('Post /drivers/login should login driver', async () => {
        const res = await request.post('/drivers/login').send({
            username: "Issac",
            password: "tester"
        
        });
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('token')
      });

    it('Get /drivers/:id should show driver by id', async () => {
        const res = await request.get('/drivers/63c822ae2d79559dc3573406')
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('id')
    });

    it('Post /drivers/driver/:id/suspend should suspend driver by id', async () => {
        const res = await request.post('/drivers/driver/63c822ae2d79559dc3573406/suspend')
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('id')
    });

    it('Delete /drivers/driver/:id/suspend should remove suspension of driver by id', async () => {
        const res = await request.delete('/drivers/driver/63c822ae2d79559dc3573406/suspend')
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('message')
    });
  
  });

  describe('Ride Endpoints', () => {

    it('Post /rides/ride/:passengerid/:driverid should start a ride', async () => {
      const res = await request.post('/rides/ride/63c7bb40f335106431c40b34/63c852c9639f2211f3468ccf')
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('id')
    });

    it('Post /rides/:rideid/stop should stop a ride', async () => {
        const res = await request.post('/rides/63c8250acc1253c29ebe8d66/stop')
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
          expect(res.body).toHaveProperty('id')
    });

    it('Getr /rides/ride/ongoing should fetch all ongoing rides', async () => {
        const res = await request.get('/rides/ride/ongoing')
          expect(res.status).toEqual(200);
          expect(res.type).toEqual(expect.stringContaining('json'));
    });
  });

