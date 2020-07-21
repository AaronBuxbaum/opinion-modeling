import { schema } from 'nexus';

schema.queryType({
  definition(t) {
    t.crud.user();
  }
});

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.email();

    t.boolean('isLongName', (user) => {
      const length: number = user.name?.length ?? 0
      return length > 5
    })
  },
});
