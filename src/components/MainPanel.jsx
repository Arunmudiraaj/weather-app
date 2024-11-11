import React from 'react'
import { WeatherContext } from '../context/WeatherContext'
import AreaChartCard from "./AreaChartCard";
import LineChartCard from "./LineChartCard";

const MainPanel = () => {
  const {weather} = React.useContext(WeatherContext)
  const cardClasses = 'flex-grow rounded-md bg-white shadow-lg border border-gray-200 border-t-4 px-6 py-4 flex flex-col justify-center items-center gap-1'

  if(Object.keys(weather).length == 0){
    return <i className='h-full flex justify-center items-center text-2xl mt-20 md:mt-0 text-center'>
      Please select Country and city to fetch the weather data
    </i>
  }
  return (
    <div className='p-2 flex flex-col h-full'>
      <div className='flex gap-2 flex-col md:flex-row'>
        <div className={`${cardClasses} border-t-red-500`}>
          <div className='text-gray-700'>Max Temperature</div>
          <div className='text-xl font-bold'>{weather?.daily?.apparent_temperature_max?.[0]} &#x2103;</div>
        </div>
        <div className={`${cardClasses} border-t-green-500`}>
          <div className='text-gray-700'>Min Temperature</div>
          <div className='text-xl font-bold'>{weather?.daily?.apparent_temperature_min?.[0]} &#x2103;</div>
        </div>
        <div className={`${cardClasses} border-t-blue-500`}>
          <div className='text-gray-700'>Wind Direction</div>
          <div className='text-xl font-bold'>{weather?.daily?.winddirection_10m_dominant?.[0]} &#176;</div>
        </div>
      </div>
      <div className="mt-5 flex-grow overflow-auto px-1">
          <AreaChartCard weatherDetails={weather} />
          <LineChartCard weatherDetails={weather} />
        </div>
    </div>
  )
}

export default MainPanel