import axios from 'axios';
import { pick, prop } from 'ramda';

type UnplashResponse = {
  color: string;
  urls: {
    regular: string;
    full: string;
  };
};

const unsplash = axios.create({
  headers: {
    Authorization: `Client-ID ${process.env.VUE_APP_UNPLASH_ACCESS_KEY}`,
  },
});

const openWeather = axios.create({
  params: {
    appid: process.env.VUE_APP_WEATHER_API_KEY,
  },
});

export const fetchBgUrl = async (): Promise<UnplashResponse> => {
  return await unsplash
    .get<UnplashResponse>('https://api.unsplash.com/photos/random', {
      params: {
        query: 'nature',
        orientation: 'landscape',
        featured: true,
      },
    })
    .then(prop('data'))
    .then(pick(['color', 'urls']));
};

export const fetchWeather = (coords: {
  latitude: number;
  longitude: number;
}) => {
  return openWeather
    .get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
      },
    })
    .then(prop('data'));
};
