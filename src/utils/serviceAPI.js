const KEY = '22773171-6fe03cddc33c3049d7faab277';
export const getImagesApi = ({ query, page = 1, perPage = 12 }) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
  )
    .then(res => res.json())
    .then(response => {
      return response.hits;
    });
};
