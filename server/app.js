const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const config = require('./config/config');

const app = express();
app.use(bodyparser.json());
app.use(cors());

require('./routes')(app);

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`Server listening on port ${config.port}`);
});
