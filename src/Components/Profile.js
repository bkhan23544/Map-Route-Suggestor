import React,{useEffect} from 'react'
import firebase from '../Config/Firebase'


export default function Profile(){

const [data,setData] = React.useState({})

useEffect(()=>{
 
firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).on("value",(snap)=>{
setData(snap.val())
})

},[])
    



    return (
        <div className='card card-body bg-light mb-3'>
            <div className='column'>
                    <img src='avatar.png' width={100} alt='' className='rounded-circle' />
               
                <div>
                    {data.firstname!==undefined &&<h3>
                        {data.firstname+" "+data.lastname}
                    </h3>}
                    {data.email!==undefined && <p>{data.email}</p>}
                    <p>
                    </p>

                </div>
            </div>
        </div>
    );
}