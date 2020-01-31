const request = require('supertest');

const server = require('./server.js');

describe('server', function() {
    it('Sanity Test', function() {
        //expect(true).toBe(false);// it can fail
    })

    // POST /api/auth/register
/*    it('POST /register status success', function() {
      return request(server)
        .post('/api/auth/register')
        .send({
        	username: "testuser5",
        	password: "pass"
        })
          .then(res => {
          expect(res.status).toBe(201);
      })
    })*/
    it("POST /register status success", async () => {
      const user = {
        username: Math.random().toString(),//this is why I should be on a TEST.db3
        password: "pass"
      };

      let res = await request(server)
        .post("/api/auth/register")
        .send(user);

      expect(res.status).toBe(201);
    })

    it('POST /register no Object Status', function() {
      return request(server)
        .post('/api/auth/register')
          .then(res => {
          expect(res.status).toBe(500);
      })
    })


    // POST /api/auth/login
    it("POST /login status success", async () => {
      const user = {
        username: "testuser1",
        password: "pass"
      };

      let res = await request(server)
        .post("/api/auth/login")
        .send(user);

      expect(res.status).toBe(200);
    })

    it('POST /login no Object Status', function() {
      return request(server)
        .post('/api/auth/login')
          .then(res => {
          expect(res.status).toBe(500);
      })
    })

})
