const setCity = (data)=>{
    return{
        type:'SETCITY',
        data:data
    }
}


const setDestination = (data)=>{
    return{
        type:'SETDESTINATION',
        data:data
    }
}

const setTime = (data)=>{
    return{
        type:'SETTIME',
        data:data
    }
}

const setCurrentRoute = (data)=>{
    return{
        type:'SETCURRENTROUTE',
        data:data
    }
}



export {setCity,setDestination,setTime,setCurrentRoute}