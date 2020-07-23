import React, { Component } from 'react';
import '../components/Background.css';
import NavigationBar from '../components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.css';
import md5 from '../components/md5'


var firstName;
var lastName;
var email;
var hashedPassword;
var password;
var confirmPassword;
var noError;

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    dummyFirstName: "",
    dummyLastName: "",
    result: "",
    error: ""
};

class RegisterForm extends Component {
    state = initialState;

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            hashedPassword = md5(this.state.password);

            var url = 'https://cop4331mern.herokuapp.com/api/postRegister';
            var postRegister =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: firstName.value, lastName: lastName.value,
                    email: email.value, password: hashedPassword
                })
            }

            fetch(url, postRegister)
                .then(res => res.json())
                .then(json => this.setState({
                    dummyFirstName: json.firstName, dummyLastName: json.lastName, result: json.result, error: json.error
                }, function () {
                    noError = this.errorChecking();
                    console.log(noError);
                    if (noError) {
                        console.log(this.state);
                        this.setState(initialState);
                        window.location.href = '/registered';
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
        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if (!this.state.firstName) {
            firstNameError = "Invalid First Name";
        }

        if (!this.state.lastName) {
            lastNameError = "Invalid Last Name";
        }

        if (!this.state.email) {
            emailError = "Invalid Email";
        }

        if (!((/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/i).test(this.state.email))) {
            emailError = "Invalid Email";
        }

        if (!this.state.password) {
            passwordError = "Invalid Password";
        }

        if (!this.state.confirmPassword) {
            confirmPasswordError = "Invalid Password";
        }

        if (this.state.password !== this.state.confirmPassword) {
            confirmPasswordError = "Passwords Do Not Match";
        }

        if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError) {
            this.setState({ firstNameError, lastNameError, emailError, passwordError, confirmPasswordError });
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
            <div id="registerDiv">
                <NavigationBar />
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-7 mx-auto">
                            <form onSubmit={this.handleSubmit} class="form-signin">
                                <div class="text-center mb-4">
                                    <br /><h1>Register</h1>
                                </div>

                                <div class="form-label-group">
                                    <input value={this.state.firstName} name="firstName" type="text" id="firstName" class="form-control" placeholder="First Name" required="" autofocus="" ref={(c) => firstName = c} onChange={this.handleChange} />
                                    <label for="firstName">First Name</label>
                                    <div className="errorMessage"> {this.state.firstNameError} </div>
                                </div>

                                <div class="form-label-group">
                                    <input value={this.state.lastName} name="lastName" type="text" id="lastName" class="form-control" placeholder="Last Name" required="" autofocus="" ref={(c) => lastName = c} onChange={this.handleChange} />
                                    <label for="lastName">Last Name</label>
                                    <div className="errorMessage"> {this.state.lastNameError} </div>
                                </div>

                                <div class="form-label-group">
                                    <input value={this.state.email} name="email" type="email" id="email" class="form-control" placeholder="Email" required="" autofocus="" ref={(c) => email = c} onChange={this.handleChange} />
                                    <label for="email">Email</label>
                                    <div className="errorMessage"> {this.state.emailError} </div>
                                </div>

                                <div class="form-label-group">
                                    <input value={this.state.password} name="password" type="password" id="password" class="form-control" placeholder="Password" required="" ref={(c) => password = c} onChange={this.handleChange} />
                                    <label for="password">Password</label>
                                    <div className="errorMessage"> {this.state.passwordError} </div>
                                </div>

                                <div class="form-label-group">
                                    <input value={this.state.confirmPassword} name="confirmPassword" type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" required="" ref={(c) => confirmPassword = c} onChange={this.handleChange} />
                                    <label for="confirmPassword"> Confirm Password</label>
                                    <div className="errorMessage"> {this.state.confirmPasswordError} </div>
                                </div>

                                <div className="errorMessage"> {this.state.error} </div> <br />

                                <button class="btn btn-lg btn-secondary btn-block" type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="ResetPassword">
                    <a href="/login"> Already have an account? Login here.</a>
                </div>

            </div>
        );
    }
}

export default RegisterForm;