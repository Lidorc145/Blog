import React from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {FacebookLoginButton, GoogleLoginButton, TwitterLoginButton} from "react-social-login-buttons";
import * as Styles from "../../Styles.js";
import {Field, Form, Formik, FormikProvider, useField, useFormik} from 'formik';
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";

function SignUp(props) {
    let usernameValid = false;
    let emailValid = false;
    const classes = Styles.default()();
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            passwordConfirmation: '',
            email: ''
        },
        onSubmit: async values => {

            await (axios.get("../users/username/" + formik.values.username).then(res => {
                //formik.validateForm();
                console.log(res.data);
                if (res.data.length != 0) {
                    usernameValid = false;
                   // formik.validateForm();
                } else {
                    usernameValid = true;
                   // formik.validateForm();
                }
                console.log("AAAAAAAAAAAAA");
            }));
            await (axios.get("../users/email/" + formik.values.email).then(res => {
                console.log(res.data);
                //formik.validateForm();
                if (res.data.length != 0) {
                    emailValid = false;
                 //   formik.validateForm();
                } else {
                    emailValid = true;
                //    formik.validateForm();
                }
                console.log("BBBBBBBBB");
            }));
            console.log("ccccccc");
            await(formik.validateForm());
            if(emailValid && usernameValid){
                let a = JSON.parse(JSON.stringify(formik.values));
                delete a['passwordConfirmation'];
                await (axios.post("../register/", a).then(res => {
                    props.history.push('./home');
                    props.sessionCheck();
                }));
            }
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(14, "Must be less  than 14 characters")
                .required("First name  is required")
                .matches(
                    /^[a-zA-Z' ']+$/,
                    "Cannot contain special characters or numbers"
                ),
            lastName: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(14, "Must be less  than 14 characters")
                .required("Last name  is required")
                .matches(
                    /^[a-zA-Z' ']+$/,
                    "Cannot contain special characters or numbers"
                ),
            username: Yup.string()
                .min(2, "Must be at least 2 characters")
                .max(18, "Must be less  than 18 characters")
                .required("Username is required")
                .matches(
                    /^[a-zA-Z0-9]+$/,
                    "Cannot contain special characters or spaces"
                )
                .test("user Validation", "'${value}' already exist",
                    async (value) => {
                        return usernameValid;
                    }
                ),
            password: Yup.string()
                .min(8, "Must be at least 8 characters")
                .max(20, "Must be less  than 20 characters")
                .required("Password is required")
                .matches(
                    /^[a-zA-Z0-9]+$/,
                    "Cannot contain special characters or spaces"
                ),
            passwordConfirmation: Yup.string()
                .min(8, "Must be at least 8 characters")
                .max(20, "Must be less  than 20 characters")
                .required("Password is required")
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            email: Yup.string()
                .email()
                .required("Email required")
                .test("Email Validation", "'${value}' already exist",
                    async (value) => {
                        return emailValid;
                    }
                ),


        })
    });

    // console.log(props);
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
            <Container><Card>
                <FormikProvider value={formik}>
                    <Form>
                        <Typography paragraph variant="h2" diaply={'block'}
                                    align={'center'}><b>{"Sign Up"}</b></Typography>
                        <div align={"center"} className={classes.grow}>
                            <TextInputLiveFeedback name="firstName" label="First Name"
                                                   type="text"
                            />
                            <TextInputLiveFeedback name="lastName" label="Last Name" type="text"/>
                            <TextInputLiveFeedback name="username" label="Username" type="text" onChange={usernameValid = true}/><br/>
                            <TextInputLiveFeedback name="password" label="Password" type="password"/><br/>
                            <TextInputLiveFeedback name="passwordConfirmation" label="Password" type="password"/><br/>
                            <TextInputLiveFeedback name="email" label="Email" type="email" onChange={emailValid = true}/><br/>

                            <Button className={classes.LoginButtons} type="submit" size="large" variant="contained"
                                    color="primary">
                                Submit
                            </Button>
                            <Button className={classes.LoginButtons} type="reset" size="large" variant="contained"
                                    color="primary">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </FormikProvider>

            </Card></Container>
        );
    } else {
        //this.props.history.goBack();
        console.log(props);

        return ("Already Connected!");
    }
}

const TextInputLiveFeedback = ({label, helpText, ...props}) => {
    const [field, meta] = useField(props);

    // Show inline feedback if EITHER
    // - the input is focused AND value is longer than 2 characters
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
        (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (<div>
            <TextField
                error={ meta.error ? true : false}
                helperText={showFeedback ? (meta.error ? meta.error : "✓") : (helpText ? helpText : null)}
                {...props}
                {...field}
                label={label}
                onFocus={handleFocus}
            />
        </div>
    );
};


export default SignUp;