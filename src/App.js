import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home/Home';
import AboutMe from './Pages/AboutMe/AboutMe';
import NewPost from "./Pages/Posts/NewPost";
import PostPageView from "./Pages/Posts/PostPageView";
import Login from "./Pages/Login/Login";
import {AppBar, Snackbar, Toolbar} from '@material-ui/core';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import DialogSlideUP from "./Components/DialogSlideUP";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: null,
            full_name:null,
            type: null,
            logged: false,
            alert: null,
            alertType: null,
            alertData: null,
            dialog: false,
            dialogContext: "akakakak",
            page: {
                name: 'Home',
                num: 1
            },
            parentSetState: this.parentSetState.bind(this)
        };
        this.parentSetState = this.parentSetState.bind(this);
        this.sessionCheck();
    }

    parentSetState(jsonState) {
        this.setState(jsonState);
    }

    async sessionCheck(){
        let url = "./sessionCheck/";
        await axios.post(url)
            .then((res) => {
                this.setState(res.data);
                this.setState({logged: true});
            })
            .catch((err) => {
                console.error("Error Session: "+err);
                this.setState({id:null, username:null, full_name:null,type:null});
                this.setState({logged: false});
            });
    }

    handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({alert: false});
    };

    render(props) {
        console.log(this.state);
        return (
            <div className="App">
                    <BrowserRouter>
                    <header>
                        <AppBar style={{background: "#ffffff"}}>
                            <NavBar {...this.state}/>
                        </AppBar>
                        <Toolbar id="back-to-top-anchor"/>


                    </header>
                    <Switch>
                        <Route path="/AboutMe" component={AboutMe}/>
                        <Route path="/Post/:id" component={PostPageView}/>
                        <Route path="/NewPost" render={() => <NewPost {...props} {...this.state} isAuthenticated={true}/>}/>
                        <Route path="/Login" render={() => <Login  {...this.state} isAuthenticated={true}/>}/>
                        <Route path="/Home" render={() => <Home {...this.state} />} />
                        <Redirect from="/" to="/Home"/>
                    </Switch>
                </BrowserRouter>
                <Snackbar open={this.state.alert} onClose={this.handleAlertClose} autoHideDuration={3000}>
                    <Alert severity={this.state.alertType} elevation={6}
                           variant="filled">{this.state.alertData}</Alert>
                </Snackbar>
                <DialogSlideUP open={this.state.dialog} {...this.state}  parentSetState={this.parentSetState} dialof={this.state.dialog} dialogContent={<Login {...this.state}  parentSetState={this.parentSetState}/>} />
                <Footer/>
            </div>
        );
    }

     handleSubmit = (event) => {
        event.preventDefault()
        let username = event.target.username.value;
        let password = event.target.password.value;
        if (username != null && password != null) {
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
                    console.error("Error login" + err);
                });
        }
    }


}



export default App;
