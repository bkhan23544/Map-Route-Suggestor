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

const setTime=(state=null,action)=>{
    switch(action.type){
        case 'SETTIME':
            return action.data
        default:
            return state    
    }
}

const setCurrentRoute=(state=null,action)=>{
    switch(action.type){
        case 'SETCURRENTROUTE':
            return action.data
        default:
            return state    
    }
}

const rootReducer=combineReducers({
    setCity:setCity,
    setDestination:setDestination,
    setTime:setTime,
    setCurrentRoute:setCurrentRoute
   
})

export default rootReducer