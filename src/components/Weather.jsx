import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");

  const handleCity = (evt) => {
    setCity(evt.target.value);
  };

  const getWeather = () => {
    console.log("in getweather funcito");
    var weatherData = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dfdb31a9d8d413421c1a8126dd9678ae`
    );
    weatherData
      .then((success) => {
        console.log(success.data.weather[0].main);
        setWeather(success.data.weather[0].main);
        setTemp(success.data.main.temp);
        setDesc(success.data.weather[0].description);
      })
      .catch((errmsg) => {
        console.log(errmsg);
      });
  };
  return (
    <>
      <div className="bg-black p-16 max-w mr-auto">
        <div className="bg-green-400 border rounded-md p-5 flex flex-wrap flex-col items-center justify-center">
          <div className="text-2xl font-medium">Weather Report</div>
          <br />
          <p>I can give you a weather report about your city</p>
          <br />
          <input
            type="text"
            placeholder="Enter your city name"
            className="p-2 text-xl font-medium border rounded-md "
            onChange={handleCity}
          ></input>
          <br />
          <br />
          <button
            onClick={getWeather}
            className="bg-black text-white  p-1 border border-black rounded-md"
          >
            Get Report
          </button>
          <br />
          <br /> <br />
          <p className="font-bold">
            The Weather in{" "}
            <span className="text-pink-700 underline">{city}</span> is
          </p>{" "}
          <br />
          <br />
          <p className="font-bold">
            Weather :<span className="text-pink-700 underline"> {weather}</span>{" "}
          </p>{" "}
          <br />
          <br />
          <p className="font-bold">
            Temperature :
            <span className="text-pink-700 underline"> {temp}</span>
          </p>
          <br />
          <p className="font-bold">
            Description :{" "}
            <span className="text-pink-700 underline">{desc} </span>
          </p>
        </div>
      </div>
    </>
  );
};
export default Weather;
