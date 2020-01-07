const TWO_HOURS = 1000 * 60 * 60 * 2;

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'notanothertodo',
    user: process.env.DB_USER || 'notanothertodo',
    password: process.env.DB_PSS || 'notanothertodo',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './notanotherdb.sqlite',
    },
  },
  sess_lifetime: TWO_HOURS,
};
