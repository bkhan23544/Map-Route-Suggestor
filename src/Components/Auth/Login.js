import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import {Link,withRouter} from 'react-router-dom'
import history from '../../Config/history'
import firebase from '../../Config/Firebase'


function Login(props){

const [email,setEmail] = React.useState("")
const [password,setPassword] = React.useState("")
const [error,setError] = React.useState("")

const onChangeEmail=(e)=>{
setEmail(e.target.value)
}

const onChangePassword=(e)=>{
    setPassword(e.target.value)
}



const login=(email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
      props.settrue(true)
      props.history.push("/SelectCity")
  
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorMessage)
      setTimeout(() => {
        setError("")
      }, 3000);
      // ...
    });
  }


    return (
        <div style={{color:"white"}} className='login'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Log In</h1>
                        <p className='lead text-center'>Sign in to your VacationScanner account</p>
                        <form>
                            <TextFieldGroup
                                placeholder='Email Address'
                                name='email'
                                type='email'
                                value={email}
                                onChange={onChangeEmail}
                            />

                            <TextFieldGroup
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={onChangePassword}
                                // error={errors.password}
                            />
                       <input value="Login" onClick={()=>login(email,password)} className='btn btn-info btn-block mt-4' />
                            {error && <p style={{color:"red",backgroundColor:"white"}}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login)

