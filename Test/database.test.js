const mongoose = require("mongoose");

beforeAll("DB connection successful", async () => {
  await mongoose.connect(process.env.mongoDB);
});

describe("Database Connection", () => {
  test("Insert data in DB", () => {});
});
