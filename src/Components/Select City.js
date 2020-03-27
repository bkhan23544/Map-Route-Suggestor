import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setCity,setTime} from '../Redux/action'
import {useDispatch } from 'react-redux'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';



const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
        backgroundColor: "white",
        width: 420,
        marginTop: 100
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SeleceCity() {

    const dispatch = useDispatch();


    const cities = ["Amsterdam", "Budapest", "Barcelona"]
    const classes = useStyles();
    const [city, setCities] = React.useState('Amsterdam');


    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());

    const handleStartTimeChange = date => {
        setStartTime(date);
    };

    const handleEndTimeChange = date => {
        setEndTime(date);
    };


    const handleChange = event => {
        setCities(event.target.value);
        dispatch(setCity(event.target.value))
    };

    const saveTime =() => {
       var time = (endTime-startTime)/1000
       dispatch(setTime(time))
    };


    return (
        <div>
            <div>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={city}
                        onChange={handleChange}
                        label="Select City"
                    >
                        {cities.map((v, i) => {
                            return (
                                <MenuItem key={i} value={v}>{v}</MenuItem>
                            )
                        })}


                    </Select>
                </FormControl>


                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            style={{ backgroundColor: "white", margin: "10px", width: "200px" }}
                            margin="normal"
                            id="time-picker"
                            label="Start Time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />

                        <KeyboardTimePicker
                            style={{ backgroundColor: "white", margin: "10px", width: "200px" }}
                            margin="normal"
                            id="time-picker"
                            label="End Time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div>
                    <Link to="SelectDestination">
                        <Button onClick={saveTime} variant="contained" color="primary">
                            Next
                        </Button>
                    </Link>
                    <h3 style={{color:"white"}}>OR</h3>
                    <Link to="SavedRoutes"><Button variant="contained" color="primary">Go To Saved Routes</Button></Link>
                    </div>

            </div>
        </div>
    )
}

