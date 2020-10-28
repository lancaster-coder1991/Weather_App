todayGoBtn.addEventListener("click", () => {
  const city = document.getElementById("city").value;
  getCoords(city).then((coords) => {
    console.log(coords);
  });
});
