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
