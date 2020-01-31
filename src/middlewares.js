const data = require('../data');

module.exports = {
  checkProjectExists(req, res, next) {
    const { id } = req.params;

    const project = data.find(e => e.id === id);

    if (!project) {
      return res.status(400).json({ error: 'Required project does not exists' });
    }

    return next();
  },
  requestCount(req, res, next) {
    console.count('Request number');

    return next();
  }
};
