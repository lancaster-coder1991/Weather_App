returnWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},,GB&appid=8bbfb4c5fe492461d4fe061e82d3dff6&units=metric`
  )
    .then((response) => {
      if (response.status !== 200 || city === "") {
        throw 404;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

export { returnWeather };
