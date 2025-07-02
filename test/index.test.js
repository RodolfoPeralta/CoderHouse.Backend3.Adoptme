const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/app.js");

const { adoptionTests } = require("./Adoptions.test.js");
const { userTests } = require("./Users.test.js");
const { petTests } = require("./Pets.test.js");

const requester = supertest(app);

userTests(expect, requester);
petTests(expect, requester);
adoptionTests(expect, requester);
