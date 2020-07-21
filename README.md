Run database:
`docker run --detach --publish 5433:5432 -e POSTGRES_PASSWORD=postgres --name postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=myapp postgres:latest`

Build migrations:
`yarn prisma:migrate`
`yarn prisma:generate`

Start nexus server:
`yarn nexus dev`
