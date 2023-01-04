// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, Author } = initSchema(schema);

export {
  Post,
  Author
};