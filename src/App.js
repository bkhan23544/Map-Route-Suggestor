import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './Redux/index'
import BackgroundSlider from 'react-background-slider'
import SelectCity from './Components/Select City'
import SelectDestination from './Components/Select Destination'
import MapRoute from './Components/Map Route'
import SavedRoutes from './Components/Saved Routes'
import SavedRouteMap from './Components/Saved Route Map'

function App() {

const images=["https://wallpaperaccess.com/full/1088031.jpg","https://wallpapercave.com/wp/wp1825719.jpg","https://wallpaperaccess.com/full/1298385.jpg"]


  return (
    <div className="App">
       <Provider store={store}>
         <BackgroundSlider
  images={images}
  duration={5} transition={2} />
     <Router>
  
       <Route exact path="/" component={SelectCity}/>
       <Route exact path="/SelectDestination" component={SelectDestination}/>
       <Route exact path="/MapRoute" component={MapRoute}/>
       <Route exact path="/SavedRoutes" component={SavedRoutes}/>
       <Route exact path="/SavedRouteMap" component={SavedRouteMap}/>
     </Router>
     </Provider>
    </div>
  );
}

export default App;
