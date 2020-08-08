import React from 'react';
import axios from "axios";

class Login extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault()
        let username=event.target.username.value;
        let password=event.target.password.value;
        if(username!=null && password!=null){
            let url = "logging/";
            let data = {
                username: username,
                password: password
            };
            axios.post(url, data)
                .then((res) => {
                    console.log(res.data);
                    this.props.parentSetState(JSON.parse(JSON.stringify(res.data)));
                    this.props.parentSetState({logged: true});
                    this.props.history.goBack();

                })
                .catch((err) => {
                    console.error("Error login"+err);
                });
        }
    }

    render(props) {
        if(!this.props.logged){
            return (
                <form onSubmit={this.handleSubmit}>
                    {console.log(this.history)}
                    <div className="form-group" align="center">
                        <div className="form-group  col-md-6">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><h1>Login</h1>Demo
                                User:<br/>Username: demo<br/>Password: demo</label>
                        </div>
                        <div className="form-group  col-md-6">
                            <div className="col-sm-10">
                                <input type="username" name="username" className="form-control" id="inputEmail3"
                                       placeholder="Username"/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="col-sm-10">
                                <input type="password" name="password" className="form-control" id="inputPassword3"
                                       placeholder="Password"/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            );
        }
        //this.props.history.goBack();
        console.log(this.props);
        return ("Already Connected!");
    }
}
export default Login;