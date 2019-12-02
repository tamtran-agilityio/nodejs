module.exports = app => {
  return {
    findAll: (params, callback) => {
      return callback([
        {title: 'Fix notebook'}
      ]);
    }
  };
};
