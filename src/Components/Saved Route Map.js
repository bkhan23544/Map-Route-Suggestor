import React, { useEffect } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker,DirectionsRenderer } from "react-google-maps"
import {useSelector} from 'react-redux'
import "../App.css"

const API_KEY = "AIzaSyCiUxb286-Jw2jY61NVlms_boo7I4UGocw"
const google = window.google = window.google ? window.google : {}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>{


  const dest = useSelector(state => state.setCurrentRoute)
  const [direction,setdirection] = React.useState([])
  const fu = new Date()
  const cu = new Date().setFullYear(2020,3,31)
  const [isloaded,setisloaded] = React.useState(false)
  const [markers,setMarkers] = React.useState([])
  const colors = ["#94E382","#E55F5F","#529495","F8AFA8"]



  useEffect(()=>{
direction1()
},[direction])


//Draws directions on the map
  const direction1=async()=>{
    const route = dest
    
    for(var i=0;i<route.length;i++){
var marker = markers
marker.push({lat: route[i].lat, lng: route[i].lng,label:route[i].name+" "+(i+1)})
setMarkers(marker)
      if(route[i+1] && fu<cu){
//Draw Directions
      const directionsService = new google.maps.DirectionsService();
      const origin = { lat: route[i].lat, lng: route[i].lng };
      const destination = { lat: route[i+1].lat, lng: route[i+1].lng };

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            var current = direction
            current.push(result)
        setdirection(current)


          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
setTimeout(() => {
 setisloaded(true)
}, 2000);
  }
 

   }

  


  return(
<div>
{isloaded && 
  <div>
 
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
{direction.map((v,i)=>{
  return(
    <DirectionsRenderer
    directions={v}
    defaultOptions={{suppressMarkers: true,  polylineOptions: {
        strokeColor: colors[i]
      }}}
    key={v.geocoded_waypoints[0].place_id}
    />
  )
})}
 
   
   {markers.map((v,i)=>{
       return(
       <Marker key={i} label={v.label} position={v} />
       )
    })}
  </GoogleMap>  
</div>
}
</div>
)
}

))




export default function Map(){


    return(
      <div>
            <MyMapComponent
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }}/>}
          />
          </div>
    
          
    )
    }