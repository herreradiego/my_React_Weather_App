import React, { Component } from 'react';
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

    //Check if Browser supports geolocation
    if(window.navigator.geolocation){

      navigator.geolocation.getCurrentPosition(succes,errorGeo);

        async function succes(position){
          try{
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            const data = await response.json()
            const userPosition = await position;
            setData(data,userPosition);
            getReverseGeo(data)
          }catch (err) {
            console.log(err)
        }
          
      }


      function errorGeo(error){
        setErrorState (error.code)
        }

    }else{
      
      setErrorState(4)

    }

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

    const setErrorState = (error)=>{
      const errorMsg = {
        1:'PERMISSION_DENIED: Please give permission to use Geolocation on your browser ',
        2:'POSITION_UNAVAILABLE: Your position is not available right now',
        3:'TIMEOUT',
        4:'Geolocation is not supported by this browser'
      }

      this.setState({
        loadingError:true,
        errorMsg:errorMsg[error],
        isLoading:false
      })
    }		
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className='container'>
            {this.state.isLoading ? <Loader/> : (this.state.loadingError) ? <ErroMsg msg={this.state.errorMsg}/> : (this.state.userData && this.state.weatherData ? <Home weatherData ={this.state.weatherData} userData={this.state.userData}/>:null) }
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default App;
