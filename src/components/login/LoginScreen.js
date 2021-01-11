import React, { useContext } from 'react'
import { AuthContext } from '../auth/authContext'
import { types } from '../types/types';

export const LoginScreen = ({ history } ) => {
    
    const { dispatch } = useContext( AuthContext );

    const handleClick = () => {
        // history.replace('/');
        
        dispatch({
            type: types.login,
            payload: {
                name: 'Arturo',
            },
        });

        history.replace('/');


    }
    

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr />
            <button
                className="btn btn-primary"
                onClick={ handleClick }
            >
                Login
            </button>
        </div>
    )
}
