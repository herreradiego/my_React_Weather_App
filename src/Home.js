import React from 'react'
import WeatherIcon from 'react-icons-weather';

const Home = (props)=>{

    console.log("from home: ",props.userData.suburb)
  
    return(
      <div className="container">
        <h2 className="weather-text">Welcome stranger,
        weather conditions for {props.userData.suburb}</h2>
        {<WeatherIcon className="weather-Icon" name="owm" iconId={props.weatherData.id.toString()}  flip="horizontal" rotate="90" />}
        <h3 className='weather-description'> {props.weatherData.description}</h3>
        <h4 className='weather-temp'>temp: {Math.round(props.weatherData.temp)}℃</h4>
        <p>Have a Lovely Day :)</p>
        
      </div>
      )
}

export default Home