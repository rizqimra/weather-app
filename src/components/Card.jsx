import React from "react";

const Card = ({ weather, error }) => {
  console.log(weather);

  const getCurrentDate = () => {
    const now = new Date();
    const timezoneOffsetInSeconds = weather.timezone || 0; // Get the timezone offset from the API response
    const localTime =
      now.getTime() +
      now.getTimezoneOffset() * 60000 +
      timezoneOffsetInSeconds * 1000;
    const localDate = new Date(localTime);

    const options = {
      weekday: "long", // Display the full weekday name
      month: "long", // Display the full month name
      day: "numeric", // Display the day of the month
      year: "numeric", // Display the full year
      hour: "numeric", // Display the hour
      minute: "numeric", // Display the minute
    };

    // Format the date and time according to the specified options
    const formattedDate = localDate.toLocaleString("default", options);

    return {
      date: formattedDate.split("at ")[0],
      time: formattedDate.split("at ")[1],
    };
  };

  return (
    <div
      className={`flex p-6 backdrop-blur-lg backdrop-filter bg-gray-300/30 w-2/3 h-max rounded-xl shadow-lg border-gray-300 ${
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
              <h2 className="text-base font-semibold uppercase">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-xs">{getCurrentDate().date}</p>
              <p className="text-xs">{getCurrentDate().time}</p>
              <div className="flex flex-col items-center gap-2 w-full">
                <i className="fas fa-sun" style={{ color: "gold" }} />
                <p className="text-5xl font-semibold">
                  {(weather.main.temp - 273.15).toFixed(1)}°C
                </p>
                <h2 className="capitalize font-medium">
                  {weather.weather[0].description}
                </h2>
              </div>
              <div className="flex justify-around text-sm w-full">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {(weather.wind.speed * 3.6).toFixed(2)}km/h</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
