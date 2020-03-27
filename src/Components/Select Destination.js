import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setDestination} from '../Redux/action'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import '../App.css'

export default function SelectDestination() {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        checked1: false,
        checked2: false,
        checked3: false,
    });


    const [selected, setSelected] = React.useState([])
//Creates an array of locations selected with their latitude and longitude
    const handleChange = (event, v) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        var select = selected
        if (event.target.checked) {
            select.push(v)
            setSelected(select)
        }
        else {
            setSelected(select.filter(item => item.name !== v.name))
        }
    };
//Saves destinations in Redux
    const handleSaveDestinations=()=>{
        var destination = selected
        destination.unshift(hotels[city])
        dispatch(setDestination(destination))
    }

    console.log(selected, "selected")
//Cities with their destinations and lat lng
    const city = useSelector(state => state.setCity)
    const destinations = {
        Amsterdam: [
            { name: "Eye Film Museusm", lat: 52.3843, lng: 4.9009 },
            { name: "Dam Square", lat: 52.3731, lng: 4.8926 },
            { name: "Anne Frank House", lat: 52.3752, lng: 4.8840 }
        ],
        Barcelona: [
            { name: "Basilica de la Sagrada Familia", lat: 41.4036, lng: 2.1744 },
            { name: "Gothic Quarter", lat: 41.3819, lng: 2.1782 },
            { name: "Casa Mila", lat: 41.3954, lng: 2.1620 },
        ],
        Budapest: [
            { name: "Buda Castle", lat: 47.4962, lng: 19.0396 },
            { name: "St. Stephen's Basilica", lat: 47.5009, lng: 19.0540 },
            { name: "Fisherman's Bastion", lat: 47.5022, lng: 19.0348 },
        ]
    }

    const hotels = {
        Amsterdam: {name:"Hotel TwentySeven",lat:52.3725,lng:4.8933},
        Barcelona: {name:"Hotel Colonial Barcelona",lat:41.3823,lng:2.1807},
        Budapest:{name:"Buda Castle Fashion Hotel",lat:47.5019,lng:19.0311}
    }



    return (
        <div className="App">
            <div className="Paper">
                <center><h2>Select Destinations</h2></center>
                <FormGroup column="true">
                    {destinations[city].map((v, i) => {
                        return (
                            <FormControlLabel
                                style={{ marginLeft: "20px" }}
                                control={<Checkbox color="primary" checked={state["checked" + (i + 1)]} onChange={(e) => handleChange(e, v)} name={"checked" + (i + 1)} />}
                                label={v.name}
                            />
                        )
                    })
                    }
                </FormGroup>

            </div>
            <Link to="/MapRoute">
                <Button onClick={handleSaveDestinations} style={{ marginTop: "20px" }} variant="contained" color="primary">
                    Next
                        </Button>
            </Link>
        </div>
    )
}
