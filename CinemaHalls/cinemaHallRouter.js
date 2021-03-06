import express from 'express';
import CinemaHallController from './cinemaHallController.js';

const router = express.Router();
router.post('/', CinemaHallController.createHall);
router.get('/:id', CinemaHallController.getCinemaHallWithSeats);

export default router;
