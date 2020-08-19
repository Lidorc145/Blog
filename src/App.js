import React from 'react';
import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home/Home';
import AboutMe from './Pages/AboutMe/AboutMe';
import NewPost from "./Pages/Posts/NewPost";
import PostPageView from "./Pages/Posts/PostPageView";
import Register from "./Pages/Login/Register";
import {AppBar, Snackbar} from '@material-ui/core';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Cookies from 'js-cookie';

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
            parentSetState: this.parentSetState.bind(this),
            data: null,
            sessionID: null
        };
        if(this.state.data!=null) {
            console.log(this.state.data);
            this.setState({data: this.pageCountCheck()});
        }
        this.parentSetState = this.parentSetState.bind(this);
        //;
        if(this.state.sessionID===null) {
            this.sessionCheck();
        }
    }

    parentSetState(jsonState) {
        this.setState(jsonState);
    }
    async pageCountCheck() {
        await axios.get(`posts/page5/`).then(res => {
           // console.log(res.data[0]);
            // this.setState({pageCount: Math.ceil(res.data[0]/10)});
        }).catch((err) => {
            this.setState({
                alertType: "error",
                alertData: "DB CONNECTION ERROR: " + err,
                alert: true
            });
        });
    }

    sessionCheck(){
        if(Cookies.get('sessionID')!=null) {
            let url = "./sessionCheck/";
            axios.post(url)
                .then((res) => {
                    this.setState({logged: true, sessionID: Cookies.get('sessionID') } + res.data);
                })
                .catch((err) => {
                    console.error("Error Session: " + err);
                    this.setState({sessionID: false, id: null, username: null, full_name: null, type: null, logged: false});
                });
        }
    }

    handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({alert: false});
    };

    render(props) {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <header>
                            <AppBar>
                                <Route component={(props) => <NavBar {...props} {...this.state} />}/>
                            </AppBar>

                        </header>
                    </div>
                    <div id="wide">
                        <Switch>
                            <Route path="/AboutMe" component={AboutMe}/>
                            <Route path="/Post/:id" component={PostPageView}/>
                            <Route path="/NewPost" component={(props) => <NewPost {...props} {...this.state}
                                                                                  isAuthenticated={true}/>}/>
                            <Route path="/Home" component={(props) => <Home {...props} {...this.state} />}/>
                            <Route path="/Register" render={(props) => <Register {...props} {...this.state} />}/>
                            <Redirect exact from="/" to="/Home"/>
                        </Switch>
                    </div>
                    <Snackbar open={this.state.alert} onClose={this.handleAlertClose} autoHideDuration={3000}>
                        <Alert severity={this.state.alertType} elevation={6}
                               variant="filled">{this.state.alertData}</Alert>
                    </Snackbar>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}



export default App;
