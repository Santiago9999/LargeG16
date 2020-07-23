import React from 'react';
import NavigationBar from '../components/NavigationBarLogged';


var ID;
var firstName;
var lastName;
var introString;

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


const LoggedInPage = () =>{
ID = getCookie('ID');
firstName = getCookie('firstName');
lastName = getCookie('lastName');
introString = getCookie('Intro');
var introArray = JSON.parse(introString);

    return(
        <div>
            <NavigationBar />
          <br/>  <h1> Logged In </h1> <br/>
          <p> You are logged in as ID:{ID}, First Name: {firstName} Last Name: {lastName}</p>
    <p> {introArray.HighScore}, {introArray.TotalCorrect}, {introArray.TotalAttempted}, {introArray._id}</p>
        </div>

    );
}

export default LoggedInPage;