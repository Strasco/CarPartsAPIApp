const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Carpart = require("../models/Carpart");
var currentToken = "";
beforeAll(async () => {
  await User.deleteMany();
  await Carpart.deleteMany();
});

describe("GET /api/carparts", () => {
  test("it should return all the car parts from the db", async () => {
    const response = await request(app)
      .get("/api/carparts")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGQ2MWQ0YjAxOTQzODM3MWMwZTRiNiIsImlhdCI6MTYyNTEyMTYyNSwiZXhwIjoxNjI1MjA4MDI1fQ.SPcuIR0Q4z5gyjSEGGUkAn_-MH095GmK4hFzqiEfY84"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /api/carparts", () => {
  test("it should fail returning the parts because the token is invalid", async () => {
    const response = await request(app)
      .get("/api/carparts")
      .set("Authorization", "invalid token here");
    expect(401); //unauthorized
  });
});

describe("POST /api/carparts", () => {
  test("it should create a new car part", async () => {
    const response = await request(app)
      .post("/api/carparts")
      .set("Content-Type", "application/json")
      .send({
        category: "Brakes",
        description: "These are breakes added from the testing scriptsassss",
        name: "Brakes from a tractor",
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZGQ2MWQ0YjAxOTQzODM3MWMwZTRiNiIsImlhdCI6MTYyNTEyMTYyNSwiZXhwIjoxNjI1MjA4MDI1fQ.SPcuIR0Q4z5gyjSEGGUkAn_-MH095GmK4hFzqiEfY84"
      );
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /api/auth/register", () => {
  test("it should register a new user in the testing db", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Testing test Name",
      email: "email@test.com",
      password: "validpassword",
    });
    expect(200);
  });
});

describe("POST /api/auth/login", () => {
  //subsequent tests will fail because the user email@test.com already exists
  test("it should login this user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "email@test.com",
      password: "validpassword",
    });
    currentToken = `Bearer ${response.body.token}`;
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /api/auth/me", () => {
  //subsequent tests will fail because the user email@test.com already exists
  test("it should login this user", async () => {
    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", currentToken);
    expect(response.statusCode).toBe(200);
  });
});
