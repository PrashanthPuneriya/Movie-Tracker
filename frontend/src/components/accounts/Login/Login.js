/* eslint-disable no-unused-expressions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import GlobalStateContext from '../../GlobalStateContext.js';
import styles from './Login.module.css';


class Login extends React.Component {
    static contextType = GlobalStateContext;
    state = {
        message: null,
        isLoading: false,
    }

    // Sets JWT token as cookie
    submitUserCredentialsHandler = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true })
        const context = this.context;
        let formData = new FormData(event.target);
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`/api/login/`, {
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
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.error(error);
                this.setState({ message: "Something went wrong with our server. Please try again later at some other time"})
                this.setState({ isLoading: false })
            })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        let message = this.state.message;
        let isLoading = this.state.isLoading;
        
        const context = this.context;
        if (context.state.isLoggedIn) {
            return <Redirect to="/profile" />
        }
        else if (isLoading) {
            return <div className="loader">Loading...</div>
        }
        else return (
            <div className={styles.Login}>
                <h1 className={styles.title}>Login</h1>
                {
                    message !== null ?
                        <h4 className={styles.message}>{message}</h4>
                        :
                        null
                }
                {/* This is shown when user is redirected from protected routes */}
                <h4 className={styles.message}>{this.props.location.message}</h4>
                <form className={styles.LoginForm} onSubmit={this.submitUserCredentialsHandler}>
                    <input type="email" name="email" placeholder="Email" required />
                    <input type="password" name="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;