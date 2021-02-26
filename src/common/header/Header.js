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
            
            contactNumRequired : "dispNone",
            contactNumHelperText : "",
            contactNum : "",
            
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            
            firstnameRequired: "dispNone",
            firstname: "",
            
            lastnameRequired: "dispNone",
            lastname: "",
            
            emailRequired: "dispNone",
            email: "",
            
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            
            registerContactNumRequired : "dispNone",
            registerContactNum: "",
            
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        };
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value: value });
    }

    openModalHandler = () => {
        this.setState({ isModalOpen: true })
        this.setState({ loginPasswordRequired : "dispNone"})
        this.setState({ contactNumRequired : " dispNone"})
        this.setState({ contactNumHelperText : ""})
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false });
    }

    loginClickHandler = () => {

        let contactNumber = this.state.contactNum;
        let loginPassword = this.state.loginPassword;

        if (contactNumber === "" && loginPassword === "") {
            this.setState({
                contactNumRequired : "dispBlock" ,
                loginPasswordRequired : "dispBlock" ,
                contactNumHelperText : "required"
            });
        } else if (contactNumber != "" && loginPassword === "") {
            this.setState({
                contactNumRequired : "dispNone" ,
                loginPasswordRequired : "dispBlock" ,
            });
        } else if (contactNumber === "" && loginPassword != "") {
            this.setState({
                contactNumRequired : "dispBlock" ,
                loginPasswordRequired : "dispNone" ,
                contactNumHelperText : "required"
            });
        } else {
            if (!/^\d{10}$/.test(contactNumber)) {
                console.log("here");
                this.setState({
                    contactNumRequired : "dispBlock" ,
                    contactNumHelperText : "Invalid Contact"
                }); 
          
            }
        }  
    }


    inputContactNumChangeHandler = (e) => {
        this.setState({contactNumRequired : "dispNone"})
        this.setState({contactNumHelperText : ""})
        this.setState({contactNum : e.target.value})
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({loginPasswordRequired : "dispNone"})
        this.setState({loginPassword : e.target.value})
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({firstname : e.target.value})
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({lastname : e.target.value})
    }

    inputEmailChangeHandler = (e) => {
        this.setState({email : e.target.value})
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({registerPassword : e.target.value})
    }

    inputregisterContactNumHandler = (e) => {
        this.setState({registerContactNum : e.target.value})
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
                            <Input id="contactnum" type="text" contactnum={this.state.contactNum} onChange={this.inputContactNumChangeHandler}/>
                            <FormHelperText className={this.state.contactNumRequired}>
                                <span className="red">{this.state.contactNumHelperText}</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="loginPassword">Password</InputLabel>
                            <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler}/>
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
                            <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                            <FormHelperText className={this.state.firstnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                            <FormHelperText className={this.state.lastnameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                            <FormHelperText className={this.state.emailRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="registerPassword">Password</InputLabel>
                            <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                            <FormHelperText className={this.state.registerPasswordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required fullWidth={true}>
                            <InputLabel htmlFor="contact">Contact No.</InputLabel>
                            <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                            <FormHelperText className={this.state.contactNumRequired}>
                                <span className="red">required</span>
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
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </div>

                    </TabContainer>}

            </Modal>

        </div>)
    }
    ;
}

export default withStyles(styles)(Header)
