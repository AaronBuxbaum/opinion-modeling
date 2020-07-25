import app, { server, use } from "nexus";
import { prisma } from "nexus-plugin-prisma";
import * as serverless from "serverless-http";
import "./graphql/User"; // hack to resolve https://github.com/graphql-nexus/nexus/issues/782

use(prisma({ features: { crud: true } }));

app.assemble();

export const graphql = serverless(server.handlers.graphql, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(request: any, event: any) {
    const { body } = request;
    request.context = event.requestContext;
    request.body = JSON.parse(body.toString());
    return request;
  },
});
export const playground = serverless(server.handlers.playground);
