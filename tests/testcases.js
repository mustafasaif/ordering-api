const testCases = [
  {
    description: "should return a 400 status code with missing error for email",
    requestBody: {
      firstName: "dfdfd",
      lastName: "pual",
      password: "teddst",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Email is a required field" },
  },
  {
    description:
      "should return a 400 status code with missing error for empty email",
    requestBody: {
      firstName: "dfdfd",
      lastName: "pual",
      password: "teddst",
      email: "",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Email cannot be an empty field" },
  },
  {
    description:
      "should return a 400 status code with missing error for wrong format email",
    requestBody: {
      firstName: "dfdfd",
      lastName: "pual",
      password: "teddst",
      email: "dfdfdfdffd",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Email provided is not valid" },
  },
  {
    description:
      "should return a 400 status code with missing error for wrong type email",
    requestBody: {
      firstName: "dfdfd",
      lastName: "pual",
      password: "teddst",
      email: 5,
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Email should be a type of text" },
  },
  {
    description:
      "should return a 400 status code with missing error for password",
    requestBody: {
      firstName: "dfdfd",
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Password is a required field" },
  },
  {
    description:
      "should return a 400 status code with empty error for password",
    requestBody: {
      firstName: "dfdfd",
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
      password: "",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Password cannot be an empty field" },
  },
  {
    description:
      "should return a 400 status code with missing error for First Name",
    requestBody: {
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "first name is a required field" },
  },
  {
    description:
      "should return a 400 status code with empty error for First Name",
    requestBody: {
      firstName: "",
      lastName: "pual",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "first name cannot be an empty field" },
  },
  {
    description:
      "should return a 400 status code with missing error for Last Name",
    requestBody: {
      firstName: "dfdfd",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Last name is a required field" },
  },
  {
    description:
      "should return a 400 status code with empty error for Last Name",
    requestBody: {
      lastName: "",
      firstName: "dfdfd",
      email: "fra2xnk0@sdaswdad.com",
      password: "teddst",
    },
    expectedStatusCode: 400,
    expectedResponseBody: { error: "Last name cannot be an empty field" },
  },
];

module.exports = testCases;
