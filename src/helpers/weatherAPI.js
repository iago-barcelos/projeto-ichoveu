const token = import.meta.env.VITE_TOKEN;

export const searchCities = (term) => {
  fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${term}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) {
        window.alert('Nenhuma cidade encontrada');
      }
      return data;
    })
    .catch((error) => {
      console.error('Ocorreu um erro na busca das cidades:', error);
    });
};

export const getWeatherByCity = (/* cityURL */) => {
//   seu código aqui
};
