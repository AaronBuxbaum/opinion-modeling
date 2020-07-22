import {
  createTestContext as originalCreateTestContext,
  TestContext,
} from "nexus/testing";

export function createTestContext(): TestContext {
  const ctx = {} as TestContext;

  beforeAll(async () => {
    Object.assign(ctx, await originalCreateTestContext());
    await ctx.app.start();
  });

  afterAll(async () => {
    // eslint-disable-next-line
    ; +(await ctx.app.db.client.disconnect())
    await ctx.app.stop();
  });

  return ctx;
}
