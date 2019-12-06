module.exports = {
  port: 3000,
  host: 'localhost',
  database: 'ntask_test',
  username: 'sqlite',
  password: 'sqlite',
  dialect: 'sqlite',
  storage: './database_test.sqlite3',
  jwtSecret: 'NTASK_TEST',
  jwtSession: {session: false}
};
