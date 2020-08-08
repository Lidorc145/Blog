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
import {AppBar, Toolbar} from '@material-ui/core';
import axios from "axios";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            username: null,
            full_name:null,
            type: null,
            logged: false
        };
        this.parentSetState = this.parentSetState.bind(this);
        this.sessionCheck();
    }

    parentSetState(jsonState) {
        this.setState(jsonState);
    }

    async sessionCheck(){
        let url = "sessionCheck/";
        await axios.post(url)
            .then((res) => {
                this.setState(res.data);
                this.setState({logged: true});
            })
            .catch((err) => {
                console.log("Error Session: "+err);
                this.setState({id:null, username:null, full_name:null,type:null});
                this.setState({logged: false});
            });
    }

// <Login parentSetState={this.parentSetState} appState={this.state}/>
    render(props) {
        console.log({s: this.state});
        return (
            <div className="App">
                    <BrowserRouter>
                    <header>
                        <AppBar style={{background: "#ffffff"}}>
                            <Toolbar variant="dense">
                                <NavBar username={this.state.username}  appState={this.state} />
                            </Toolbar>
                        </AppBar>
                        <Toolbar id="back-to-top-anchor"/>


                    </header>
                    <Switch>
                        <Route path="/AboutMe" component={AboutMe}/>
                        <Route path="/Post/:id" component={PostPageView}/>
                        <Route path="/NewPost" render={(props) => <NewPost parentSetState={this.parentSetState} {...props} {...this.state} isAuthenticated={true}/>}/>
                        <Route path="/Login" render={(props) => <Login parentSetState={this.parentSetState} {...props} {...this.state} isAuthenticated={true}/>}/>
                        <Route path="/Home" component={Home}/>
                        <Redirect from="/" to="/Home"/>
                    </Switch>
                </BrowserRouter>

                <Footer/>
            </div>
        );
    }
}



export default App;
