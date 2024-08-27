import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const resp = await fetch(`${process.env.API_BASE_URL}?key=${process.env.API_KEY}`); //need to finish this url, req.body
  console.log(req.body);
  const data = res.json(resp);
  console.log(data);
  // TODO: GET weather data from city name
  // TODO: save city to search history

  return res.json({});
  
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../db/searchHistory.json')); //doesn't seem right
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const cityID = req.params.id;
  res.json();
  req.removeCity(cityID);
});

export default router;
