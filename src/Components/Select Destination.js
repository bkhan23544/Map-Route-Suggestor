import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function SelectDestination(){


    const city = useSelector(state => state.setCity)
    const destinations=[{Amsterdam:{},
    Barcelona:{},
Budapest:{}}]



    return(
        <div>

             <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Secondary"
      />
            <div>Insert Button Here</div>
        </div>
    )
}
