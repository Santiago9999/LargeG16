import React, { useState } from 'react';
const BASE_URL = 'https://cop4331mern.herokuapp.com/';

function Register() {
    var loginName;
    var password;
    var firstName;
    var lastName;
    var email;

    const doRegister = async event => {
        window.location.href = '/login';
    }
    
    return ( 
    <div id="registerDiv" center>
        <span id="innter-title"> Register </span><br />
        <input type = "text" id ="loginName" placeholder ="Username" ref={(c) => loginName = c} /> <br />
        <input type = "password" id = "password" placeholder = "Password" ref={(c) => password = c} /> <br />
        <input type = "text" id ="firstName" placeholder ="First Name" ref={(c) => firstName = c} /> <br />
        <input type = "text" id ="lastName" placeholder ="Last Name" ref={(c) => lastName = c} /> <br />
        <input type = "text" id ="email" placeholder ="E-mail" ref={(c) => email = c} /> <br />
        <input type = "submit" id = "registerButton" class = "buttons" value = "Confirm" onClick = {doRegister} />
    </div>
        );
};

export default Register;