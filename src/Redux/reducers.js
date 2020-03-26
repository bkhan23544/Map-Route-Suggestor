import {combineReducers} from 'redux';


const setCity=(state="",action)=>{
    switch(action.type){
        case 'SETCITY':
            return action.data
        default:
            return state    
    }
}


const rootReducer=combineReducers({
    setCity:setCity,
   
})

export default rootReducer