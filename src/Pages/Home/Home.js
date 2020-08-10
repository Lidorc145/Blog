import PostsList from "../Posts/PostsList";
import Popular from "../../Components/Popular";
import Latest from "../../Components/Latest";
import React from "react";
import CardFooter from "reactstrap/es/CardFooter";
import {Card} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageCount: 1};
        this.pageCountCheck();
    }

     pageCountCheck() {
         axios.get('posts/page/').then(res => {
            console.log(res.data[0]);
            this.setState({pageCount: Math.ceil(res.data[0]/10)});
        }).catch((err) => {
            this.props.parentSetState({
                alertType: "error",
                alertData: "DB CONNECTION ERROR: " + err,
                alert: true
            });
        });

    }

    render(props) {
        return (
            <div>
                <Container>
                    <article className="mainColumn">
                        <PostsList {...this.props} />
                        <Pagination count={this.state.pageCount} boundaryCount={this.state.pageCount} variant="outlined" color="primary" onChange={
                            (e, p) => {
                                this.props.parentSetState({
                                    page: {

                                        num: p
                                    }
                                })
                            }}/>
                    </article>
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
            </div>
        );
    }
}