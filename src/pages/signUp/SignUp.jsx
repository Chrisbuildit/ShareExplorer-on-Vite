import React, { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext} from "../../context/AuthContext";
import InputField from "../../components/inputfield/InputField";


function SignUp() {
    const [ email, setEmail ] = useState( "" )
    const [ username, setUsername ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [check, toggleCheck] = useState(false);
    const [error, toggleError] = useState("")

    const { login } = useContext( AuthContext )

    async function registerUser(e) {
        e.preventDefault()
        toggleError(false);

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',{
                email: email,
                username: username,
                password: password,
                // role: role,
                role: ["user"],
            })
            console.log(response);
            console.log( "De gebruiker is geregistreerd 👤" )
            // Ga hier eens kijken hoe je vervolgens een request maakt om een gebruiker in te loggen
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',{
                username: username,
                password: password
            });
            // Ga eens kijken wat je allemaal terug krijgt en stuur die data naar de Context
            console.log(result);
            login( result.data, result.data.accessToken );

        } catch ( e ) {
            console.error( e )
            toggleError(true);
        }
    }

    return (
        <main className="SignUpIn mountain-top">
            <form onSubmit={ registerUser }>
                <InputField label="Email:" type="email" value={ email } setState={setEmail}/>
                <InputField label="Username:" type="text" value={ username } setState={setUsername}/>
                <InputField label="Password:" type={check ? "text" : "password"} value={ password } setState={setPassword}/>
                <section className="CheckBox">
                    <label><b>Show password</b></label>
                    <input type="checkbox" checked={ check } onChange={() => toggleCheck(!check)}/>
                </section>
                {/*<InputField label="Role:" type="text" value={ role } setState={setRole}/>*/}
                {error && <p className="error">There is already an account for the email address. Go to the Sign-in page</p>}
                <button type="submit">Sign Up</button>
            </form>
        </main>
    );
}

export default SignUp;