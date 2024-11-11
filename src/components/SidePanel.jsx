import React, { useEffect, useState } from "react";
import { City, Country } from "country-state-city";
import sunImage from '../assets/sun.svg'
import moonImage from '../assets/moon.svg'
import { WeatherContext } from "../context/WeatherContext";
import constants from '../constants/constants'

function convertTimestampTo12HourTime(timestamp) {
  if(!timestamp) return ""
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Get hours, minutes, and AM/PM suffix
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Return formatted time
  return `${hours}:${minutes} ${ampm}`;
}

const SidePanel = () => {
  
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const {setWeather, weather} = React.useContext(WeatherContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAllCountries(
      Country.getAllCountries().map((country) => ({
        name: country.name,
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
        label: country.name,
      }))
    );
  }, []);

  useEffect(() => {
    const cities = City.getCitiesOfCountry(selectedCountry?.isoCode).map(
      (city) => ({
        latitude: city.latitude,
        longitude: city.longitude,
        name: city.name,
        label: city.name,
      })
    );
    setAllCities(cities);
  }, [selectedCountry]);

  const handleSelectedCountry = (event) => {
    if (event.target.value) {
      const optionObj = JSON.parse(event.target.value);
      setSelectedCountry(optionObj);
      setSelectedCity("");
    } else {
      setSelectedCountry("");
      setSelectedCity("")
    }
  };

  const handleSelectedCity = (event) => {
    if (event.target.value) {
      const optionObj = JSON.parse(event.target.value);
      setSelectedCity(optionObj);
    } else {
      setSelectedCity("");
    }
  };

  const getWeatherDetails = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();

    const fetchWeather = await fetch( constants.weatherApi(selectedCity?.latitude, selectedCity?.longitude));

    const data = await fetchWeather.json();
    if(data.error) {
      setWeather({})
      return
    }

    setWeather(data);
    } catch (error) {
      setWeather({})
      console.log(error)
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-5 min-w-sm p-2">
      <select
        className="p-2 rounded-md outline-none font-bold"
        value={selectedCountry ? JSON.stringify(selectedCountry) : ""}
        onChange={handleSelectedCountry}
      >
        <option value={""}>Select country</option>
        {allCountries.map((country) => (
          <option key={JSON.stringify(country)} value={JSON.stringify(country)}>
            {country.name}
          </option>
        ))}
      </select>

      <select
        className="p-2 rounded-md outline-none font-bold"
        value={selectedCity ? JSON.stringify(selectedCity) : ""}
        onChange={handleSelectedCity}
      >
        <option value={""}>Select City</option>
        {allCities.map((city) => (
          <option key={JSON.stringify(city)} value={JSON.stringify(city)}>
            {city.name}
          </option>
        ))}
      </select>

      <button
        onClick={getWeatherDetails}
        className="bg-green-500 hover:bg-green-400 w-full py-3 rounded-lg text-black text-sm font-bold"
      >
        {loading ? "Loading..." : "Get Weather"}
      </button>

      <div className="flex flex-col space-y-2">
        <p className="text-white">Latitude: {selectedCity?.latitude}</p>
        <p className="text-white">Longitude: {selectedCity?.longitude}</p>
      </div>
      <div className="h-[1px] bg-gray-600"/>
      {Object.keys(weather).length > 0 && <div className="flex items-center justify-between px-6 space-x-5 text-white">
          <div className="flex justify-center items-center gap-1">
            <img src={sunImage} className="w-6"/>
            <div>{convertTimestampTo12HourTime(new Date(weather?.daily?.sunrise?.[0])?.getTime())}</div>
          </div>

          <div className="flex justify-center items-center gap-1">
            <img src={moonImage} className="w-6"/>
            <div>{convertTimestampTo12HourTime(new Date(weather?.daily?.sunset?.[0])?.getTime())}</div>
          </div>
        </div>}
    </div>
  );
};

export default SidePanel;
