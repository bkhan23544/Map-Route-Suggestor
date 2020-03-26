import {combineReducers} from 'redux';


const setCity=(state="Amsterdam",action)=>{
    switch(action.type){
        case 'SETCITY':
            return action.data
        default:
            return state    
    }
}

const setDestination=(state=[],action)=>{
    switch(action.type){
        case 'SETDESTINATION':
            return action.data
        default:
            return state    
    }
}

const rootReducer=combineReducers({
    setCity:setCity,
    setDestination:setDestination
   
})

export default rootReducer