import DynamicSerializer from "dynamic-serializer";
import { createTestContext } from "./__helpers";

const ctx = createTestContext();
const dynamicSerializer = new DynamicSerializer();

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
    dynamicSerializer.toStatic(result, ["id", "createdAt"]);
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "age": 29,
          "createdAt": 1,
          "email": "example@gmail.com",
          "id": 0,
        },
      ]
    `);
  });
});
