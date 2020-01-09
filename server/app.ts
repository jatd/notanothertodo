import express = require('express');
import { createConnection } from 'typeorm';
import 'reflect-metadata';

createConnection().then(() => {
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
