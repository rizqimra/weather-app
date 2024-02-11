import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar.jsx";
import Card from "./components/Card.jsx";
import QuickNav from "./components/QuickNav.jsx";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchWeatherData = useCallback(async (inputLocation) => {
    try {
      if (inputLocation.trim() === "") {
        setError(null);
        return;
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=${apiKey}`
      );

      const data = response.data;

      if (response.status === 200) {
        setWeather(data);
        setError(null);
      } else {
        setError("Location not found. Please enter a valid location.");
      }
    } catch (error) {
      setWeather({});
      setError("Couldn't fetch weather data");
    }
  }, [apiKey]);

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

  useEffect(() => {
    if (history.length > 0) {
      setLocation(history[0].toLowerCase());
      fetchWeatherData(history[0]);
    }
  }, [history, fetchWeatherData]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData(location);
      updateHistory(location);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleCityClick = (city) => {
    setLocation(city.toLowerCase());
    fetchWeatherData(city);
  };

  const updateHistory = (enteredCity) => {
    setHistory((prevHistory) => {
      const existingIndex = prevHistory.findIndex(
        (city) => city.toLowerCase() === enteredCity.toLowerCase()
      );

      if (existingIndex !== -1) {
        return prevHistory;
      }

      const newHistory = [enteredCity, ...prevHistory.slice(0, 4)];

      localStorage.setItem("cityHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <QuickNav history={history} onCityClick={handleCityClick} />
        <SearchBar
          location={location}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          fetchWeatherData={fetchWeatherData}
        />
        <Card weather={weather} error={error} />
      </div>
    </>
  );
}

export default App;
