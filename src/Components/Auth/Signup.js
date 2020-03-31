import React from 'react'
import TextFieldGroup from '../common/TextFieldGroup';
import history from '../../Config/history'
import firebase from '../../Config/Firebase'
import {withRouter} from 'react-router-dom'


function Signup(props) {

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [firstname,setFirstName] = React.useState("")
    const [lastname,setLastName] = React.useState("")
    const [errorMsg,setErrorMsg] = React.useState("")


    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const signup=(email,password,firstname,lastname)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
          if(user){
            firebase.database().ref(`Users/${user.user.uid}`).set({
              firstname,
              lastname,
              email
            })
props.settrue()
      props.history.push("/SelectCity")
      
          }
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          setErrorMsg(errorMessage)
          setTimeout(() => {
            setErrorMsg("")
          }, 3000);
          // ...
        })
      }
      


    return (
        <div style={{color:"white"}} className='register'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Sign Up</h1>
                        <p className='lead text-center'>Create your VacationScanner account</p>
                        <form>
                            <TextFieldGroup
                                placeholder='First Name'
                                name='firstname'
                                value={firstname}
                                onChange={onChangeFirstName}
                            />
                            <TextFieldGroup
                                placeholder='Last Name'
                                name='lastname'
                                value={lastname}
                                onChange={onChangeLastName}
                            />
                            <TextFieldGroup
                                placeholder='Email'
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
                            />
                            <input value="Sign Up" onClick={()=>signup(email,password,firstname,lastname)} className='btn btn-info btn-block mt-4'/>
                            {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default withRouter(Signup)