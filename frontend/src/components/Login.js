import React, { useState } from 'react';
const BASE_URL = 'https://cop4331mern.herokuapp.com/';

function Login() {
    var loginName;
    var password;
    
    return ( 
    <div id="loginDiv" center>
        <span id="innter-title"> Login </span><br />
        <input type = "text" id ="loginName" placeholder ="Username" ref={(c) => loginName = c} /> <br />
        <input type = "password" id = "password" placeholder = "Password" ref={(c) => password = c} /> <br />
        <input type = "submit" id = "loginButton" class = "buttons" value = "Login" />
    </div>
        );
};

export default Login;