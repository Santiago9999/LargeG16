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
  document.cookie = "resetCode= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = '/';
}

render(){
return(
  <>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <a class="navbar-brand" href="/">
  <img src = {require('./triviacrevice2.png')} class = "image-responsive" alt ="logo" />
  Trivia Crevice
  </a>

  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <a class="nav-link" href="/">Leader Board</a>
    </li>

    <li class="nav-item">
      <a class="nav-link" href="/myaccount">My Account</a>
    </li>


    <li class="nav-item">
      <a onClick = {this.handleLogout} class="nav-link" href="#">Logout</a>
    </li>
  </ul>

</nav>
</>
);
};
}

export default NavigationBarLogged;