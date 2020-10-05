import { returnWeather } from "./utils";
const goBtn = document.getElementById("go");
const errorMsg = document.getElementById("errorMsg");

goBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  returnWeather(city).then((data) => {
    if (data === 404) {
      errorMsg.innerHTML = "Error - City not found";
    } else {
      errorMsg.innerHTML = "";
      //Create array of result fields
      const resultSpans = Array.from(
        document.getElementsByClassName("resultSpan")
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
