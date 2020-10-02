const goBtn = document.getElementById("go");

returnWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=8bbfb4c5fe492461d4fe061e82d3dff6`
  )
    .then((response) => {
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
      } else {
        return response.json();
      }
    })
    .then((data) => {
      return data.main;
    })
    .catch((err) => {
      console.log(err);
    });
};

goBtn.addEventListener("click", () => {
  const city = document.getElementById("city").text;
  returnWeather(city).then((mainData) => {
    const resultDiv = document.getElementById("Result");
    resultDiv.text = mainData;
    console.log(mainData);
  });
});

module.exports = returnWeather;
