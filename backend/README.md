To use:
  * Set up `prisma/.env` with a `DATABASE_URL` that points to a running Postgres instance.
  * Run the server
    - Development: `yarn dev`
    - Production: `yarn build && yarn start`
  * Run tests
    1. Start a local Postgres instance on port 5433: `docker run --detach --publish 5433:5432 --name postgres postgres`
    2. `yarn test`
    3. You likely won't need this, but if you need to clear the database: `docker rm -f -v postgres`

There are three pieces of the system. A GraphQL request will be handled linearly and top-down:
  * Nexus: the GraphQL server. It generates the GraphQL schema, resolvers, and server.
  * Prisma: the database toolkit (effectively, an ORM). It uses a schema to build the database schema and a model that the server uses to interact with that database.
  * Postgres: the database.

The server and Prisma will be compiled into a bundle which can be served serverlessly via `serverless.yml`.

To make changes:
  * If the change does not require a database change, simply update the files under `api/graphql`.
  * If the change requires a database change...
    1. Update the Prisma schema (`prisma/schema.prisma`)
    2. Run the migration (`yarn migrate`)
    3. Make sure that the migration looks good, and if not, make any necessary adjustments.
    4. Commit the migration (`yarn migrate:up`)
