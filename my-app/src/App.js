import React, {useState} from 'react' 
import axios from 'axios'

function App() {
  // const [temps, setTemps] = useState([])
  const [data,setData] = useState({})
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=106493cfa8dd913120f27dbbb0057bda`

  const searchCoordinates = (event) => {
    if(event.button === 0){
      axios.get(url).then((response) => {
        setData(response.data) 
        console.log(response.data)
      })
      setLatitude('')
      setLongitude('')
    }
  }
  
  return (
    <div className="App">
      <div className="header"> Rahim's Weather</div>
      <div className="search">
        <input 
        value={latitude}
        onChange={event => setLatitude(event.target.value)}
        placeholder='Enter Latitude'
        type="text"/>
      </div>
      <div className='search'>
        <input 
          value={longitude}
          onChange={event => setLongitude(event.target.value)}
          placeholder='Enter Longitude'
          onKeyPress={searchCoordinates}
          type="text"/>
      </div>
      <button className="btn" onClick={searchCoordinates}>
        Search Coordinates
      </button>
      <div className="container">
        <div className="location">
          <p>Coordinates: {data.lat} {data.lon}</p>
        </div>
        <div className="temp">
          <h1>Mean: {(data.daily?mean(data) + "°K":'')}</h1>
          <h1>Median: {(data.daily?median(data) + "°K":'')}</h1>
          <h1>Mode: {(data.daily?mode(data) + "°K":'')}</h1>
        </div>
      </div>
    </div>
  );
}

function mean(data){
  let array = [];
  for(let i=0; i<3; i++){
    array.push(data.daily[i].temp.day)
  }
  return (array.reduce((a,b) => a + b) / array.length).toPrecision(5);
}

function median(data){
  let array = [];
  for(let i=0; i<3; i++){
    array.push(data.daily[i].temp.day)
  }
  array.sort(function(a,b){
      return a-b;
  });
  let half = Math.floor(array.length/2);
  if(array.length % 2)
      return array[half];
  return (array[half - 1] + array[half]) / 2.0;
}

function mode(data){
  let array = [];
  for(let i=0; i<3; i++){
    array.push(data.daily[i].temp.day)
  }
  array.sort(function(a,b){
      return a-b;
  });
  let current_streak = 1;
  let highest_streak = 1;
  let current_num = array[0];
  let highest_num = array[0];
  for(let i=1; i<array.length; i++){
      if(array[i]==current_num){
          current_streak++;
          highest_num = (current_streak>highest_streak ? current_num : highest_num);
      }
      else{
          current_num=array[i];
          current_streak=1;
      }
  }
  return highest_num;
}

export default App;
