import React from 'react';
import {BrowserRouter, Redirect, Switch, Route} from "react-router-dom";
import './App.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Home from './Pages/Home/Home';
import AboutMe from './Pages/AboutMe/AboutMe';
import NewPost from "./Pages/Posts/NewPost";
import PostPageView from "./Pages/Posts/PostPageView";
import SignUp from "./Pages/Login/SignUp";
import {AppBar, Snackbar} from '@material-ui/core';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Cookies from 'js-cookie';
import LinearProgress from "@material-ui/core/LinearProgress";
import Tags from "./Pages/Tags/Tags"
import TagsPostsList from "./Pages/Tags/TagsPostsList"
console.log("dasdasd");
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
            dialogContext: "dialogContext",
            parentSetState: this.parentSetState.bind(this),
            sessionCheck: this.sessionCheck.bind(this),
            data: null,
            sessionID: undefined,
            loadingState: false
        };

        let loadingList = [];
        let loadingID = 1;
        this.loadingStart = () =>{
            loadingList.push(loadingID);
            this.setState({loadingState: true});
            return loadingID++;
        }
        this.loadingStop = (ID) =>{
            let index = loadingList.indexOf(ID);
            if (index > -1) {
                loadingList.splice(index, 1);
            }
            if(loadingList.length===0) {
                this.setState({loadingState: false});
            }
        }

        this.parentSetState = this.parentSetState.bind(this);
        this.loadingStart=this.loadingStart.bind(this);
        this.loadingStop=this.loadingStop.bind(this);

        if(this.state.sessionID===undefined) {
            this.sessionCheck().finally(()=>{console.log(this.state)});
        }
    }


    parentSetState(jsonState) {
        this.setState(jsonState);
    }

    async sessionCheck(){
        console.log("start");
        if(Cookies.get('sessionID')!=null) {
            let loadingID = this.loadingStart();
            let url = "/sessionCheck/";
            await (axios.post(url)
                .then((res) => {
                    console.log("session",Object.assign({logged: true, sessionID: Cookies.get('sessionID')},res.data));
                    this.setState(Object.assign({logged: true, sessionID: Cookies.get('sessionID')},res.data));
                }).catch((err) => {
                    this.setState({sessionID: null});
                    this.parentSetState({
                        alertType: "error",
                        alertData: "SESSION ERROR: " + err,
                        alert: true
                    })}));
            this.loadingStop(loadingID);
        }
        console.log("stop");
    }

    handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({alert: false});
    };

    handleAddToHomescreenClick = () => {
        alert(`
    1. Open Share menu
    2. Tap on "Add to Home Screen" button`);
    };

    render(props) {
        let loading={
            Start: this.loadingStart,
            Stop:  this.loadingStop
        }
        return (
            <div>
                <BrowserRouter>
                    <div id="appBar">
                        <header>
                            <AppBar>
                                <Route component={(props) => <NavBar {...props} {...this.state} />}/>
                                {this.state.loadingState && <LinearProgress />}
                            </AppBar>

                        </header>
                    </div>
                    <div id="wide">{ !(Cookies.get('sessionID')!=null && this.state.sessionID===undefined) &&
                         <Switch>
                            <Route path="/AboutMe" render={()=><AboutMe/>}/>
                            <Route path="/Post/:id" render={(props)=><PostPageView history={props.history} loading={loading} postID={props.match.params.id} parentSetState={this.parentSetState}/>}/>
                            <Route path="/Tags/id/:tagID" render={(props)=><TagsPostsList tagID={props.match.params.tagID} loading={loading}  history={props.history} />}/>
                             <Route path="/Tags/" render={(props)=><Tags loading={loading}  history={props.history} />}/>

                             <Route path="/NewPost" render={(props) => <NewPost {...props} {...this.state} loading={loading}
                                                                                  isAuthenticated={true}/>}/>
                            <Route path="/Edit/Post/:id" render={(props) => <NewPost {...props} {...this.state} loading={loading}
                                                                                  isAuthenticated={true}/>}/>
                            <Route path="/Home" render={(props) => <Home type={this.state.type} full_name={this.state.full_name} history={props.history} loading={loading} parentSetState={this.parentSetState} />}/>
                            <Route path="/SignUp" render={(props) => <SignUp {...props} {...this.state} />}/>
                            <Route render={()=>(<Redirect from="/" to="/Home"/>)} />
                        </Switch>}
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
