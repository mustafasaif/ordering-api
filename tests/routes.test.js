// Load test-specific environment variables\
require("dotenv").config();
const testCases = require("./testcases");

const request = require("supertest");
const { app, Server } = require("../index");

describe("POST Request", () => {
  // testCases.forEach((testCase) => {
  //   it(testCase.description, async () => {
  //     const response = await request(app)
  //       .post("/v1/register")
  //       .send(testCase.requestBody);

  //     expect(response.status).toBe(testCase.expectedStatusCode);

  //     expect(response.body).toStrictEqual(testCase.expectedResponseBody);
  //   });
  // });
  it("should return a 200 status code for the /v1/ endpoint", async () => {
    const body = {
      firstName: "dfdfd",
      lastName: "pual",
      email: "frdasi0@sdaswdad.com",
      password: "teddst",
      confirmPassword: "teddst",
    };
    const response = await request(app)
      .post("/v1/register")
      .send(body)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty(
      "message",
      "Post Operation completed successfully."
    );
  });

  it("should return a 409 status code user already exists", async () => {
    const body = {
      firstName: "dfdfd",
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
      confirmPassword: "teddst",
    };
    const response = await request(app)
      .post("/v1/register")
      .send(body)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty(
      "message",
      "This account already exists. Please try a different email"
    );
  });

  // it("should return a 400 status code with empty error for Last Name", async () => {
  //   const response = await request(app).post("/v1/register").send({
  //     firstName: "John",
  //     lastName: "",
  //     email: "john@example.com",
  //     password: "password123",
  //     confirmPassword: "password123",
  //   });
  //   console.log(response);

  //   expect(response.status).toBe(400);
  //   expect(response.body).toStrictEqual({
  //     success: false,
  //     message: "Validation failed",
  //     error: "Last name cannot be an empty field",
  //   });
  // });

  afterAll((done) => {
    // Close the server after all tests have finished
    Server.close(done);
  });
});
