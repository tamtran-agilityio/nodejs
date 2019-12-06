import https from 'https';
import fs from 'fs';

module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('localhost.key', 'utf8'),
      cert: fs.readFileSync('localhost.cert', 'utf8')
    }
    app.db.sequelize.sync().done(() => {
      if (process.env.NODE_ENV === 'development') {
        app.listen(app.get("port"), () => {
          console.log(`NTask API - Port ${app.get("port")}`);
        });
      } else {
        https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          console.log(`NTask API - Port ${app.get('port')}`);
        });
      }
    });
  };
};
