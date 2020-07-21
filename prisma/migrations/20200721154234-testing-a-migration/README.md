# Migration `20200721154234-testing-a-migration`

This migration has been generated by Aaron Buxbaum at 7/21/2020, 3:42:34 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "age" integer  NOT NULL ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200721145442-first-migration..20200721154234-testing-a-migration
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -10,5 +10,6 @@
 model User {
   id    Int     @default(autoincrement()) @id
   email String  @unique
   name  String?
+  age   Int
 }
```

