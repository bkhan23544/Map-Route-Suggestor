import React,{useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom'
import firebase from '../../Config/Firebase'

function Landing(props){

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
          props.settrue()
          props.history.push("/SelectCity")
        }
        })
      })


    return (
        <div className='landing'>
            <div className='dark-overlay landing-inner text-light'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <h1 className='display-3 mb-4'>Vacation Scanner</h1>
                            <p className='lead'>
                                {' '}
                                Check out the best travel offers & compare prices, start planning your next vacation today!
                            </p>
                            <hr />
                            <Link to='/signup' className='btn btn-lg btn-info mr-2'>
                                Sign Up
                            </Link>
                            <Link to='/login' className='btn btn-lg btn-light'>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Landing)