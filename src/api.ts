import axios from 'axios';
import { path, pathOr } from 'ramda';

type UnplashResponse = {
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

export const fetchBgUrl = async (): Promise<string> => {
  return (
    (await unsplash
      .get<UnplashResponse>('https://api.unsplash.com/photos/random', {
        params: {
          query: 'nature',
          orientation: 'landscape',
          featured: true,
        },
      })
      .then(pathOr('', ['data', 'urls', 'full']))) ?? ''
  );
};
