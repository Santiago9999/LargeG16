import React, { useState, Component } from 'react';
import '../components/Background.css';
import 'bootstrap/dist/css/bootstrap.css';

var code;
var email;
var noError;

const initialState = {
    code: "",
    codeError: "",
    email: "",
    emailError: "",
    error: "",
    result: ""
};

class Verification extends Component {
    state = initialState;

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            var url = 'https://cop4331mern.herokuapp.com/api/postvalidateUser';
            var postValidate =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value, code: code.value })
            }

            fetch(url, postValidate)
                .then(res => res.json())
                .then(json => this.setState({
                    result: json.result, error: json.error
                }, function () {
                    noError = this.errorChecking();
                    if (noError) {
                        console.log(this.state);
                        this.setState(initialState);
                        window.location.href = '/login';
                    }
                })
                );
                this.setState(initialState);
        }
    };

    errorChecking = () => {
        let error = "";

        if (this.state.error === "") {
            //there are no errors
        } else {
            error = this.state.error;
        }

        if (error) {
            this.setState({ error });
            return false;
        }
        return true;
    }

    validate = () => {
        let codeError = "";
        let emailError = "";

        if (!this.state.email) {
            emailError = "Invalid Email";
        }

        if (!((/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/i).test(this.state.email))) {
            emailError = "Invalid Email";
        }

        if (this.state.code.length != 8) {
            codeError = "Please enter a valid code.";
        }

        if (codeError || emailError) {
            this.setState({ codeError, emailError });
            return false;
        }

        return true;
    };

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    render() {
        return (
            <div id="verificationDiv">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-7 mx-auto">
                            <form onSubmit={this.handleSubmit} class="form-signin">
                                <div class="text-center mb-4"></div>

                                <div class="form-label-group">
                                    <input value={this.state.email} name="email" type="email" id="email" class="form-control" placeholder="Email" required="" autofocus="" ref={(c) => email = c} onChange={this.handleChange} />
                                    <label for="email">Email</label>
                                    <div className="errorMessage"> {this.state.emailError} </div>
                                </div>

                                <div class="form-label-group">
                                    <input value={this.state.code} name="code" type="text" id="code" class="form-control" placeholder="Verification Code" required="" autofocus="" ref={(c) => code = c} onChange={this.handleChange} />
                                    <label for="code">Verification Code</label>
                                    <div className="errorMessage"> {this.state.codeError} </div>
                                </div>

                                <div className="errorMessage"> {this.state.error} </div> <br />

                                <button class="btn btn-lg btn-secondary btn-block" type="submit">Verify</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Verification;