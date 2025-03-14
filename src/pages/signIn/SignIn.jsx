import React, { useContext, useState } from 'react';
import { AuthContext} from "../../context/AuthContext";
import axios from "axios";
import InputField from "../../components/inputfield/InputField";
import {Link} from "react-router-dom";
import './SignIn.css';
import "../../components/inputfield/InputField.css";

function SignIn() {
const [ username, setUsername ] = useState( "" )
const [ password, setPassword ] = useState( "" )
const [check, toggleCheck] = useState(false);

const [error, toggleError] = useState(false)

const { login } = useContext( AuthContext )

async function handleLogin(e) {
    e.preventDefault();
    toggleError(false);
    try {
        const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
            username: username,
            password: password,
        })
        login( response.data, response.data.accessToken )
    } catch ( e ) {
        console.error( e )
        toggleError(true)

    }
}

return (
    <div className="Mountains">
        <h2 className="NoAccount">Do you not have an account? <Link to="/SignUp">Register</Link> first.</h2>
        <main className="SignUpIn">
            <form onSubmit={ handleLogin }>
                <section className='Inputfields'>
                <InputField label="Username:" type="text" value={ username } setState={setUsername}/>
                <InputField label="Password:" type={check ? "text" : "password"} value={ password } setState={setPassword}/>
                </section>
                <section className="CheckBox">
                    <label><b>Show password</b></label>
                    <input type="checkbox" checked={ check } onChange={() => toggleCheck(!check)}/>
                </section>
                {error && <p className="error"><b>Combination of username and password is incorrect.</b></p>}
                <button type="submit">Sign In</button>
            </form>
        </main>
    </div>
);
}
export default SignIn;