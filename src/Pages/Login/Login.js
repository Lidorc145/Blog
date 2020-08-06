import React from 'react';

class Login extends React.Component {
    OnChangeUsername(props){
        console.log(props.params);
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let username=event.target.username.value;
        if(username!=null)
            this.props.onLogin(username);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group" align="center">
                <div className="form-group  col-md-6">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><h1>Login</h1>Demo User:<br />Username: demo<br />Password: demo</label>
                </div>
                <div className="form-group  col-md-6">
                    <div className="col-sm-10">
                        <input type="username" name="username" className="form-control" id="inputEmail3" placeholder="Username" onFocusCapture={this.OnChangeUsername}/>
                    </div>
                </div>
                <div className="form-group col-md-6">
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
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
}

export default Login;