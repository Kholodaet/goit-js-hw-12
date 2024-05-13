import axios from 'axios';

const API_KEY = '43226566-fed9ea78cdf96918d4e965adc';
const URL = 'https://pixabay.com/api/';

export default async function getImagesFromApi(textForm = '', page, perPage) {
  const parameters = new URLSearchParams({
    per_page: perPage,
    page,
    key: API_KEY,
    q: textForm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const { data } = await axios.get(`${URL}?${parameters}`);

  return data;
}
