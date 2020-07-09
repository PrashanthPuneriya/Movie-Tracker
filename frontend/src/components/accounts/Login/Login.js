/* eslint-disable no-unused-expressions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';


class Login extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        message: null,
    }

    // Sets JWT token as cookie
    submitUserCredentialsHandler = (event) => {
        event.preventDefault();
        const context = this.context;
        let formData = new FormData(event.target);
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`http://localhost:5000/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then((object) => {
                const data = object.body
                if (object.status === 200) {
                    document.cookie = data['token']
                    context.changeLoggedInStatusHandler();
                }
                else {
                    this.setState({ message: data['message'] })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    render() {
        let message = this.state.message;
        const context = this.context;
        if (context.state.isLoggedIn) {
            return <Redirect to="/profile" />
        }
        else return (
            <div>
                {
                    message !== null ?
                        <h3>{message}</h3>
                        :
                        null
                }
                <h3>{this.props.location.message}</h3> {/* This is shown when user is redirected from protected routes */}
                <h1>Login Page</h1>
                <form className="LoginForm" onSubmit={this.submitUserCredentialsHandler}>
                    <label>
                        Email:
                        <input type="email" name="email" placeholder="Email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" required />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;