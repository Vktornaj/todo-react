import { Route, Routes } from "react-router-dom";

import Login from "../components/Login";
import Register from "../components/Register";
import Todos from "../components/Todos";
import { PrivateRouete } from "./PrivateRoute";
import { PublicRouete } from "./PublicRoute";


export const AppRouter = () => {
    return (
        <Routes>
            {/* Only public acces */}
            <Route path="login/*" element={
                <PublicRouete>
                        <Route path="/*" element={<Login/>}/>
                </PublicRouete>
            } />
            <Route path="register/*" element={
                <PublicRouete>
                        <Route path="/*" element={<Register/>}/>
                </PublicRouete>
            } />
            {/* Only private access */}
            <Route path="/*" element={
                <PrivateRouete>
                    <Route path="/todos/" element={<Todos/>}/>
                </PrivateRouete>
            }/>
        </Routes>
    )
};
