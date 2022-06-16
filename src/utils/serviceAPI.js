import axios from 'axios';

const KEY = '22773171-6fe03cddc33c3049d7faab277';

export const getImagesApi = async ({ query, page = 1, perPage = 12 }) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  );
  return response.data;
};
