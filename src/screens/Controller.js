import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home/Home'
import Profile from './profile/Profile'

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api"
    }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}
export default Controller