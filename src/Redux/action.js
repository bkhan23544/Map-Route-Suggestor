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



export {setCity,setDestination}