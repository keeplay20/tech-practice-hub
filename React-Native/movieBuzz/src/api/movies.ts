const API_KEY = "";

export const popularMoviesOptions = (page = 1) => ({
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: {
    language: "en-US",
    page: page.toString(),
    api_key: API_KEY,
  },
  headers: {
    accept: "application/json",
  },
});
