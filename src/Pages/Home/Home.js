import PostsList from "../Posts/PostsList";
import Popular from "../../Components/Popular";
import Latest from "../../Components/Latest";
import React from "react";
import CardFooter from "reactstrap/es/CardFooter";
import {Card, Snackbar} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageCount: 1,
            alertType: "",
            alertData: "",
            alert: false};
        this.pageCountCheck();
    }


    pageCountCheck() {
        axios.get(`../posts/page/`).then(res => {
            //console.log(res.data[0]);
            this.setState({pageCount: Math.ceil(res.data[0] / 10)});
        }).catch((err) => {
            this.setState({
                alertType: "error",
                alertData: "DB CONNECTION ERROR: " + err,
                alert: true
            });
        });

    }

    render() {
        return (
            <Container>
                <article className="mainColumn">
                    <PostsList {...this.props} />
                    <Pagination count={this.state.pageCount} defaultPage={this.props.page.num}
                                boundaryCount={this.state.pageCount} variant="outlined" color="primary" onChange={
                        (e, p) => {
                            this.props.parentSetState({
                                page: {

                                    num: p
                                }
                            })
                        }}/>
                </article>
                <Snackbar open={this.state.alert} onClose={this.handleAlertClose} autoHideDuration={3000}>
                    <Alert severity={this.state.alertType} elevation={6}
                           variant="filled">{this.state.alertData}</Alert>
                </Snackbar>
                <aside className="sideColumn">
                    <Card>
                        <CardFooter>
                            <Popular/>
                        </CardFooter>
                        <CardFooter>
                            <Latest/>
                        </CardFooter>
                    </Card>
                </aside>
            </Container>
        );
    }
}