import { useState } from "react";
import axios from "axios";
/* import { data } from "autoprefixer"; */

const Weather = () => {
  const [userInput, setUserInput] = useState("");
  const [city, setCity] = useState("");

  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [weather, setWeather] = useState("");

  const [contentarr, setContentArr] = useState([]);

  const handleInput = (evt) => {
    setUserInput(evt.target.value);
  };

  const getWeather = () => {
    /* console.log("in getweather funcition"); */
    var weatherData = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=dfdb31a9d8d413421c1a8126dd9678ae`
    );
    weatherData
      .then((success) => {
        setCity(success.data.name);
        setWeather(success.data.weather[0].main);
        setTemp(
          `${Math.ceil(1.8 * (success.data.main.temp - 273) + 32)}  \u00b0 F`
        );

        const riseTime = success.data.sys.sunrise;
        const setTime = success.data.sys.sunset;

        const TimestampToDateTime = (timestamp) => {
          const date = new Date(timestamp * 1000);
          const hours = date.getHours();
          const minutes = "0" + date.getMinutes();
          const seconds = "0" + date.getSeconds();
          const formattedTime =
            hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
          return formattedTime;
        };
        const sunriseTime = TimestampToDateTime(riseTime);
        const sunsetTime = TimestampToDateTime(setTime);

        setContentArr([
          {
            title: "Humidity",
            val: `${success.data.main.humidity}%`,
            color: "#63c5da",
          },
          {
            title: "Temperature Maximum",

            val: `${Math.ceil(
              1.8 * (success.data.main.temp_max - 273) + 32
            )}  \u00b0 F`,
            color: "#ffd60a",
          },
          {
            title: "Temperature Minimum",
            val: `${Math.ceil(
              1.8 * (success.data.main.temp_min - 273) + 32
            )}  \u00b0 F`,
            color: "#ffd166",
          },
          {
            title: "Sunrise Time",
            val: sunriseTime,
            color: "#FF8100",
          },
          {
            title: "Sunset Time",
            val: sunsetTime,
            color: "#EE5D6C",
          },
        ]);

        setDesc(success.data.weather[0].description);
      })
      .catch((errmsg) => {
        alert("please enter a valid City Name and Try Again ");
      });
  };
  return (
    <>
      <div className="flex flex-col gap-5 p-16  items-center max-w mr-auto">
        <div className=" rounded-md p-5 flex flex-wrap flex-col">
          <div className="text-2xl font-medium">
            Lets Check the Weather Report in Your City
          </div>
          <br />
          <div>
            <input
              value={userInput}
              onChange={handleInput}
              type="text"
              placeholder="Enter your city name"
              className="p-2 text-xl font-medium border"
            ></input>
            <button
              onClick={getWeather}
              className="bg-black text-xl font-medium text-white  p-2 border border-black "
            >
              Get Report
            </button>
          </div>
          <br />
          <br /> <br />
          <div>
            <p className="text-3xl font-bold  text-center">
              The Weather in{" "}
              <span className="text-pink-700 underline">{city}</span> is
            </p>{" "}
            <br></br>
            <p className="font-bold text-3xl text-center">
              <span className="text-pink-700 underline"> {weather}</span>{" "}
            </p>{" "}
            <br></br>
            <p className=" text-3xl font-bold  text-center">
              Temperature :
              <span className="text-pink-700 underline"> {temp}</span>
            </p>
            <br></br>
            <p className="text-3xl font-bold  text-center">
              Description :{" "}
              <span className="text-pink-700 underline">{desc} </span>
            </p>
            <br></br>
            {contentarr.map((data, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: `${data.backgroundColor}` }}
                  className="p-6 flex-row flex-grow rounded-md"
                >
                  <p className="text-black text-2xl">{data.title}</p>
                  <p className="text-black text-xl">{data.val}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Weather;
