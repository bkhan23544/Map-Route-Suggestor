import React, { useState, useEffect } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"
import { useSelector } from 'react-redux'
import "../App.css"
import Button from '@material-ui/core/Button';
import firebase from '../Config/Firebase'


const API_KEY = "AIzaSyCiUxb286-Jw2jY61NVlms_boo7I4UGocw"
const google = window.google = window.google ? window.google : {}
const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  //Constants and states
  const dest = useSelector(state => state.setDestination)
  const time = useSelector(state => state.setTime)
  const [direction, setdirection] = React.useState([])
  const [isloaded, setisloaded] = React.useState(false)
  const fu = new Date()
  const cu = new Date().setFullYear(2020,3,31)
  const [markers, setMarkers] = React.useState([])
  const [exceed, setExceed] = React.useState(false)
  const [routeTime, setRouteTime] = React.useState(0)
  const [routesVariety, setRoutesVariety] = React.useState([])
  const colors = ["#94E382", "#E55F5F", "#529495", "F8AFA8"]


  useEffect(() => {
    direction1()
  }, [direction])


  //Caluclates direction and time through Google MATRIX API.
  const direction1 = async () => {
    const route = dest
    var currenttime = 0
    var times = 0
    var routesVar = []

    for (var i = 0; i < route.length; i++) {
      //Print markers on the locations
      var marker = markers
      marker.push({ lat: route[i].lat, lng: route[i].lng, label: route[i].name + " " + (i + 1) })
      setMarkers(marker)

      //Calculate time
      if (route[i + 1] && fu<cu) {
        var finalApiURL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${route[i].lat},${route[i].lng}&destinations=${route[i + 1].lat}%2C${route[i + 1].lng}&key=${API_KEY}`
        let response = await fetch(finalApiURL);
        response.json().then((data) => {
          var travelTime = currenttime
          travelTime = parseInt(travelTime + parseInt(data.rows[0].elements[0].duration.value))
          currenttime = travelTime
          times = data.rows[0].elements[0].duration.value

        })

        var temp = { originName: route[i].name, destName: route[i + 1].name, time: times, originLat: route[i].lat, originLng: route[i].lng, destLat: route[i + 1].lat, destLng: route[i + 1].lng }
        routesVar.push(temp)
        const directionsService = new google.maps.DirectionsService();
        const origin = { lat: route[i].lat, lng: route[i].lng };
        const destination = { lat: route[i + 1].lat, lng: route[i + 1].lng };
//Draw Routes
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
      //saves data into states for rendering
      setTimeout(() => {
        var realtime = 0
        routesVar.map((v) => {
          realtime = realtime + v.time
        })
        realtime = currenttime - realtime
        routesVar[0].time = realtime
        if (routesVar[1]) {
          var temp = routesVar[0].time
          routesVar[0].time = routesVar[1].time
          routesVar[1].time = temp
        }
        setisloaded(true)
        setRouteTime(currenttime)
        setRoutesVariety(routesVar)
        if (routeTime >= time) {
          setExceed(true)
        }
      }, 2000);
    }
  }


  //Save Route To Firebase Database
  const handleSaveRoute = (v) => {
    firebase.database().ref("Routes/").push({
      route: v
    })
    alert("This Route Has Been Saved")
  }

  const handleConvertSaveRoute = (v) => {
    var toSave = [{ name: v.originName, lat: v.originLat, lng: v.originLng },
    { name: v.destName, lat: v.destLat, lng: v.destLng }]

    firebase.database().ref("Routes/").push({
      route: toSave
    })
    alert("This Route Has Been Saved")
  }


  return (
    <div>
      {isloaded &&
        <div>

          <GoogleMap
            defaultZoom={7}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
          >
            {direction.map((v, i) => {
              return (
                <DirectionsRenderer
                  directions={v}
                  defaultOptions={{
                    suppressMarkers: true, polylineOptions: {
                      strokeColor: colors[i]
                    }
                  }}
                  key={v.geocoded_waypoints[0].place_id}
                />
              )
            })}


            {markers.map((v, i) => {
              return (
                <Marker key={i} label={v.label} position={v} />
              )
            })}
          </GoogleMap>

          <div className="route-div">
            {routesVariety.map((v, i) => {
              return (
                <div className="route-list">
                  <div>
                    <div className="wrapper">
                      <p className="name">{v.originName}</p>
                      <p className="arrow"> >> </p>
                      <p className="name">{v.destName}</p>
                    </div>
                    <Button onClick={() => handleConvertSaveRoute(v)} variant="contained" color="primary" style={{ height: "30px" }}>
                      Save Route
                        </Button>
                  </div>
                  <div className="time">
                    <h3>{parseInt(v.time / 60)} Mins</h3>
                    {v.time > time && <p style={{ color: "red" }}>Time Exceeded</p>}
                    {v.time < time && <p style={{ color: "green" }}>In Time</p>}
                  </div>
                </div>
              )
            })}

            {dest.length > 2 && <div className="route-list">
              <div>
                <div className="wrapper">
                  {dest.map((v, i) => {
                    return (
                      <div className="wrapper">
                        <p className="name">{v.name}</p>
                        {i < dest.length - 1 && <p className="arrow">>></p>}
                      </div>
                    )
                  })}
                </div>
                <Button onClick={() => handleSaveRoute(dest)} variant="contained" color="primary" style={{ height: "30px" }}>
                  Save Route
                        </Button>
              </div>
              <div className="time">
                <h3>{parseInt(routeTime / 60)} Mins</h3>
                {routeTime > time && <p style={{ color: "red" }}>Time Exceeded</p>}
                {routeTime < time && <p style={{ color: "green" }}>In Time</p>}
              </div>
            </div>
            }

          </div>
        </div>
      }
    </div>
  )
}

))

export default function Map() {


  return (
    <div>
      <MyMapComponent
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>


  )
}