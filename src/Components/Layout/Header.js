import React from 'react'
import {Link, withRouter} from "react-router-dom"
import firebase from '../../Config/Firebase'


function Header(props){




    const authLinks = (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/Profile'>
                    Profile
                </Link>
            </li>
            <li className='nav-item'>
                <Link onClick={()=> {props.logout()}} to='/'  className='nav-link'>
                    <img
                        className='rounded-circle'
                        src='avatar.png'
                        style={{ width: '25px', marginRight: '5px' }}
                    />{' '}
                    Logout
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                    Sign Up
                </Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                    Login
                </Link>
            </li>
        </ul>
    );



    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
            <div className='container'>
                <Link className='navbar-brand' to='/'>
                    VacationScanner
                </Link>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
                    <span className='navbar-toggler-icon' />
                </button>

                <div className='collapse navbar-collapse' id='mobile-nav'>
                    <ul className='navbar-nav mr-auto'>
                    </ul>
                    {props.user ? authLinks : guestLinks}
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Header)