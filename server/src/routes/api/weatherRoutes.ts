import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const data = await fetch({`${process.env.API_BASE_URL}?key=${process.env.API_KEY}`});  // Ian helped me with this - make sure you understand
  // TODO: GET weather data from city name
  // TODO: save city to search history
  res.json(data);
  
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
