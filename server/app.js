const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const config = require('./config/config');

const app = express();
app.use(bodyparser.json());
app.use(cors());

app.use(
  session({
    name: process.env.SESS_NAME || 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET || 'supersecret',
    cookie: {
      maxAge: config.sess_lifetime,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

require('./routes')(app);

sequelize.sync().then(() => {
  app.listen(config.port);
  console.log(`Server listening on port ${config.port}`);
});
