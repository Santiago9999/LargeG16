import React, {Component} from 'react';
import '../components/Background.css';
import 'bootstrap/dist/css/bootstrap.css';

var email;
var code;
var emailCookie;
var noError;

const initialState = {
    email: "",
    emailError: "",
    code: "",
    error: "",
    result: "",
    noError: ""
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
        this.setState({emailError: "", error: "", noError: ""});
        const isValid = this.validate();
        if (isValid) {
        code = (randomString(8, '0123456789abcdefghijklmnopqrstuvwxyz'));
        emailCookie = email.value;
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
                    setCookie("email", emailCookie);
                    console.log(this.state);
                    this.setState(initialState);
                    window.location.href = '/resetpassword';
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
        this.setState({error: ""})
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
                <div className="container">
                <div className="row">
                <div className="col-lg-6 col-md-7 mx-auto">
                <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="text-center mb-4"></div>
    
                <div className="form-label-group">
                    <input value={this.state.email} name = "email" type="email" id="email" className="form-control" placeholder="Email" required="" autoFocus="" autoComplete = "on" ref={(c) => email = c} onChange={this.handleChange}/>
                    <label htmlFor="email">Email</label>
                    <div className ="errorMessage"> {this.state.emailError} </div>
                </div>

                <div className="errorMessage"> {this.state.error} </div>
    
                <button className="btn btn-lg btn-secondary btn-block" type="submit">Send Reset Code</button>
                </form>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;