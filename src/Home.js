import React from 'react'
import WeatherIcon from 'react-icons-weather';

const Home = (props)=>{
  
    return(
      <div className="home">
        <h2 className="weather-title">Welcome stranger,
        weather conditions for {props.userData.suburb}</h2>
        {<WeatherIcon className="weather-Icon" name="owm" iconId={props.weatherData.id.toString()}  flip="horizontal" rotate="90" />}
        <h3 className='weather-description'> {props.weatherData.description}</h3>
        <h4 className='weather-temp'>temp: {Math.round(props.weatherData.temp)}℃</h4>
      </div>
      )
}

export default Home