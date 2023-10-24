// Load test-specific environment variables\
require("dotenv").config();
const testCases = require("./testcases");

const request = require("supertest");
const { app, server } = require("../index");

describe("POST Request", () => {
  testCases.forEach((testCase) => {
    it(testCase.description, async () => {
      const response = await request(app)
        .post("/v1/signup")
        .send(testCase.requestBody);

      expect(response.status).toBe(testCase.expectedStatusCode);

      expect(response.body).toStrictEqual(testCase.expectedResponseBody);
    });
  });
  it("should return a 200 status code for the /v1/ endpoint", async () => {
    const body = {
      firstName: "dfdfd",
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
    };
    const response = await request(app)
      .post("/v1/signup")
      .send(body)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe(body.firstName);
  });

  it("should return a 409 status code user already exists", async () => {
    const body = {
      firstName: "dfdfd",
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
    };
    const response = await request(app)
      .post("/v1/signup")
      .send(body)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "This account already exists. Please try a different email"
    );
  });

  afterAll((done) => {
    // Close the server after all tests have finished
    server.close(done);
  });
});
