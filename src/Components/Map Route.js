import React,{useState,useEffect} from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker,DirectionsRenderer } from "react-google-maps"
import {useSelector} from 'react-redux'

const google = window.google = window.google ? window.google : {}
const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
  const dest = useSelector(state => state.setDestination)
  const [direction,setdirection] = React.useState([])
  const [isloaded,setisloaded] = React.useState(false)

  useEffect(()=>{
direction1()
},[direction])

  const direction1=()=>{
    const hotel = {lat:52.333889,lng:4.888803}
    const route = dest
    route.unshift(hotel)
    console.log(route,"rororo")
    for(var i=0;i<route.length;i++){
      if(route[i+1]){
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
            // console.log(direction,"current")
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
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
{direction.map((v,i)=>{
  // console.log(v,"vvvv")
  return(
    <DirectionsRenderer
    directions={v}
    // defaultOptions={{suppressMarkers: true}}
    key={v.geocoded_waypoints[0].place_id}
    />
  )
})}

  </GoogleMap>  
}
</div>
)
}

))

export default function Map(){
return(
        <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCiUxb286-Jw2jY61NVlms_boo7I4UGocw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
)
}