import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temp: string;
  wind: string;
  humidity: string;
  city: string;
  date: string;
  icon: string;
  iconDesc: string;

  constructor (
    temp: string,
    wind: string,
    humidity: string,
    city: string,
    date: string,
    icon: string,
    iconDesc: string
  ) {
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDesc = iconDesc;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  apiKey: string;
  cityName: string;

  constructor (
    baseURL: string,
    apiKey: string,
    cityName: string
  ) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const getCoordinates = this.buildGeocodeQuery(query);
    const location = await fetch(getCoordinates);
    return location.json(); //returns a JSON object
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]): Coordinates { //should return an object with shape lat and lon
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string { //not sure on return type
    return `${this.baseURL}/geo/1.0/direct?q=${query}&limit=3&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    return weatherQuery;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherData = await fetch(this.buildWeatherQuery(coordinates));
    return weatherData.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(res: any): Weather {
    const temp = res.list[0].main.temp;
    const wind = res.list[0].wind.speed;
    const humidity = res.list[0].main.humidity;
    const city = this.cityName;
    const date = new Date().toLocaleDateString();
    const icon = res.list[0].weather[0].icon;
    const iconDesc = res.list[0].weather[0].description;
    return {temp, wind, humidity, city, date, icon, iconDesc};
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecast = [];
    for (const day of weatherData) {
      const temp = day.main.temp;
      const wind = day.wind.speed;
      const humidity = day.main.humidity;
      const city = this.cityName;
      const date = new Date(day.dt * 1000).toLocaleString();
      const icon = day.weather[0].icon;
      const iconDesc = day.weather[0].description;
      forecast.push({temp, wind, humidity, city, date, icon, iconDesc});
    }

    return forecast;
  }

  // TODO: Complete g``etWeatherForCity method
  async getWeatherForCity(city: string) {

  }
}

export default new WeatherService();
