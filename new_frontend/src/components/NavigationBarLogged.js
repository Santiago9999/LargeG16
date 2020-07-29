import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class NavigationBarLogged extends Component {
handleLogout = event => {
  event.preventDefault();
  document.cookie = "ID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "lastName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "Intro= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "CS1= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "CS2= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "Total= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "email= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = '/';
}

render(){
return(
  <>
<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  <a className="navbar-brand" href="/">
  <img src = {require('./triviacrevice3.png')} className= "image-responsive" alt ="logo" />
  Trivia Crevice
  </a>

  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <a className="nav-link" href="/leaderboard">Leader Board</a>
    </li>

    <li className="nav-item">
      <a className="nav-link" href="/myaccount">My Account</a>
    </li>


    <li className="nav-item">
      <a onClick = {this.handleLogout} className="nav-link" href="#">Logout</a>
    </li>
  </ul>

</nav>
</>
);
};
}

export default NavigationBarLogged;