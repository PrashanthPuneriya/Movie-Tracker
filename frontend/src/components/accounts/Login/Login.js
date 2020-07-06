import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    state = {
        shouldRedirect: false,
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log("Submitted");
        this.setState({ shouldRedirect: !this.state.shouldRedirect })
    }

    render() {
        const shouldRedirect = this.state.shouldRedirect
        if(shouldRedirect) {
            return <Redirect to="/profile" />
        }
        return (
            <div>
                <h1>Login Page</h1>
                <form className="LoginForm" onSubmit={this.submitHandler}>
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