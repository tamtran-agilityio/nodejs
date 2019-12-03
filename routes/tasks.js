module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route('/tasks')
    .all((req, res, next) => {
      delete req.body.id;
      next();
    })
    .get((req, res) => {
      Tasks.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({message: error.message});
        });
    })
    .post((req, res) => {
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({message: error.message});
        });
    });
  app.route('/tasks/:id')
    .all((req, res, next) => {
      delete req.body.id;
      next();
    })
    .get((req, res) => {
      Tasks.findOne({ where: req.params})
        .then(result => {
          if (result) {
            res.json(result)
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({message: error.message});
        });
    })
    .put((req, res) => {
      Tasks.update(req.body, {where: res.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({message: error.message});
        });
    })
    .delete((req, res) => {
      Tasks.destroy({where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({message: error.message});
        });
    });
};
