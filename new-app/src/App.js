import React, {Component} from 'react'
import './App.css'
//import RenderPersonalStats from './RenderPersonalStats'
import {Button, Card, Image, Table} from 'react-bootstrap';
import tree from "./tree.png"
import 'bootstrap/dist/css/bootstrap.min.css' // for the minimal css for table and buttons

// checks for matching password
function CheckPassword(props)
{
	// if good call the api 
	// else return an error message
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

export default class App extends Component {
  
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
  	return (
    <div class="container h-100" className="App">

    <div class="row h-100 justify-content-center align-items-center">
      <Card  style={{ width: '40rem' }}>
  		<Card.Img variant="top" src={tree} className = "tree"/>
  			<Card.Body >
			    <h1>Welcome James Zhou</h1>
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
				      <td>score</td>
				      <td>percentage</td>
				      <td>right/total</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>Intro to C</td>
				      <td>score</td>
				      <td>percentage</td>
				      <td>right/total</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>CSI</td>
				      <td>score</td>
				      <td>percentage</td>
				      <td>right/total</td>
				    </tr>
			      </tbody>

			      <tbody>
					<tr>
				      <td>CSII</td>
				      <td>score</td>
				      <td>percentage</td>
				      <td>right/total</td>
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

