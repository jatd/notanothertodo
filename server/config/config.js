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
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
};
