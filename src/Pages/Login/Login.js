import React from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

function Login(props){
    const handleSubmit = (event) => {
        event.preventDefault()
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
                    console.log(res.data);
                    props.parentSetState(JSON.parse(JSON.stringify(res.data)));
                    props.parentSetState({logged: true, dialog: false});
                    props.parentSetState({ alertType: "success",
                        alertData: "Success: You are connected to the system.",
                        alert: true});

                })
                .catch((err) => {
                    console.error("Error login" + err);
                    props.parentSetState({ alertType: "error",
                        alertData: "Error: "+err,
                        alert: true});
                });
        }
    }

    if (!props.logged) {
        return (
                <form onSubmit={handleSubmit}>
                        <div className="form-group" align="center">
                            <Typography variant="h2" noWrap>LOGIN</Typography>
                            <div className="form-group">
                                <b>Demo
                                    User:</b><br/>Username: demo | Password: demo
                            </div>
                            <div className="form-group ">
                                <input type="username" name="username" className="form-control"
                                       id="inputEmail3"
                                       placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" className="form-control"
                                       id="inputPassword3"
                                       placeholder="Password"/>
                            </div>
                        </div>
                    <Toolbar >
                        <button type="button" className="btn btn-primary">REGISTER
                        </button>
                        <div />
                        <button type="submit" className="btn btn-primary">SIGN IN
                        </button>
                    </Toolbar>
                </form>
        );
    }
    //this.props.history.goBack();
    console.log(props);

    return ("Already Connected!");
}

export default Login;