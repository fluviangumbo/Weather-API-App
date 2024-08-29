import { Router, type Request, type Response } from 'express';
import path from 'node:path';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const weather = await WeatherService.getWeatherForCity(req.body.cityName);
    await HistoryService.addCity(req.body.cityName);
    res.status(200).json(weather);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../db/searchHistory.json')); //doesn't seem right
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const cityID = req.params.id;
  res.json();
  await HistoryService.removeCity(cityID);
});

export default router;
