import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { Weather, BaseEntity, Moisture } from './entities'

const options: Options = {
  type: 'mongo',
  entities: [Weather, BaseEntity, Moisture],
  dbName: 'weatherstation',
  highlighter: new MongoHighlighter(),
  debug: true,
};

export default options;