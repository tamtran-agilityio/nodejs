import jwt from 'jwt-simple';

describe('Routes: Users', () => {
  const Users = app.db.models.Users;
  const jwtSecret = app.libs.config.jwtSecret;

  let token;
  let fakeUser;

  beforeEach(done => {
    Users
      .destroy({where: {}})
      .then(() => Users.create({
        name: 'Test',
        email: 'test@gmail.com',
        password: '12345'
      }))
      .then(user => {
        fakeUser = user;
        token = jwt.encode({id: user.id}, jwtSecret);
        done();
      });
  });

  describe('GET /user', () => {
    describe('status 200', () => {
      it('return an authenticated user', done => {
        request.get(`/users/${fakeUser.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('Test');
            expect(res.body.email).to.eql('test@gmail.com');
            done(err);
          });
      });
    });
  });
  describe('POST /users', () => {
    describe('Status 200', () => {
      it('creates a new user', done => {
        request.post('/users')
          .send({
            name: 'Mary',
            email: 'mary@mail.net', 
            password: '12345'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('Mary');
            expect(res.body.email).to.eql('mary@mail.net');
            done(err);
          });
      });
    });
  });
  describe('DELETE /users/:id', () => {
    describe('status 204', () => {
      it('delete an authenticated user', done => {
        request.delete(`/users/${fakeUser.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(204)
          .end((error, res) => done(error));
      });
    });
  });
});
