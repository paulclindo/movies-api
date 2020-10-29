const MoviesServices = require('../services/movies');
const express = require('express');
MoviesServices;

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesService = new MoviesServices();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });
  router.get('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const movie = await moviesService.getMovie(movieId);
      res.status(200).json({
        data: movie,
        message: 'movie retrieved',
      });
    } catch (error) {
      next(error);
    }
  });
  router.post('/', async function (req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie,
      });
      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated',
      });
    } catch (error) {
      next(error);
    }
  });
  router.delete('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({
        data: deleteMovieId,
        message: 'movie deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = moviesApi;
