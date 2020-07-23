import { schema } from "nexus";

schema.queryType({
  definition(t) {
    t.crud.user();
    t.crud.post();
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.createOnePost();
  },
});

schema.objectType({
  name: "User",
  definition(t) {
    t.model.email();
  },
});

schema.objectType({
  name: "Post",
  definition(t) {
    t.model.url();
  },
});
