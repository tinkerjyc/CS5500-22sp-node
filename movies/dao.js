const model = require('./model');

const findAllMovies = () => model.find();

module.exports = {
  findAllMovies
};
