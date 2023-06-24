import { useContext, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { AuthContext } from "../contexts/AuthProvider";
import { UserLogin } from "../types/userTypes";
import SubmitButton from "./SubmitButton";
import authService from "../services/auth.service";
import styles from "./login.module.css";

enum Status {
    INITIAL = "INITIAL",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING"
}

const Login = () => {

    const { login } = useContext(AuthContext);
    const [status, setStatus] = useState<Status>(Status.INITIAL);
    const [searchParams] = useSearchParams();
    let username = searchParams.get("username"); 
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userLogin: UserLogin = {
            username: e.currentTarget.inputUsername1.value,
            password: e.currentTarget.inputPassword1.value
        }
        setStatus(Status.LOADING);
        authService.postLogin(userLogin)
            .then(res => {
                login(res);
                setStatus(Status.SUCCESS);
                <Navigate to="/" replace={true} />
            })
            .catch(e => {
                console.error("Error login: ", e);
                setStatus(Status.ERROR);
            });
    }
    
    return(
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="inputUsername1">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputUsername1" 
                        defaultValue={username || ""}
                    />
                    <small 
                        id="usernameHelp" 
                        className={styles.msg_wrong_credentials}
                        style={{ display: status === Status.ERROR ? "block" : "none" }}
                    >
                        Wrong username or password
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword1">Password</label>
                    <input type="password" className="form-control" id="inputPassword1"/>
                </div>
                <SubmitButton isSending={status === Status.LOADING} />
            </form>
        </div>
    )
};

export default Login;