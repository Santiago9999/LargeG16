import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

var ID;

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
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

function ShowLogin() {
  ID = getCookie('ID');
  if (ID === "") { //not logged in
    return (
      <li className="nav-item">
        <a className="nav-link" href="/login">Login</a>
      </li>
    )
  } else {
    return null;
  }
}

function ShowMyAccount() {
  ID = getCookie('ID');
  if (ID === "") { //not logged in
    return null;
  } else {
    return (
      <li className="nav-item">
        <a className="nav-link" href="/myaccount">My Account</a>
      </li>
    );
  }
}

class NavigationBar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="/">
            <img src={require('./triviacrevice3.png')} className="image-responsive" alt="logo" />
  Trivia Crevice
  </a>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://play.google.com/store?hl=en_US">Download</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/register">Register</a>
            </li>

            <ShowLogin />

            <ShowMyAccount />

          </ul>

        </nav>
      </>
    );
  };
}

export default NavigationBar;