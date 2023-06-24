import { useState } from "react";
import {createSearchParams, useNavigate} from 'react-router-dom';

import { UserRegister } from "../types/userTypes";
import authService from "../services/auth.service";
import SubmitButton from "./SubmitButton";


const Register = () => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userRegister: UserRegister = {
            username: e.currentTarget.inputUsername1.value,
            firstName: e.currentTarget.inputFirstName1.value,
            lastName: e.currentTarget.inputLastName1.value,
            password: e.currentTarget.inputPassword1.value
        }
        setIsSending(true);
        authService.postRegister(userRegister)
            .then(
                user => {
                    setIsSending(false);
                    navigate({
                        pathname: "/login",
                        search: createSearchParams({ 
                            username: user.username 
                        }).toString()
                    });
                }
            )
            .catch(
                e => {
                    console.error("Error register: ", e);
                    setIsSending(false);
                }
            );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAvailable(null);
        authService.getUsernameAvailability(e.target.value)
            .then(
                (res) => setIsAvailable(res.isAvailable === "true")
            )
    }

    return(
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="inputUsername1">Username</label>
                    <input 
                        onChange={ handleChange } 
                        type="text" 
                        className="form-control" 
                        id="inputUsername1" 
                        aria-describedby="usernameHelp"
                    />
                    { isAvailable === true &&
                        <small id="usernameHelp" style={{ color: "green" }}>Username available</small>
                    }
                    { isAvailable === false &&
                        <small id="usernameHelp" style={{ color: "red" }}>Username unavailable</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="inputFirstName1">First Name</label>
                    <input type="text" className="form-control" id="inputFirstName1"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputLastName1">Last Name</label>
                    <input type="text" className="form-control" id="inputLastName1"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword1">Password</label>
                    <button type="button" onClick={ () => setIsShowPassword(!isShowPassword) }>
                            {isShowPassword ? "Hide" : "Show"}
                    </button>
                    <input 
                        type={ isShowPassword ? "text" : "password" }
                        className="form-control" 
                        id="inputPassword1"
                    />
                </div>
                <SubmitButton isSending={ isSending }/>
            </form>
        </div>
    )
};

export default Register;