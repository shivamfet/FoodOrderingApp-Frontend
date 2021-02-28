import React, { Component } from 'react';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import validator from 'validator';
import Snackbar from '@material-ui/core/Snackbar';
import './Header.css'

const styles = theme => ({
    underline: {
        "&::before": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.8)"
        },
        "&::after": {
            borderBottom: "2px solid rgba(255,255, 255, 0.9)"
        }
    },
    input: {
        "color": "white"
    },

});

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }} fullWidth={true}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class Header extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
            isModalOpen: false,

            contactNumRequired: "dispNone",
            contactNumHelperText: "",
            contactNum: "",

            loginPasswordRequired: "dispNone",
            loginPassword: "",

            firstnameRequired: "dispNone",
            firstname: "",

            lastnameRequired: "dispNone",
            lastname: "",

            emailRequired: "dispNone",
            emailHelperText: "",
            email: "",

            registerPasswordRequired: "dispNone",
            registerPasswordHelperText: "",
            registerPassword: "",

            registerContactNumRequired: "dispNone",
            registerContactNumHelperText: "",
            registerContactNum: "",

            isSnackBarOpen: false,

            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        };
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value: value });
    }

    openModalHandler = () => {
        this.setState({ isModalOpen: true })
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false });
    }

    loginClickHandler = () => {

        let contactNumber = this.state.contactNum;
        let loginPassword = this.state.loginPassword;

        if (contactNumber === "" && loginPassword === "") {
            this.setState({
                contactNumRequired: "dispBlock",
                loginPasswordRequired: "dispBlock",
                contactNumHelperText: "required"
            });
        } else if (contactNumber != "" && loginPassword === "") {
            this.setState({
                contactNumRequired: "dispNone",
                loginPasswordRequired: "dispBlock",
            });
        } else if (contactNumber === "" && loginPassword != "") {
            this.setState({
                contactNumRequired: "dispBlock",
                loginPasswordRequired: "dispNone",
                contactNumHelperText: "required"
            });
        } else {
            if (!/^\d{10}$/.test(contactNumber)) {
                console.log("here");
                this.setState({
                    contactNumRequired: "dispBlock",
                    contactNumHelperText: "Invalid Contact"
                });

            }
        }
    }

    registerClickHandler = () => {
        this.setState({registrationSuccess : false})
        let firstName = this.state.firstname;
        let lastName = this.state.lastname;
        let email = this.state.email;
        let registerPassword = this.state.registerPassword;
        let contactNumber = this.state.registerContactNum;
        let isEmailValid = false;
        let isContactNumValid = false;
        let isRegisterPasswordValid = false;


        if (firstName === "" || email === "" || registerPassword === "" || contactNumber === "") {
            firstName === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" })
            email === "" ? this.setState({ emailRequired: "dispBlock", emailHelperText: "required" }) : this.setState({ emailRequired: "dispNone" })
            contactNumber === "" ? this.setState({ registerContactNumRequired: "dispBlock", registerContactNumHelperText: "required" }) : this.setState({ registerContactNumRequired: "dispNone" })
            registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock", registerPasswordHelperText: "required" }) : this.setState({ registerPasswordRequired: "dispNone" })
            return;
        } else {
            // check if email is valid

            if (!validator.isEmail(email)) {
                this.setState({
                    emailRequired: "dispBlock",
                    emailHelperText: "Invalid email"
                });
            } else {
                isEmailValid = true;
            }

            // check if contact number is valid

            if (!/^\d{10}$/.test(contactNumber)) {
                this.setState({
                    registerContactNumRequired: "dispBlock",
                    registerContactNumHelperText: "Contact No. must contain only numbers and must be 10 digits long"
                });
            } else {
                isContactNumValid = true;
            }


            // check if pasword meets the criteria

            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
            if (!re.test(registerPassword)) {
                this.setState({
                    registerPasswordRequired: "dispBlock",
                    registerPasswordHelperText: "Password must contain at least one capital letter, one small letter, one number, and one special character"
                });
            } else {
                isRegisterPasswordValid = true
            }
        }

        if (isEmailValid && isContactNumValid && isRegisterPasswordValid) {
                // Call the end
            let dataSignup = JSON.stringify({
                "email_address": this.state.email,
                "first_name": this.state.firstname,
                "last_name": this.state.lastname,
                "contact_number": this.state.registerContactNum,
                "password": this.state.registerPassword
            });

            let xhrSignup = new XMLHttpRequest();
            let that = this;
            xhrSignup.addEventListener("readystatechange" , function() {
                if (this.readyState === 4) {
                    that.setState({isSnackBarOpen : true , value : 0});
                    console.log(that.state);
                    console.log("done");
                }
            });

            xhrSignup.open("POST" , this.props.baseUrl + "/customer/signup");
            xhrSignup.setRequestHeader("Content-Type", "application/json");
            xhrSignup.setRequestHeader("Cache-Control", "no-cache");
            console.log(dataSignup);
            xhrSignup.send(dataSignup);    
        }


    }


    inputContactNumChangeHandler = (e) => {
        this.setState({ contactNumRequired: "dispNone" })
        this.setState({ contactNumHelperText: "" })
        this.setState({ contactNum: e.target.value })
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPasswordRequired: "dispNone" })
        this.setState({ loginPassword: e.target.value })
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstnameRequired: "dispNone" })
        this.setState({ firstname: e.target.value })
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value })
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ emailRequired: "dispNone" })
        this.setState({ email: e.target.value })
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPasswordRequired: "dispNone" })
        this.setState({ registerPassword: e.target.value })
    }

    inputRegisterContactNumHandler = (e) => {
        this.setState({ registerContactNumRequired: "dispNone" })
        this.setState({ registerContactNumHelperText: "" })
        this.setState({ registerContactNum: e.target.value })
    }

    snackBarCloseHandler = () => {
        this.setState({isSnackBarOpen : false});
    }

    render() {
        const { classes } = this.props
        console.log(this.props);
        return (<div>
            <header className="header-container">
                <div>
                    <FastfoodIcon style={{ color: "white" }} />
                </div>
                <div className="searchBox">
                    <TextField
                        fullWidth placeholder="Search By Restaurant Name" InputProps={{
                            startAdornment: (<InputAdornment style={{ color: "white" }} position="start">
                                <SearchIcon />
                            </InputAdornment>),
                            classes
                        }} />
                </div>
                <div className="loginButton">
                    <Button color="default" variant="contained" onClick={this.openModalHandler}>
                        <AccountCircleIcon style={{ marginRight: 5 }}></AccountCircleIcon> Login
                </Button>
                </div>
            </header>
            <Modal
                ariaHideApp={false}
                isOpen={this.state.isModalOpen}
                style={customStyles}
                onRequestClose={this.closeModalHandler}
                contentLabel="Login">

                <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                    <Tab label="LOGIN" />
                    <Tab label="SIGNUP" />
                </Tabs>

                {this.state.value == 0 &&
                    <TabContainer>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="contactnum">Contact No</InputLabel>
                            <Input id="contactnum" type="text" value={this.state.contactNum} contactnum={this.state.contactNum} onChange={this.inputContactNumChangeHandler} />
                            <FormHelperText className={this.state.contactNumRequired}>
                                <span className="red">{this.state.contactNumHelperText}</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" value={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                            <FormHelperText className={this.state.loginPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>


                        </FormControl>
                        <br /><br />
                        {this.state.loggedIn === true &&
                            <FormControl>
                                <span className="successText">
                                    Login Successful!
                                    </span>
                            </FormControl>
                        }
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </div>
                    </TabContainer>}

                {this.state.value == 1 &&
                    <TabContainer>
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <Input id="firstname" type="text" value={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                            <FormHelperText className={this.state.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" value={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" value={this.state.email} onChange={this.inputEmailChangeHandler} />
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">{this.state.emailHelperText}</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" value={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                            <FormHelperText className={this.state.registerPasswordRequired}>
                                <span className="red">{this.state.registerPasswordHelperText}</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" value={this.state.registerContactNum} onChange={this.inputRegisterContactNumHandler} />
                            <FormHelperText className={this.state.registerContactNumRequired}>
                                <span className="red">{this.state.registerContactNumHelperText}</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {this.state.registrationSuccess === true &&
                            <FormControl>
                                <span className="successText">
                                    Registration Successful. Please Login!
                                      </span>
                            </FormControl>
                        }
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>SIGNUP</Button>
                        </div>

                    </TabContainer>}

            </Modal>
            <Snackbar
            anchorOrigin={{ vertical : 'bottom' , horizontal : 'left'} }
            open={this.state.isSnackBarOpen}
            message="Registered successfully! Please login now!"
            autoHideDuration={5000}
            onClose={this.snackBarCloseHandler}
          />

        </div>)
    }
    ;
}

export default withStyles(styles)(Header)
