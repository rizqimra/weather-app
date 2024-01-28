import React, { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import Card from "./components/Card.jsx";
import QuickNav from "./components/QuickNav.jsx";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([
    "Jakarta",
    "Tokyo",
    "London",
    "Seoul",
    "Dubai",
  ]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("cityHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchWeatherData = _debounce(
    async (inputLocation) => {
      try {
        if (inputLocation.trim() === "") {
          setError(null);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=${apiKey}`
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
    },
    250,
    { leading: true }
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData(location);
      updateHistory(location);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    fetchWeatherData(value);
  };

  const handleCityClick = (city) => {
    setLocation(city);
    fetchWeatherData(city);
  };

  const updateHistory = (enteredCity) => {
    setHistory((prevHistory) => {
      const existingIndex = prevHistory.indexOf(enteredCity);

      // If the city is already in history, don't update it
      if (existingIndex !== -1) {
        return prevHistory;
      }

      // Add the entered city to the beginning of the array
      const newHistory = [enteredCity, ...prevHistory.slice(0, 4)];

      localStorage.setItem("cityHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <div className="flex flex-col justify-center items-center my-24 gap-5">
      <QuickNav history={history} onCityClick={handleCityClick} />
      <div className="relative w-11/12 sm:w-1/3 mt-4 mb-4 px-4 py-2 rounded-3xl shadow-md backdrop-blur-lg bg-gray-300/30 border-gray-300">
        <input
          className="w-full outline-none bg-transparent border-none placeholder-gray-500 text-gray-800"
          type="text"
          placeholder="Search location"
          value={location}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          spellCheck="false"
        />
        <i
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 cursor-pointer fas fa-search"
          onClick={() => fetchWeatherData(location)}
        />
      </div>
      <Card weather={weather} error={error} />
    </div>
  );
}

export default App;
