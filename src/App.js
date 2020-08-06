import React from 'react';
import {
    BrowserRouter as Router,
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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            username: null,
        };
        this.onLogin = this.onLogin.bind(this)
    }
    onLogin(props){
        this.setState({username: props});
    }


    render(){
        console.log('user is:' +this.state.username);

        return (
            <div className="App" >
                <Router>
                    <header>
                        <AppBar color="transparent">
                            <Toolbar>
                                <NavBar username={this.state.username} />
                            </Toolbar>
                        </AppBar>
                        <Toolbar id="back-to-top-anchor" />

                    </header>
                    <Switch>
                        <Route path="/AboutMe" component={AboutMe}/>
                        <Route path="/Post/:id" component={PostPageView} />
                        <Route path="/NewPost" component={NewPost} />
                        <Route path="/Login"><Login onLogin={this.onLogin} /></Route>
                        <Route path="/Home" component={Home} />
                        <Redirect from="/" to="/Home" />
                    </Switch>
                </Router>
                <Footer />
            </div>
        );
    }
}



export default App;
