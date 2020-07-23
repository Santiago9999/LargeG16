import React, {Component} from 'react'
//import './App.css'
//import RenderPersonalStats from './RenderPersonalStats'
import {Button, Card, Image, Table} from 'react-bootstrap';
import tree from "./tree.png"
//import 'bootstrap/dist/css/bootstrap.min.css' // for the minimal css for table and buttons
import NavigationBarLogged from '../components/NavigationBarLogged';


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

function ShowPassword(props)
{
	// show nothing if the show change password is false
	if (props.showPassword === false)
	{
		return (null)
	}

	else
	{
		return (
			<form>
			  <div class="form-group">
			    <label for="exampleFormControlInput1">Input a New Password</label>
			    <input type="password" class="form-control"  placeholder="New Password"/>
			  </div>
			  <div class="form-group">
			    <input type="password" class="form-control"  placeholder="Confirm New Password"/>
			  </div>
			  <Button style={{ color:"#ca85e6"}} variant = 'dark' onClick = {<CheckPassword />}>Submit</Button>
			</form>
		)
	}
}

export default class AppJ extends Component {
  
  constructor(props)
  {
  	super(props)
    this.state =
    {
    	showPassword: false
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


  	return (
    <div class="container h-100" className="App">
	<NavigationBarLogged />

    <div class="row h-100 justify-content-center align-items-center">
      <Card  style={{ width: '40rem' }}>
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
				      <td>{totalArray.TotalCorrect / totalArray.TotalAttempted * 100}</td>
				      <td>{totalArray.TotalCorrect}/{totalArray.TotalAttempted}</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>Intro to C</td>
				      <td>{introArray.HighScore}</td>
				      <td>{introArray.TotalCorrect / introArray.TotalAttempted * 100}</td>
				      <td>{introArray.TotalCorrect}/{introArray.TotalAttempted}</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>CSI</td>
				      <td>{CS1Array.HighScore}</td>
				      <td>{CS1Array.TotalCorrect / CS1Array.TotalAttempted * 100}</td>
				      <td>{CS1Array.TotalCorrect}/{CS1Array.TotalAttempted}</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>CSII</td>
				      <td>{CS2Array.HighScore}</td>
				      <td>{CS2Array.TotalCorrect / CS2Array.TotalAttempted * 100}</td>
				      <td>{CS2Array.TotalCorrect}/{CS2Array.TotalAttempted}</td>
				    </tr>
			      </tbody>
			    </Table>

			    <Button style={{ color:"#ca85e6"}} variant = 'dark' onClick = {this.changePassword.bind(this)}>Change Password</Button>
			    <ShowPassword showPassword = {this.state.showPassword}/>


  			</Card.Body>
		</Card>
    </div>
    </div>
    )
  }
}

