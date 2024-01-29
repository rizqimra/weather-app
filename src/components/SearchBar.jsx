import React from "react";

const SearchBar = ({
  location,
  handleInputChange,
  handleKeyPress,
  fetchWeatherData,
}) => {
  return (
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
  );
};

export default SearchBar;
