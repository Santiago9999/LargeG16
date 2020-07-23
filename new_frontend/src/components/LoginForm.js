import React, { Component } from 'react';
import '../components/Background.css';
import NavigationBar from '../components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.css';
import md5 from '../components/md5';

var email;
var hashedPassword;
var noError;
var password;

const initialState = {
    ID: "",
    firstName: "",
    lastName: "",
    Intro: [],
    CS1: [],
    CS2: [],
    Total: [],
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    dummyID: "",
    dummyFirstName: "",
    dummyLastName: "",
    dummyIntro: [],
    dummyCS1: [],
    dummyCS2:[],
    dummyTotal: []
};

function setCookie(cname, cvalue) {
    var minutes = 20;
	var date = new Date();
	var expires = "expires=" + date.setTime(date.getTime()+(minutes*60*1000));	
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


class LoginForm extends Component {
    state = initialState;

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            hashedPassword = md5(this.state.password);

            var url = 'https://cop4331mern.herokuapp.com/api/getLogin';
            var postLogin =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value, password: hashedPassword })
            }

            fetch(url, postLogin)
                .then(res => res.json())
                .then(json => this.setState({
                    dummyID: json.ID, dummyFirstName: json.firstName, dummyLastName: json.lastName, dummyIntro: json.Intro, dummyCS1: json.CS1,
                    dummyCS2: json.CS2, dummyTotal: json.Total, error: json.error
                },
                    function () {
                        noError = this.errorChecking();
                        console.log(noError);
                        if (noError) {
                            setCookie("ID", this.state.dummyID);
                            setCookie("firstName", this.state.dummyFirstName);
                            setCookie("lastName", this.state.dummyLastName);
                            var introString = JSON.stringify(this.state.dummyIntro);
                            setCookie("Intro", introString);
                            var CS1String = JSON.stringify(this.state.dummyCS1);
                            setCookie("CS1", CS1String);
                            var CS2String = JSON.stringify(this.state.dummyCS2);
                            setCookie("CS2", CS2String);
                            var TotalString = JSON.stringify(this.state.dummyTotal);
                            setCookie("Total", TotalString);
                            console.log(this.state);
                            this.setState(initialState);
                            window.location.href = '/myaccount';
                        }
                    })
                );
            this.setState(initialState);
        }
    }

    errorChecking = () => {
        let error = "";
        console.log(this.state.error)
        
        if(this.state.error === " "){
            return true;//there are no errors
        } else {
            error = this.state.error;
            this.setState({error});
            return false;
        }
    }    

    validate = () => {
        let emailError = "";
        let passwordError = "";

        if (!this.state.email) {
            emailError = "Invalid Email";
        }

        if (!((/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/i).test(this.state.email))) {
            emailError = "Invalid Email";
        }

        if (!this.state.password) {
            passwordError = "Invalid Password";
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
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
            <div id="loginDiv">
                <NavigationBar />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 mx-auto">
                            <form onSubmit={this.handleSubmit} className="form-signin">
                                <div className="text-center mb-4">
                                    <br /><h1>Login</h1>
                                </div>

                                <div className="form-label-group">
                                    <input value={this.state.email} name="email" type="email" id="email" className="form-control" placeholder="Email" required="" autoFocus="" ref={(c) => email = c} onChange={this.handleChange} />
                                    <label htmlFor="email">Email</label>
                                    <div className="errorMessage"> {this.state.emailError} </div>
                                </div>

                                <div className="form-label-group">
                                    <input value={this.state.password} name="password" type="password" id="password" className="form-control" placeholder="Password" required="" ref={(c) => password = c} onChange={this.handleChange} />
                                    <label htmlFor="password">Password</label>
                                    <div className="errorMessage"> {this.state.passwordError} </div>
                                </div>


                                <div className="errorMessage"> {this.state.error} </div> <br/>

                                <button className="btn btn-lg btn-secondary btn-block" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="ResetPassword">
                    <a href="/forgotpassword"> Forgot password? </a>
                </div>
                <div className="ResetPassword">
                    <a href="/register"> New User? Register Here.</a>
                </div>

            </div>
        );
}
}

export default LoginForm;