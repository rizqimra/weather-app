import React, { useState } from "react";
import Card from "./components/Card.jsx";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const apiKey = "d3bce988e3f0da2b26b0daa1345d912e";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError("Location not found. Please enter a valid location.");
      }
    } catch (error) {
      setWeather({});
      setError("Couldn't fetch weather data");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-24 gap-5">
      <div className="relative w-1/3 mt-4 mb-4 px-4 py-2 bg-white rounded-3xl shadow-md">
        <input
          className="w-full outline-none"
          type="text"
          placeholder="Search location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <i
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 cursor-pointer fas fa-search"
          onClick={fetchWeatherData}
        />
      </div>
      <Card weather={weather} error={error} />
    </div>
  );
}

export default App;
