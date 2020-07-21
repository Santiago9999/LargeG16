

// wrap RenderPersonalStats in multiple if statements to hardcode the right values to send
// figure out sending arrays of objects as props 
// get the buttons working 

import React, {Component, Link} from 'react'
import './App.css'
import Table from 'react-bootstrap/Table'
//import RenderPersonalStats from './RenderPersonalStats'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownButton, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' // for the minimal css for table and buttons


// renders based on state and sends info based on which state to RenderPersonalStats
// first issue was capitalizing all function and component names in react
// second issue was acutally passing in the value when calling the function
// third issue was that even a single element array needs to be mapped, so don't have an object as a single array
// fourth issue is i forgot the 'personal' in props.personal.score
// fifth issue is the differnce between arrow function and bind
function RenderPersonal(props)
{
  if (props.category === "Total")
  {
    return(<RenderPersonalStats name = {props.personal.name} 
                                right = {props.personal.totalR}
                                wrong = {props.personal.totalW}
                                percentage = {100 * props.personal.totalR / props.personal.totalW}
                                score = {props.personal.totalScore}/>)
  }
  else if (props.category === "Intro to C")
  {
    return(<RenderPersonalStats name = {props.personal.name} 
                                right = {props.personal.introR}
                                wrong = {props.personal.introW}
                                percentage = {100 * props.personal.introR / props.personal.introW}
                                score = {props.personal.introScore}/>)
  }
  else if (props.category === "CSI")
  {
    return(<RenderPersonalStats name = {props.personal.name} 
                                right = {props.personal.cs1R}
                                wrong = {props.personal.cs1W}
                                percentage = {100 * props.personal.cs1R / props.personal.cs1W}
                                score = {props.personal.cs1Score}/>)
  }
  else if (props.category === "CSII")
  {
    return(<RenderPersonalStats name = {props.personal.name} 
                                right = {props.personal.cs2R}
                                wrong = {props.personal.cs2W}
                                percentage = {100 * props.personal.cs2R / props.personal.cs2W}
                                score = {props.personal.cs2Score}/>)
  }
}

function RenderPersonalStats(props)
{
  
    return(

      <div>
           <Table borderd hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Right/Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.name}</td>
                <td>{props.score}</td>
                <td>{props.percentage.toFixed(2)}%</td>
                <td>{props.right}/{props.wrong}</td>
              </tr>
            </tbody>
          </Table>
      </div>
    )
}


// remember to map the leaders because it's an array of objects
// first error was knowing that leaders.map doesn't have to be in curly brackets becuase I haven't set up an HTML element for it to go into 
// if there was a div, then I need the curly brackets
// second issue was extracting index from key, just create a new prop that also contains index
function RenderLeaders(props)
{
  return(
      props.leaders.map( (leader, index) => (<RenderLeadersStats key = {++index} leader = {leader} rank = {index} />))
  )
}

