import React from "react";

const Card = ({ weather, error }) => {
  const getCurrentDate = () => {
    const now = new Date();
    const timezoneOffsetInSeconds = weather.timezone || 0;
    const localTime =
      now.getTime() +
      now.getTimezoneOffset() * 60000 +
      timezoneOffsetInSeconds * 1000;
    const localDate = new Date(localTime);

    const optionsDate = {
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = localDate.toLocaleString("default", optionsDate);
    const formattedTime = localDate.toLocaleString("default", optionsTime);

    return `${formattedDate} | ${formattedTime}`;
  };

  return (
    <div
      className={`flex text-gray-800 px-6 backdrop-blur-lg backdrop-filter bg-gray-300/30 w-11/12 sm:w-2/3 h-max rounded-xl shadow-lg border-gray-300 ${
        !weather.name && !error ? "hidden" : ""
      }`}
    >
      {error ? (
        <p className="text-center text-red-500 font-semibold text-xl p-3 w-full">
          {error}
        </p>
      ) : (
        <div className="w-full">
          {weather.name && (
            <>
              <div className="flex justify-between items-center">
                <div className="flex flex-col justify-start">
                  <h2 className="text-sm sm:text-base font-semibold uppercase">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <p className="text-[10px] sm:text-xs">{getCurrentDate()}</p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <div className="flex flex-col justify-center items-center py-5 gap-3 w-full">
                <h1 className="text-5xl font-semibold">
                  {(weather.main.temp - 273.15).toFixed(1)}°C
                </h1>
                <h2 className="capitalize font-medium text-xl">
                  {weather.weather[0].description}
                </h2>
              </div>
              <div className="flex justify-evenly flex-wrap items-center w-full pb-6">
                <div className="mini-card backdrop-blur-lg backdrop-filter bg-gray-300/30 border-gray-300">
                  <i className="fas fa-temperature-half"></i>
                  <p>Feels Like</p>
                  <p>{(weather.main.feels_like - 273.15).toFixed(1)}°C</p>
                </div>
                <div className="mini-card backdrop-blur-lg backdrop-filter bg-gray-300/30 border-gray-300">
                  <i className="fas fa-droplet"></i>
                  <p>Humidity</p>
                  <p>{weather.main.humidity}%</p>
                </div>
                <div className="mini-card backdrop-blur-lg backdrop-filter bg-gray-300/30 border-gray-300">
                  <i className="fas fa-gauge-high"></i>
                  <p>Pressure</p>
                  <p>{weather.main.pressure} hPa</p>
                </div>
                <div className="mini-card backdrop-blur-lg backdrop-filter bg-gray-300/30 border-gray-300">
                  <i className="fas fa-wind"></i>
                  <p>Wind Speed</p>
                  <p>{(weather.wind.speed * 3.6).toFixed(2)} km/h</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
