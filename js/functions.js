const currentGoBtn = document.getElementById("currentGo");
const todayGoBtn = document.getElementById("todayGo");
const errorMsg = document.getElementById("errorMsg");

const returnCurrentWeather = (city) => {
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

const getCoords = (city) => {
  return fetch(`https://geocode.xyz/${city} UK?json=1`)
    .then((response) => {
      return response.json();
    })
    .then((location) => {
      const coords = {
        lat: location.latt,
        lng: location.longt,
      };
      return coords;
    });
};

const getTodaysForecast = (coords) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&exclude=current,minutely,daily,alerts&appid=8bbfb4c5fe492461d4fe061e82d3dff6&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((forecast) => {
      console.log(forecast);
      return forecast;
    });
};

currentGoBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  returnCurrentWeather(city).then((data) => {
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

todayGoBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;

  //Set today's weather forecast city
  const currentWeatherCity = document.querySelector("#todayWeatherCity");
  currentWeatherCity.innerHTML = city;

  getCoords(city).then((coords) => {
    console.log(coords);
    getTodaysForecast(coords).then((forecast) => {
      const todayForecastFlex = document.getElementById("todayWeatherFlex");
      todayForecastFlex.innerHTML = "";
      const hoursLeft = 24 - new Date().getHours();
      let counter = 0;
      for (let i = hoursLeft; i > 0; i--) {
        const newdiv = document.createElement("div");
        newdiv.innerHTML = `${24 - i}.00: ${
          forecast.hourly[counter].temp
        }${String.fromCharCode(176)}C, ${
          forecast.hourly[counter].weather[0].description
        }`;
        todayForecastFlex.appendChild(newdiv);
        counter++;
      }
    });
  });
});
