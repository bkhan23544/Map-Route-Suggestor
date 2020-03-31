import React, { useEffect } from 'react'
import firebase from '../Config/Firebase'
import { useDispatch } from 'react-redux'
import {setCurrentRoute} from '../Redux/action'
import {Link} from 'react-router-dom'


export default function SavedRoutes(){

    
const dispatch = useDispatch();
const [data,setData] = React.useState([])
const [isLoading,setIsLoading] = React.useState(true)

//Get Data from firebase and save into state
useEffect(()=>{
firebase.database().ref(`Users/${firebase.auth().currentUser.uid}/Routes`).on("child_added",(snap)=>{
var state = data
state.push(snap.val())
setData(state)
setTimeout(() => {
    setIsLoading(false)   
}, 1000);

})
},[data])

const handleSaveCurrent=(v)=>{
    dispatch(setCurrentRoute(v.route))
}

    return(
        <div>
            {!isLoading &&
            <div className="route-container">
                {data.map((v,i)=>{
                    return(
                <Link style={{textDecoration:"none"}} to="SavedRouteMap"><div className="saved-route" onClick={()=>handleSaveCurrent(v)}>
                    <img src="https://boygeniusreport.files.wordpress.com/2019/12/waze-live-map-virginia-2.jpg?quality=98&strip=all&w=782" className="route-image" width={300}/>
<h1 className="route-name">Route {i+1}</h1>
                </div></Link>
                )
                })
}


            </div>
            }
            
        </div>
    )
}