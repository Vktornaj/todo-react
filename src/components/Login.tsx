import { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthProvider";
import { UserLogin } from "../types/userTypes";
import SubmitButton from "./SubmitButton";


const Login = () => {

    const { login } = useContext(AuthContext);
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userLogin: UserLogin = {
            username: e.currentTarget.inputUsername1.value,
            password: e.currentTarget.inputPassword1.value
        }
        login(userLogin);
        setIsSending(true);
    }
    
    return(
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="inputUsername1">Username</label>
                    <input type="text" className="form-control" id="inputUsername1" aria-describedby="usernameHelp"/>
                    <small id="usernameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword1">Password</label>
                    <input type="password" className="form-control" id="inputPassword1"/>
                </div>
                <SubmitButton isSending={isSending} />
            </form>
        </div>
    )
};

export default Login;