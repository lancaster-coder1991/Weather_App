const goBtn = document.getElementById("go");

returnWeather = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=8bbfb4c5fe492461d4fe061e82d3dff6&units=metric`
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
      console.log(data);
      return data.main;
    })
    .catch((err) => {
      console.log(err);
    });
};

goBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  console.log(city);
  returnWeather(city).then((mainData) => {
    const resultSpans = document.getElementsByTagName("span");
    console.log(resultSpans[0].id);
    // resultDiv.innerHTML = JSON.stringify(mainData);
  });
});

// module.exports = returnWeather;
