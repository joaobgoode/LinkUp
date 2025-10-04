const { DataSource } = require("typeorm");
require('dotenv').config();

const UserSchema = require("./entities/User");

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [
    UserSchema
  ],
});

module.exports = {
  AppDataSource,
};
