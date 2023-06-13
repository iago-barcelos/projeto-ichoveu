const token = import.meta.env.VITE_TOKEN;
const currentURL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=`;
const searchUrl = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=`;
const baseURL = 'http://api.weatherapi.com/v1';
const apiForecast = '/forecast.json?';
const forecastUrl = `${baseURL}${apiForecast}lang=pt&key=${token}&q=`;

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
  const { feelslikec } = data.current;
  const { humidity } = data.current;
  const curWeather = {
    name,
    country,
    temp,
    condition,
    icon,
    url,
    feelslikec,
    humidity,
  };
  return curWeather;
};

/* export const weather7Days = async (cityUrl) => {
  const days = '&days=7';
  const response = await fetch(forecastUrl + cityUrl + days);
  const data = response.json();
  const weekWeather = await data.forecast.forecastday.map((day) => ({
    date: day.date,
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    condition: day.day.condition_text,
    icon: day.day.condition.icon,
  }));
  return weekWeather;
}; */

export const wheather7days = async (cityURL) => {
  try {
    const url = `${forecastUrl}${cityURL}&days=7`;
    const resultado = await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { forecastday } = data.forecast;
        return forecastday.map((day) => {
          return {
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
          };
        });
      });

    return resultado;
  } catch (error) {
    window.alert(error.message);
  }
};
