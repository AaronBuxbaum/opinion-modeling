/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const { Client } = require("pg");
const NodeEnvironment = require("jest-environment-node");
const { nanoid } = require("nanoid");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { PrismaClient } = require("@prisma/client");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.schema = `test_${nanoid()}`;
    this.databaseUrl = `postgres://postgres:postgres@localhost:5433/testing?schema=${this.schema}`;
    this.client = new PrismaClient();
  }

  async setup() {
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;
    await exec("npx prisma migrate up --create-db --experimental");

    await this.client.user.create({
      data: {
        location: {
          create: {
            latitude: 0,
            longitude: 0,
          },
        },
        age: 29,
        email: "example@gmail.com",
      },
    });

    return super.setup();
  }

  async teardown() {
    await this.client.disconnect();
    const client = new Client({
      connectionString: this.databaseUrl,
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;
