import {observer} from "mobx-react-lite";
import {userSession} from "../models/users/userSession";
import {useState} from "react";
import {Link} from "react-router-dom";
import routesPaths from "./routes/routesPaths";

const HomePage = observer(() => {
    return (
        <div className="page home-page">
            <h1 className="txt-header--1">Tuna!</h1>
            {userSession.userName
                ? <p data-tid="greeting-message">Hello {userSession.userName} 👋</p>
                : <p>Please <Link to={routesPaths.login}>sign up</Link> and enjoy using Tuna</p>}
        </div>
    );
});

export default HomePage;
