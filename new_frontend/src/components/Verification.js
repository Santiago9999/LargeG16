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


class Verification extends Component {
    state = initialState;

    handleSubmit = event => {
        event.preventDefault();
        this.setState({codeError: "", emailError: "", error: "", noError: ""});
        email = getCookie('email');
        const isValid = this.validate();
        if (isValid) {
            var url = 'https://cop4331mern.herokuapp.com/api/postvalidateUser';
            var postValidate =
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, code: code.value })
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
                        document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
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

        if (this.state.code.length != 8) {
            codeError = "Please enter a valid code.";
        }

        if (codeError) {
            this.setState({codeError});
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
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 mx-auto">
                            <form onSubmit={this.handleSubmit} className="form-signin">
                                <div className="text-center mb-4"></div>

                                <div class="form-label-group">
                                    <input value={this.state.code} name="code" type="text" id="code" className="form-control" placeholder="Verification Code" required="" autoFocus="" autoComplete = "on" ref={(c) => code = c} onChange={this.handleChange} />
                                    <label htmlFor="code">Verification Code</label>
                                    <div className="errorMessage"> {this.state.codeError} </div>
                                </div>

                                <div className="errorMessage"> {this.state.error} </div> <br />

                                <button className="btn btn-lg btn-secondary btn-block" type="submit">Verify</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Verification;