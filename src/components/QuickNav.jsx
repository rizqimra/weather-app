import React from "react";

const QuickNav = ({ history, onCityClick }) => {
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <ul className="flex w-full flex-wrap justify-center gap-3">
      {history.map((city, index) => (
        <li key={index}>
          <button
            onClick={() => onCityClick(city)}
            className="rounded-full border border-transparent py-1 px-5 font-medium text-gray-800 capitalize transition-all duration-150 hover:border-gray-300 hover:bg-gray-300/30 hover:backdrop-blur-lg hover:shadow-md"
          >
            {toTitleCase(city)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default QuickNav;
