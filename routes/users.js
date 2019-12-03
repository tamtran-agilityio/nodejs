module.exports = app => {
  const Users = app.db.models.Users;

  app.get('/users/:id', (req, res) => {
    Users.findById(req.params.id, {
      attributes: ['id', 'name', 'email']
    })
    .then(result => res.json(result))
    .catch(error => {
      res.status(412).json({message: error.message});
    });
  });

  app.post('/users', (req, res) => {
    console.log('request', req.body);
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({message: error.message});
      });
  });

  app.delete('/users/:id', (req, res) => {
    Users.destroy({where: {id: req.body.id}})
      .then(result => res.json())
      .catch(error => {
        res.status(412).json({message: error.message});
      });
  });
};
