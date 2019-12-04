import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';

module.exports = app => {
  const config = app.libs.config;
  const Users = app.db.models.Users;

  /**
   * @api {post} /token Authentication Token
   * @apiGroup Credentials
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *  {
   *     "email": "test@gmail.com",
   *     "password": "12345"
   *  }
   * @apiSuccess {String} token Token of authenticated by user
   * @apiSuccessExample {json} Success
   *  HTTP/1.1 200 OK
   *  {"token": "acb.xyx.124"}
   * @apiErrorExample {json} Authentication error
   *  HTTP/1.1 401 Unauthorized
   */
  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({where: {email: email}})
        .then(user => {
          if (bcrypt.compareSync(password, user.password)) {
            const payload = {id: user.id};
            res.json({
              token: jwt.encode(payload, config.jwtSecret)
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
};
