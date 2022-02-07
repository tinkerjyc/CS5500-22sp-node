const dao = require('./dao')

module.exports = (app) => {

    const findAllMovies = (req, res) =>
        dao.findAllMovies()
            .then(movies => res.json(movies));

    app.get("/rest/movies", findAllMovies);

}
