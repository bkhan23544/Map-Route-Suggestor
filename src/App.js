import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './Config/Firebase'
import {BrowserRouter as Router ,Route,withRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './Redux/index'
import BackgroundSlider from 'react-background-slider'
import SelectCity from './Components/Select City'
import SelectDestination from './Components/Select Destination'
import MapRoute from './Components/Map Route'
import SavedRoutes from './Components/Saved Routes'
import SavedRouteMap from './Components/Saved Route Map'
import Profile from './Components/Profile'
import Header from './Components/Layout/Header'
import Footer from './Components/Layout/Footer'
import Landing from './Components/Layout/Landing'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import history from './Config/history'

function App(props) {
//Background Images
const images=["https://wallpaperaccess.com/full/1088031.jpg","https://wallpapercave.com/wp/wp1825719.jpg","https://wallpaperaccess.com/full/1298385.jpg"]
const [user,setUser] = React.useState(false)
const [signupError,setSignupError] = React.useState("")
const [loginError,setLoginError] = React.useState("")




const settrue=()=>{
  setUser(true)
}

const logout=()=>{
  firebase.auth().signOut()
  setUser(false)
}






//Router and Redux setup
  return (
    <div className="App">
    
         <BackgroundSlider
  images={images}
  duration={5} transition={0.5} />
     <Router history={history}>
     <Provider store={store}>
       {/* <Route exact path="/" component={SelectCity}/> */}
       <Header user={user} logout={logout}/>
       <Route exact path="/" component={()=> <Landing settrue={settrue}/>}/>
       <Route exact path="/Login" component={()=><Login settrue={settrue}/>}/>
       <Route exact path="/Signup" component={()=><Signup settrue={settrue}/>}/>
        <Route exact path="/SelectCity" component={user ? SelectCity : Landing}/>	
        <Route exact path="/Profile" component={user ? Profile : Landing}/>	
        <Route exact path="/SelectDestination" component={user ? SelectDestination : Landing}/>	
        <Route exact path="/MapRoute" component={user ? MapRoute : Landing}/>	
        <Route exact path="/SavedRoutes" component={user ? SavedRoutes : Landing}/>	
        <Route exact path="/SavedRouteMap" component={user ? SavedRouteMap : Landing}/>	
      
       <Footer/>
       </Provider>
     </Router>
    </div>
  );
}

export default App;
