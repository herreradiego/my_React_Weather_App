import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home'
import ErroMsg from './ErrorMsg'
import Loader from './Loader'

class App extends Component {

  constructor(props){
    super(props)

    this.state={
      userData:null,
      isLoading:false,
      loadingError:false,
      weatherData:{}
      }
  }

  componentDidMount(){

    this.setState({
      isLoading:true
    })

    const data ={}

    const setData = (data,userPosition)=>{
     
      if(data && userPosition){
        
        this.setState({
          userData:{
            country:data.address.country,
            city:data.address.state, 
            userState:data.address.state,
            suburb:data.address.suburb,
            userPosition:{
              lat:userPosition.coords.latitude,
              long:userPosition.coords.longitude
            }
            
          },
        
          
          
        })
      }
    }

    const getReverseGeo = async (data)=>{

      try{
        const apiResponse = await fetch(`https://openweathermap.org/data/2.5/weather?lat=${this.state.userData.userPosition.lat}&lon=${this.state.userData.userPosition.long}&appid=b6907d289e10d714a6e88b30761fae22`)
        const response = await apiResponse.json()
        console.log("TIME DATA",response)
        this.setState({
          weatherData:{
            id: response.weather[0].id,
            main: response.weather[0].main,
            description: response.weather[0].description,
            icon: response.weather[0].icon,
            temp:response.main.temp,
            temp_min:response.main.temp_min,
            temp_max:response.main.temp_max
          },
          isLoading:false
        })
      }catch(err){
        console.log(err)
      }
      
    }

    const setErrorState = ()=>{
      console.log("setting value")
      this.setState({
        loadingError:true,
        isLoading:false
      })
    }
			
			//check if gelocation is available
			
        
    navigator.geolocation.getCurrentPosition(succes,errorGeo);

        async function succes(position){
          try{
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            const response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=-34.5832157&lon=-58.4907768')
            const data = await response.json()
            const userPosition = await position;
            setData(data,userPosition);
            getReverseGeo(data)
          }catch (err) {
            console.log(err)
        }
          
      }

      function errorGeo(error){
        setErrorState ()
          console.log('GEOLOCALIZATION IS NOT WORKING ON YOUR BROWSER. ERROR CODE: ' + error.code)
        }
			
      		  fetch('http://ip-api.com/json', {
            headers: new Headers({'content-type': 'application/json'}),
            mode: 'no-cors'}).then((response)=>{
              console.log("ESTO", JSON.stringify(response))

                const latitude = response.lat;
                const longitude = response.lon;  
                const pos=[latitude,longitude]; 
                console.log("posicion: ",response)

                this.setState({
                  userGeoPos:{
                    latitude:response.lat,
                    longitude:response.lon
                  }
                })

            }) 
        			
      			
		
  }
  render() {
    
    return (
      <React.Fragment>
        <div className="App">
          <div className='container'>
            {this.state.isLoading ? <Loader/> : (this.state.loadingError) ? <ErroMsg/> : (this.state.userData && this.state.weatherData ? <Home weatherData ={this.state.weatherData} userData={this.state.userData}/>:null) }
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default App;
