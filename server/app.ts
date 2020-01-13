import express = require('express');
import { createConnection } from 'typeorm';
import { seedDatabase } from './fixtures/seed';
import 'reflect-metadata';

createConnection().then(async (connection: any) => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Seeding database...');
    return seedDatabase(connection);
  }
  const config = require('./config/config.js');
  const bodyparser = require('body-parser');
  const cors = require('cors');

  const app = express();
  app.use(bodyparser.json());
  app.use(cors());

  require('./routes')(app);
  app.listen(config.port);
  console.log(`Server listening on port ${config.port}`);
});
