import React, {Component} from 'react'
//import './App.css'
//import RenderPersonalStats from './RenderPersonalStats'
import {Button, Card, Image, Table} from 'react-bootstrap';
import tree from "./tree.png"
//import 'bootstrap/dist/css/bootstrap.min.css' // for the minimal css for table and buttons
import NavigationBarLogged from '../components/NavigationBarLogged';
import md5 from '../components/md5';


var ID;
var firstName;
var lastName;

var introString;
var introArray;

var CS1String;
var CS1Array;

var CS2String;
var CS2Array;

var totalString;
var totalArray;

var email;
var hashedPassword;
var noError;
var error;


// checks for matching password
function CheckPassword(props)
{
	// if good call the api 
	// else return an error message
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

export default class AppJ extends Component {
  
  constructor(props)
  {
  	super(props)
    this.state =
    {
    	password: "",
    	confirmPassword: "",
    	showPassword: false
    }	
  }

  handleChange = event =>
  {
  	this.setState({[event.target.name]:event.target.value})
  };
  handleSubmit = event =>
  {
	  event.preventDefault()
  	// password can't be empty
  	if (this.state.password.length === 0 || this.state.confirmPassword.length === 0)
  	{
		  error = 'Password cannot be blank';
		  this.setState({ error });
  	}
  	// if the password and confirm password fields match, return a success marker
  	else if (this.state.password === this.state.confirmPassword)
  	{
			console.log("equal")
			hashedPassword = md5(this.state.password);

	  	var url = 'https://cop4331mern.herokuapp.com/api/postChangePassword'
	    var postRequest = 
	    {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify({ email: email, password: hashedPassword})
	    }
	    fetch(url, postRequest)
	      .then(res => res.json())
		  .then(json => this.setState({errorMessage: json.error}, 
			function() {
				noError = this.errorChecking();
			})
	    );

  	}
  	else
  	{
		error = 'Password has to match.';
		this.setState({ error });
		  console.log("not equal")
		  
  	}
  	// if they don't match, return a failed marker
  };


  errorChecking = () => {
	let error = "";

	if (this.state.errorMessage === "") {
		error = 'Successful Password Change!';
	} else {
		error = this.state.errorMessage;
	}

	if (error) {
		this.setState({ error });
		return false;
	}
	return true;
}

  showPasswordBody()
  {
  	if (this.state.showPassword === false)
  	{
  		return(null)
  	}
  	else
  	{
  		return(
			<form onSubmit={this.handleSubmit.bind(this)}>
			  <div class="form-group">
			    <label>Input a New Password</label>
			    <input name = "password" type="password" className="form-control" value = {this.state.password} placeholder="New Password" onChange = {this.handleChange}/>
			  </div>
			  <div class="form-group">
			    <input  name = "confirmPassword" type="password" className="form-control" value = {this.state.confirmPassword} placeholder="Confirm New Password" onChange = {this.handleChange}/>
			  </div>

			  <Button style={{ color:"#ca85e6"}} variant = 'dark' type = "submit">Submit</Button>
			  <br/><div className="errorMessage"> {this.state.error} </div> 
			</form>
  		)
  	}
  	
  }

  changePassword()
  {
  	if (this.state.showPassword === false)
  		this.setState({showPassword: true})
  	else
  		this.setState({showPassword: false})
  }


  render ()
  {
	email = getCookie('email');
	ID = getCookie('ID');
	firstName = getCookie('firstName');
	lastName = getCookie('lastName');
	introString = getCookie('Intro');
	introArray = JSON.parse(introString);
	CS1String = getCookie('CS1');
	CS1Array = JSON.parse(CS1String);
	CS2String = getCookie('CS2');
	CS2Array = JSON.parse(CS2String);
	totalString = getCookie('Total');
	totalArray = JSON.parse(totalString);

	var totalPercent;
    var introPercent;
    var CS1Percent;
    var CS2Percent;

    if (totalArray.TotalAttempted === 0)
        totalPercent = 0;
    else
        totalPercent = totalArray.TotalCorrect / totalArray.TotalAttempted * 100

    if (introArray.TotalAttempted === 0)
        introPercent = 0;
    else
        introPercent = introArray.TotalCorrect / introArray.TotalAttempted * 100

    if (CS1Array.TotalAttempted === 0)
        CS1Percent = 0;
    else
        CS1Percent = CS1Array.TotalCorrect / CS1Array.TotalAttempted * 100

    if (CS2Array.TotalAttempted === 0)
        CS2Percent = 0;
    else
        CS2Percent = CS2Array.TotalCorrect / CS2Array.TotalAttempted * 100


  	return (
    <div class="container h-100" className="App">
	<NavigationBarLogged />

    <div class="row h-100 justify-content-center align-items-center">
      <Card  className = "shadow" style={{ width: '40rem' }}>
  		<Card.Img variant="top" src={tree} className = "tree"/>
  			<Card.Body >
	  		<h1>Welcome {firstName} {lastName}</h1>
			    <Card.Text>
			      Here, you can see some of your all-time statistics on Trivia Crevice.
			    </Card.Text>

			    <Table borderd hover>
			      <thead>
			        <tr>
			          <th>Category</th>
			          <th>Score</th>
			          <th>Percentage</th>
			          <th>Right/Total</th>
			        </tr>
			      </thead>

			      <tbody>
                    <tr>
                      <td>Total</td>
                      <td>{totalArray.HighScore}</td>
                      <td>{totalPercent.toFixed(2)}%</td>
                      <td>{totalArray.TotalCorrect}/{totalArray.TotalAttempted}</td>
                    </tr>
                  </tbody>

			      <tbody>
					<tr>
				      <td>Intro to C</td>
				      <td>{introArray.HighScore}</td>
				      <td>{introPercent.toFixed(2)}%</td>
				      <td>{introArray.TotalCorrect}/{introArray.TotalAttempted}</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>CSI</td>
				      <td>{CS1Array.HighScore}</td>
				      <td>{CS1Percent.toFixed(2)}%</td>
				      <td>{CS1Array.TotalCorrect}/{CS1Array.TotalAttempted}</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>CSII</td>
				      <td>{CS2Array.HighScore}</td>
				      <td>{CS2Percent.toFixed(2)}%</td>
				      <td>{CS2Array.TotalCorrect}/{CS2Array.TotalAttempted}</td>
				    </tr>
			      </tbody>
			    </Table>

			    <Button style={{ color:"#ca85e6"}} variant = 'dark' onClick = {this.changePassword.bind(this)}>Change Password</Button>
			    <div>{this.showPasswordBody()}</div>

  			</Card.Body>
		</Card>
    </div>
    </div>
    )
  }
}

