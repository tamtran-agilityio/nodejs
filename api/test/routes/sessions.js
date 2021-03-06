describe('Routes: Token', () => {
  const Users = app.db.models.Users;

  describe('POST /login', () => {
    beforeEach(done => {
      Users
        .destroy({where: {}})
        .then(() => Users.create({
          name: 'test',
          email: 'test@mail.net',
          password: '12345'
        }))
        .then(() => done());
    });

    describe('status 200', () => {
      it('return authenticated user token', done => {
        request.post('/login')
          .send({
            email: 'test@mail.net',
            password: '12345'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token');
            done(err);
          });
      });
    });

    describe('status 401', () => {
      it('throws error when password is incorrect', done => {
        request.post('/login')
          .send({
            email: 'test@mail.net',
            password: 'WRONG_PASSWORD'
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throws error when email not exist', done => {
        request.post('/login')
          .send({
            email: 'wrong@gmail.net',
            password: '12345'
          })
          .expect(401)
          .end((error, res) => {
            done(error);
          });
      });
      it('throws error when email and password are blank', done => {
        request.post('/login')
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
