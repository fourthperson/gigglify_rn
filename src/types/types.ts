import Realm, {ObjectSchema} from 'realm';

export class SavedJoke extends Realm.Object<SavedJoke> {
  time: string;
  category: string;
  content: string;

  static schema: ObjectSchema = {
    name: 'joke',
    properties: {
      time: 'string',
      category: 'string',
      content: 'string',
    },
  };
}

export interface Joke {
  time: string;
  content: string;
  category: string;
}
