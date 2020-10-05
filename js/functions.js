const currentGoBtn = document.getElementById("currentGo");
const errorMsg = document.getElementById("errorMsg");

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

currentGoBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  returnWeather(city).then((data) => {
    if (data === 404) {
      errorMsg.innerHTML = "Error - City not found";
    } else {
      //Clear error message if it exists
      errorMsg.innerHTML = "";

      //Set title of results
      const currentWeatherCity = document.querySelector("#currentWeatherCity");
      currentWeatherCity.innerHTML = city;

      //Create array of result fields
      const resultSpans = Array.from(
        document.querySelectorAll("#currentWeatherContainer .resultSpan")
      );

      //Reformat the description to be Title Case
      let description = (
        data.weather[0].description[0].toUpperCase() +
        data.weather[0].description.slice(1)
      ).replace(/\s[a-z]/g, (match) => {
        return match.toUpperCase();
      });

      //Fill in Description field
      resultSpans.find(
        (span) => span.id === "Description"
      ).innerHTML = `Description: ${description}`;

      //Fill in Temperature field
      resultSpans.find(
        (span) => span.id === "Temperature"
      ).innerHTML = `Temperature: ${data.main.temp}${String.fromCharCode(
        176
      )}C`;

      //Fill in Feels Like field
      resultSpans.find(
        (span) => span.id === "FeelsLike"
      ).innerHTML = `Feels Like: ${data.main.feels_like}${String.fromCharCode(
        176
      )}C`;

      //Set cloudiness description
      const cloudPercentage = data.clouds.all;
      let cloudDesc;
      if (cloudPercentage < 26) {
        cloudDesc = "Not Very Cloudy";
      } else if (cloudPercentage < 51) {
        cloudDesc = "A Little Cloudy";
      } else if (cloudPercentage < 76) {
        cloudDesc = "Pretty Cloudy";
      } else {
        cloudDesc = "Very Cloudy";
      }

      //Fill in Cloudiness field
      resultSpans.find(
        (span) => span.id === "Cloudiness"
      ).innerHTML = `Cloudiness: ${cloudPercentage}% - ${cloudDesc}`;

      //Fill in Cloudiness field
      resultSpans.find(
        (span) => span.id === "WindSpeed"
      ).innerHTML = `Wind Speed: ${data.wind.speed}m/s`;

      //Fill in Humidity field
      resultSpans.find(
        (span) => span.id === "Humidity"
      ).innerHTML = `Humidity: ${data.main.humidity}%`;
    }
  });
});

// module.exports = returnWeather;
