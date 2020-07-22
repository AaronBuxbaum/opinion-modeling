import { createTestContext } from "./__helpers";

const ctx = createTestContext();

describe("basic testing", () => {
  test("it runs tests", () => {
    expect(1 + 1).toEqual(2);
  });

  test("it runs queries against Nexus", async () => {
    const result = await ctx.client.send(`
    query {
      user(where: { email: "example@gmail.com" }) {
        email
      }
    }
  `);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "user": Object {
          "email": "example@gmail.com",
        },
      }
    `);
  });

  test("it runs queries against Prisma", async () => {
    const result = await ctx.app.db.client.user.findMany();
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 29,
          "email": "example@gmail.com",
          "id": 1,
          "name": "Aaron Buxbaum",
        },
      ]
    `);
  });
});
