![opinion-modeling](https://github.com/AaronBuxbaum/opinion-modeling/workflows/Run%20tests/badge.svg?branch=master)

To use:
  1. Set up `prisma/.env` with a `DATABASE_URL` that points to a running Postgres instance.
    * To run a local database: `docker run --detach --publish 5433:5432 -e POSTGRES_PASSWORD=postgres --name postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=myapp postgres:latest`
  2. Run the server
    * Development: `yarn dev`
    * Production: `yarn build && yarn start`

There are two main pieces of this:
  * Prisma: This is effectively the "ORM". It uses a schema to build a model that we then use to interact with the database.
  * Nexus: This is the GraphQL server. It generates the GraphQL schema, resolvers, and server.

To make changes:
  * If the change does not require a database change, simply update the files under `api/graphql`.
  * If the change requires a database change...
    1. Update the Prisma schema (`prisma/schema.prisma`)
    2. Run the migration (`yarn migrate`)
    3. Make sure that the migration looks good, and if not, make any necessary adjustments.
    4. Commit the migration (`yarn migrate:up`)
