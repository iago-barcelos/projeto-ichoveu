const token = import.meta.env.VITE_TOKEN;
const currentURL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=`;
const searchUrl = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=`;

export const searchCities = async (term) => {
  const response = await fetch(searchUrl + term);
  const data = await response.json();
  if (!data.length) {
    window.alert('Nenhuma cidade encontrada');
  }
  return data;
};

export const getWeatherByCity = async (cityURL) => {
  const response = await fetch(currentURL + cityURL);
  const data = await response.json();
  const { name } = data.location;
  const { country } = data.location;
  const temp = data.current.temp_c;
  const condition = data.current.condition.text;
  const { icon } = data.current.condition;
  const { url } = cityURL;
  const curWeather = {
    name,
    country,
    temp,
    condition,
    icon,
    url,
  };
  return curWeather;
};