function RenderLeadersStats(props)
{
  var percentage = 100 * props.leader.TotalCorrect / props.leader.TotalAttempted
  return (
    <tr>
      <td>{props.rank}</td>
      <td>{props.leader.FirstName} {props.leader.LastName}</td>
      <td>{props.leader.HighScore}</td>
      <td>{percentage.toFixed(2)}%</td>
      <td>{props.leader.TotalCorrect}/{props.leader.TotalAttempted}</td>
    </tr>
  )
}

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
        totalLeaders:[],
        introLeaders:[],
        cs1Leaders:[],
        cs2Leaders:[],
        personal: {name: "me", introScore: 12, cs1Score: 15, cs2Score: 16, totalScore: 40, 
        totalR: 123, totalW: 400, introR: 12, introW: 15, cs1R: 10, cs1W: 12, cs2R: 16, cs2W: 18},
        
        category: "Total",
        deleteValue: 10,
        numSpots: 5

    }
  }

  setIntro()
  {
    this.setState({category: "Intro to C"})
  }

  setCS1()
  {
    this.setState({category: "CSI"})
  }

  setCS2()
  {
    this.setState({category: "CSII"})
  }

  setTotal()
  {
    this.setState({category: "Total"})
  }

  set3()
  {
    this.setState({numberOfSpots: 3})
  }

  set5()
  {
    this.setState({numberOfSpots: 5})
  }

  set10()
  {
    this.setState({numberOfSpots: 10})
  }

  set25()
  {
    this.setState({numberOfSpots: 25})
  }

  // CORS error, had to install plugin, might work once we upload to github
  componentDidMount() 
  {
    // fetch for total leaders
    var url = 'https://cop4331mern.herokuapp.com/api/getTotalHighScores'
    var postRequest = 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numberOfSpots: this.state.numSpots })
    }
    fetch(url, postRequest)
      .then(res => res.json())
      .then(json => this.setState({ totalLeaders: json})
    );

    // fetch for intro leaders
    var url = 'https://cop4331mern.herokuapp.com/api/getIntroHighScores'
    var postRequest = 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numberOfSpots: this.state.numSpots })
    }
    fetch(url, postRequest)
      .then(res => res.json())
      .then(json => this.setState({ introLeaders: json})
    );

    // fetch for CS1 leaders
    var url = 'https://cop4331mern.herokuapp.com/api/getCS1HighScores'
    var postRequest = 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numberOfSpots: this.state.numSpots })
    }
    fetch(url, postRequest)
      .then(res => res.json())
      .then(json => this.setState({ cs1Leaders: json})
    );

    // fetch for CS2 leaders
    var url = 'https://cop4331mern.herokuapp.com/api/getCS2HighScores'
    var postRequest = 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numberOfSpots: this.state.numSpots })
    }
    fetch(url, postRequest)
      .then(res => res.json())
      .then(json => this.setState({ cs2Leaders: json})
    );

  }

  render()
  {
    var passLeader;
    if (this.state.category === "Total")
      passLeader = this.state.totalLeaders;
    else if (this.state.category === "Intro to C")
      passLeader = this.state.introLeaders;
    else if (this.state.category === "CSI")
      passLeader = this.state.cs1Leaders;
    else if (this.state.category === "CSII")
      passLeader = this.state.cs2Leaders;
    

    return(
    <div className = 'App' >

    <h1 id = 'title'>Trivia Crevice </h1> 
    <h1 id = 'title' class = 'spacer'>Leaderboards</h1>

    <h1> {this.state.testName}</h1>

    <div class = 'row'>
      
      <div class = 'col-md-4'><h2>{this.state.category} Personal Stats</h2></div>
      
      <div id = "drop1" className = "dropDown" class = 'col-md-6' >
        <DropdownButton  id="dropdown-basic-button" title="Category" variant = 'dark'>
          <Dropdown.Item id = 'ddOption' onClick = {this.setTotal.bind(this)}>Total</Dropdown.Item>        
          <Dropdown.Item id = 'ddOption' onClick = {this.setIntro.bind(this)}>Intro to C</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.setCS1.bind(this)}>CSI</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.setCS2.bind(this)}>CSII</Dropdown.Item>
        </DropdownButton>
      </div> 



    </div>

    <RenderPersonal category = {this.state.category} personal = {this.state.personal}/>

    <div class = 'row'>

    <h2 class = 'aboveSpacer col-md-4'>{this.state.category} Top {this.state.numSpots} Leaders</h2>


      <div id = "drop1" className = "dropDown" class = 'aboveSpacer col-md-8' >
        <DropdownButton  id="dropdown-basic-button" title= "Top{this.state.numSpots}" variant = 'dark'>
          <Dropdown.Item id = 'ddOption' onClick = {this.setTotal.bind(this)}>Total</Dropdown.Item>        
          <Dropdown.Item id = 'ddOption' onClick = {this.setIntro.bind(this)}>Intro to C</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.setCS1.bind(this)}>CSI</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.setCS2.bind(this)}>CSII</Dropdown.Item>
        </DropdownButton>
      </div> 
    </div>


    <Table borderd hover>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
          <th>Percentage</th>
          <th>Right/Total</th>
        </tr>
      </thead>
      <tbody>
        <RenderLeaders category = {this.state.category} leaders = {passLeader} />
      </tbody>
    </Table>
   </div>
    )
  }
}

