module.exports = app => {
  app.db.sync().done(() => {
    app.listen(app.get('port'), () => {
      console.log(`Task API - Port ${app.get('port')}`)
    });
  });
};
