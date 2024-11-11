import { createContext, useState } from 'react';

export const WeatherContext = createContext();

// Context provider component
export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({});

  // Value to be provided by the context
  const contextValue = {
    weather,
    setWeather: (newWeatherData) => setWeather(newWeatherData)
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
