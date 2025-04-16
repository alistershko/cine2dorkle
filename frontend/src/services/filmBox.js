const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getStartingFilm = async () => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(`${BACKEND_URL}/film`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch Film");
  }

  const data = await response.json();

  return data;
};

export const getFilmByTitle = async (title) => {
  const requestOptions = {
    method: "GET",
  };

  const response = await fetch(`${BACKEND_URL}/film/${title}`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch Film");
  }

  const data = await response.json();

  return data;
};
