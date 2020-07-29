import React, {Component} from 'react';
import '../components/Background.css';
import 'bootstrap/dist/css/bootstrap.css';
import md5 from '../components/md5';

var email;
var code;
var resetCode;
var noError;
var password;
var confirmPassword;
var hashedPassword;

const initialState = {
    code: "",
    password: "",
    confirmPassword: "",
    codeError: "",
    passwordError: "",
    confirmPasswordError: "",
    result: "",
    error: "",
    email: "",
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

class ResetPassword extends Component {
    state = initialState;

    handleSubmit = event => {
        event.preventDefault();
        email = getCookie('email');
        resetCode = getCookie('resetCode');
        this.setState({passwordError: "", confirmPasswordError: "", error: ""});
        const isValid = this.validate();
        if (isValid) {
            hashedPassword = md5(this.state.password);
            var url = 'https://cop4331mern.herokuapp.com/api/postChangePassword';
            var postChangePassword =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: hashedPassword})
            }
    
            fetch(url, postChangePassword)
                .then(res => res.json())
                .then(json => this.setState({
                    result: json.result, error: json.error
                }, function () {
                    noError = this.errorChecking();
                    if (noError) {
                        console.log(this.state);
                        this.setState(initialState);
                        document.cookie = "resetCode= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                        document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                        window.location.href = '/login';
                    }
                })
                );
                this.setState(initialState);
        }
    }

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
        let passwordError = "";
        let confirmPasswordError = "";

        if(this.state.code !== resetCode){
            codeError = "Incorrect Reset Code";
        }
        if (!this.state.code) {
            codeError = "Invalid Reset Code";
        }

        if(this.state.code.length !== 8){
            codeError = "Invalid Reset Code";
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

        if (passwordError || confirmPasswordError || codeError) {
            this.setState({ passwordError, confirmPasswordError, codeError });
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
            <div id="resetPasswordDiv">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 mx-auto">
                            <form onSubmit={this.handleSubmit} className="form-signin">
                                <div className="text-center mb-4">
                                    <br /><h1>Reset Password</h1>
                                </div>

                                <div className="form-label-group">
                                    <input value={this.state.code} name="code" type="text" id="code" className="form-control" placeholder="Reset Code" required="" autoFocus="" autoComplete = "on" ref={(c) => code = c} onChange={this.handleChange} />
                                    <label htmlFor="code">Reset Code</label>
                                    <div className="errorMessage"> {this.state.codeError} </div>
                                </div>

                                <div className="form-label-group">
                                    <input value={this.state.password} name="password" type="password" id="password" className="form-control" placeholder="Password" required="" autoFocus="" autoComplete = "on" ref={(c) => password = c} onChange={this.handleChange} />
                                    <label htmlFor="password">Password</label>
                                    <div className="errorMessage"> {this.state.passwordError} </div>
                                </div>

                                <div className="form-label-group">
                                    <input value={this.state.confirmPassword} name="confirmPassword" type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required="" autoFocus="" autoComplete = "on" ref={(c) => confirmPassword = c} onChange={this.handleChange} />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="errorMessage"> {this.state.confirmPasswordError} </div>
                                </div>

                                <div className="errorMessage"> {this.state.error} </div> <br/>

                                <button className="btn btn-lg btn-secondary btn-block" type="submit">Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
}
}

export default ResetPassword;