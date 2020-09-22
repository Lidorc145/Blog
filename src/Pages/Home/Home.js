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
            alert: false,
            page: 1
        };

        this.pageCountCheck();
    }


    pageCountCheck() {
        let loadingID = this.props.loading.Start();
        axios.get(`../posts/page/`).then(res => {
            this.setState({pageCount: Math.ceil(res.data[0] / 10)});
            this.props.loading.Stop(loadingID);
        }).catch((err) => {
            this.setState({
                alertType: "error",
                alertData: "DB CONNECTION ERROR: " + err,
                alert: true
            });
            this.props.loading.Stop(loadingID);
        });

    }

    render() {
        return (
            <Container>
                <article className="mainColumn">
                    <PostsList type={this.props.type} full_name={this.props.full_name} history={this.props.history} loading={this.props.loading} parentSetState={this.props.parentSetState} page={this.state.page} />
                    <Pagination count={this.state.pageCount} defaultPage={this.state.page}
                                boundaryCount={this.state.pageCount} variant="outlined" color="primary" onChange={
                        (e, p) => {
                            this.setState({
                                page: p
                            });
                        }}/>
                </article>
                <Snackbar open={this.state.alert} onClose={this.handleAlertClose} autoHideDuration={3000}>
                    <Alert severity={this.state.alertType} elevation={6}
                           variant="filled">{this.state.alertData}</Alert>
                </Snackbar>
                <aside className="sideColumn">
                    <Card>
                        <CardFooter>
                            <Popular history={this.props.history} loading={this.props.loading}/>
                        </CardFooter>
                    </Card>
                </aside>
            </Container>
        );
    }
}