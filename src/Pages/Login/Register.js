import React from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {FacebookLoginButton, GoogleLoginButton, TwitterLoginButton} from "react-social-login-buttons";
import * as Styles from "../../Styles.js";
import {Field, Form, Formik} from 'formik';
import {TextField} from "@material-ui/core";

function Register(props) {
    const classes = Styles.default()();
    console.log(props);
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target);
        let fullName = event.target.fullName.value;
        let username = event.target.username.value;
        let password = event.target.password.value;
        if (username != null && password != null) {
            let url = "../register/";
            let data = {
                full_name: fullName,
                username: username,
                password: password
            };
            axios.post(url, data)
                .then((res) => {
                    console.log(res.data);
                    props.parentSetState(JSON.parse(JSON.stringify(res.data)));
                    props.parentSetState({logged: true, dialog: false});
                    props.parentSetState({
                        alertType: "success",
                        alertData: "Success: You are connected to the system.",
                        alert: true
                    });

                })
                .catch((err) => {
                    console.error("Error login" + err);
                    props.parentSetState({
                        alertType: "error",
                        alertData: "Error: " + err,
                        alert: true
                    });
                });
        }
    }

    if (!props.logged) {
        return (
            <Container><Card className={classes.Forms}>
                <Formik

                    initialValues={{
                        firstName: '',
                        lastName: '',
                        username: '',
                        password: '',
                        password2: ''
                    }}
                    onSubmit={() => {
                    }}
                >
                    <Form>
                        <Typography paragraph variant="h2" diaply={'block'}
                                    align={'center'}><b>{"Registration"}</b></Typography>
                        <div align={"center"} className={classes.grow}>
                            <Field name="firstName" component={TextField} label="First Name"/><br/>
                            <Field name="lastName" component={TextField} label="Last Name"/><br/>
                            <Field name="username" component={TextField} label="Username"/><br/>
                            <Field name="password" component={TextField} label="Password"/><br/>
                            <Field name="password2" component={TextField} label="Password"/><br/>


                            <Button className={classes.LoginButtons} type="submit" size="large" variant="contained"
                                    color="primary">
                                Register!
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </Card></Container>
        );
    } else {
        //this.props.history.goBack();
        console.log(props);

        return ("Already Connected!");
    }
}

export default Register;