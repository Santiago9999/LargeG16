import React, {useState, Component} from 'react';
import '../components/Background.css';
import 'bootstrap/dist/css/bootstrap.css';

var email;
var code;
var noError;

const initialState = {
    email: "",
    emailError: "",
    code: "",
    error: "",
    result: "'"
};

function setCookie(cname, cvalue) {
    var minutes = 20;
	var date = new Date();
	var expires = "expires=" + date.setTime(date.getTime()+(minutes*60*1000));	
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

class ForgotPassword extends Component {
    state = initialState;

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
        code = (randomString(8, '0123456789abcdefghijklmnopqrstuvwxyz'));
        var url = 'https://cop4331mern.herokuapp.com/api/postForgotPassword';
        var postForgotPassword =
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, code: code })
        }

        fetch(url, postForgotPassword)
            .then(res => res.json())
            .then(json => this.setState({
                result: json.result, error: json.error
            }, function () {
                noError = this.errorChecking();
                if (noError) {
                    setCookie("resetCode", code);
                    setCookie("email", email.value);
                    console.log(this.state);
                    this.setState(initialState);
                    window.location.href = '/resetpassword';
                }
            })
            );
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
        let emailError = "";

        if(!this.state.email) {
            emailError = "Invalid Email";
        }

        if(!((/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/i).test(this.state.email))){
            emailError = "Invalid Email";
        }

        if(emailError){
            this.setState({emailError});
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

      render(){
        return(
            <div id="forgotPasswordDiv">
                <div class="container">
                <div class="row">
                <div class="col-lg-6 col-md-7 mx-auto">
                <form onSubmit={this.handleSubmit} class="form-signin">
                <div class="text-center mb-4"></div>
    
                <div class="form-label-group">
                    <input value={this.state.email} name = "email" type="email" id="email" class="form-control" placeholder="Email" required="" autofocus="" ref={(c) => email = c} onChange={this.handleChange}/>
                    <label for="email">Email</label>
                    <div className ="errorMessage"> {this.state.emailError} </div>
                </div>
    
                <button class="btn btn-lg btn-secondary btn-block" type="submit">Send Reset Code</button>
                </form>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;