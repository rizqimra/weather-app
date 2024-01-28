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
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
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
    const loadLocations = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/box/city?bbox=-180,-90,180,90,1000&appid=${apiKey}`
        );

        const data = response.data.list || [];

        if (response.status === 200) {
          setLocations(data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    loadLocations();
  }, [apiKey]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeatherData(location);
      updateHistory(location);
    }
  };

  const handleInputChange = (e) => {
    let matches = [];
    if (e.length > 0) {
      matches = locations.filter(loc => {
        const regex = new RegExp(`${e}`, "gi")
        return regex;
      })
    }
    
    const value = e.target.value;
    setLocation(value);
  };

  const handleCityClick = (city) => {
    setLocation(city);
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
