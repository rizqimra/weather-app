import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar.jsx";
import Card from "./components/Card.jsx";
import QuickNav from "./components/QuickNav.jsx";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchWeatherData = async (inputLocation) => {
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
  };

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
      <SearchBar
        location={location}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        fetchWeatherData={fetchWeatherData}
      />
      <Card weather={weather} error={error} />
    </div>
  );
}

export default App;
