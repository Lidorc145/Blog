import React from 'react';
import axios from "axios";
import {Typography, Button} from "@material-ui/core";
import {FacebookLoginButton, GoogleLoginButton, TwitterLoginButton} from "react-social-login-buttons";
import * as Styles from "../../Styles.js";

function Login (props) {
    const {history} = props;
    const classes = Styles.default()();

    const routeChange = (path) => {
        history.push(path);
        props.parentSetState({dialog: false});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;
        if (username != null && password != null) {
            let url = "../logging/";
            let data = {
                username: username,
                password: password
            };
            axios.post(url, data)
                .then((res) => {
                    props.parentSetState(JSON.parse(JSON.stringify(res.data)));
                    props.parentSetState({logged: true, dialog: false});
                    props.parentSetState({
                        alertType: "success",
                        alertData: "Success: You are connected to the system.",
                        alert: true,
                        dialog: false
                    });
                })
                .catch((err) => {
                    console.error("Error login" + err);
                    props.parentSetState({
                        alertType: "error",
                        alertData: "Error: " + err,
                        alert: true
                    });
                });
        }
    }


    if (!props.logged) {
        return (
            <form onSubmit={handleSubmit} className={classes.Forms}>

                <Typography paragraph variant="h2" diaply={'block'} align={'center'}>{"LOGIN"}</Typography>


                <Typography diaply={'block'} align={'center'} variant="subtitle1">
                    <b>Demo User:</b>
                </Typography>
                <Typography paragraph diaply={'block'} align={'center'} component={'span'} variant="subtitle2">
                    Username: demo | Password: demo
                </Typography>
                <div align={"center"} className={classes.grow}>
                <input type="username" name="username" className={"form-control form-input"}
                       id="username"
                       placeholder="Username"/>

                <input type="password" name="password" className="form-control form-input"
                       id="password"
                       placeholder="Password"/>

                <Button className={classes.LoginButtons}  type="button" onClick={(p) => routeChange('/Register')}
                        size="large" color="secondary" variant="contained">
                    REGISTER
                </Button>
                <Button className={classes.LoginButtons} type="submit" size="large" variant="contained"
                        color="primary">
                    SIGN IN
                </Button>
                </div>

                <GoogleLoginButton onClick={() => alert("soon...")}/>
                <FacebookLoginButton onClick={() => alert("soon...")}/>
                <TwitterLoginButton onClick={() => alert("soon...")}/>

            </form>
        );
    }else {
        return ("Already Connected!");
    }
}

export default Login;