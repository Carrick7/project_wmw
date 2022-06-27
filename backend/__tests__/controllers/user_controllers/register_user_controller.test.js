const express = require('express');
const request = require('supertest');

const user_routes = require('../../../routes/user_routes');

const app = express();
app.use(express.json());
app.use("/", user_routes);

//Test the register user route
describe("Integration test for user registration", () => {

  // Registration - Failure - Missing user_name 
 it('POST /api/users - failure - should fail to create a new user', async () => {
  const {body, status} = await request(app).post("/").send({
     user_name: "",
     email: "testing@missing.input",
     password: "password"
   });
   expect(status).toBe(400);
   expect(body).toEqual({message: 'Please fill out all fields'});
   console.log("missing user name test status code " + status);
 });

});

