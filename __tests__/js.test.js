const returnWeather = require("../js/functions");

describe("returnWeather", () => {
  it("returns an object", () => {
    expect(typeof returnWeather("Lancaster")).toEqual("object");
  });
});
