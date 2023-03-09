import { useContext } from "react";
import { Navigate, Routes } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";


interface Props {
    children: JSX.Element | JSX.Element[]   
};

export const PublicRouete = ({ children }: Props): JSX.Element => {

    const { auth } = useContext(AuthContext);

    if (auth){
        return <Navigate to={'/'} />;
    }

    return (<Routes>{children}</Routes>)
};