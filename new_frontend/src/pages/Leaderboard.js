// wrap RenderPersonalStats in multiple if statements to hardcode the right values to send
// figure out sending arrays of objects as props 
// get the buttons working 

import React, {Component, Link} from 'react'
//import './App.css'
import Table from 'react-bootstrap/Table'
//import RenderPersonalStats from './RenderPersonalStats'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownButton, Button} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css' // for the minimal css for table and buttons
import NavigationBarLogged from '../components/NavigationBarLogged';

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


// renders based on state and sends info based on which state to RenderPersonalStats
// first issue was capitalizing all function and component names in react
// second issue was acutally passing in the value when calling the function
// third issue was that even a single element array needs to be mapped, so don't have an object as a single array
// fourth issue is i forgot the 'personal' in props.personal.score
// fifth issue is the differnce between arrow function and bind
function RenderPersonal(props)
{
  var totalPercent;
  var introPercent;
  var CS1Percent;
  var CS2Percent;

  if (props.totalArray.TotalAttempted === 0)
    totalPercent = 0;
  else
    totalPercent = props.totalArray.TotalCorrect / props.totalArray.TotalAttempted * 100

  if (props.introArray.TotalAttempted === 0)
    introPercent = 0;
  else
    introPercent = props.introArray.TotalCorrect / props.introArray.TotalAttempted * 100

  if (props.CS1Array.TotalAttempted === 0)
    CS1Percent = 0;
  else
    CS1Percent = props.CS1Array.TotalCorrect / props.CS1Array.TotalAttempted * 100

  if (props.CS2Array.TotalAttempted === 0)
    CS2Percent = 0;
  else
    CS2Percent = props.CS2Array.TotalCorrect / props.CS2Array.TotalAttempted * 100

  if (props.category === "Total")
  {
    return(<RenderPersonalStats name = {props.name} 
                                right = {props.totalArray.TotalCorrect}
                                attempted = {props.totalArray.TotalAttempted}
                                percentage = {totalPercent}
                                score = {props.totalArray.HighScore}/>)
  }
  else if (props.category === "Intro to C")
  {
    return(<RenderPersonalStats name = {props.name} 
                                right = {props.introArray.TotalCorrect}
                                attempted = {props.introArray.TotalAttempted}
                                percentage = {introPercent}
                                score = {props.introArray.HighScore}/>)
  }
  else if (props.category === "CSI")
  {
    return(<RenderPersonalStats name = {props.name} 
                                right = {props.CS1Array.TotalCorrect}
                                attempted = {props.CS1Array.TotalAttempted}
                                percentage = {CS1Percent}
                                score = {props.CS1Array.HighScore}/>)
  }
  else if (props.category === "CSII")
  {
    return(<RenderPersonalStats name = {props.name} 
                                right = {props.CS2Array.TotalCorrect}
                                attempted = {props.CS2Array.TotalAttempted}
                                percentage = {CS2Percent}
                                score = {props.CS2Array.HighScore}/>)
  }
}

function RenderPersonalStats(props)
{
  
    return(

      <div>
           <Table hover>
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
                <td>{props.right}/{props.attempted}</td>
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
  var percentage;
  
  if (props.leader.TotalAttempted === 0)  
    percentage = 0;
  else
    percentage = 100 * props.leader.TotalCorrect / props.leader.TotalAttempted;

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
        
        ID: "",
        firstName: "",
        lastName: "",

        introArray: [],

        CS1Array: [],

        CS2Array: [],

        totalArray: [],
                
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
    this.setState({numSpots: 3})
  }

  set5()
  {
    this.setState({numSpots: 5})
  }

  set10()
  {
    this.setState({numSpots: 10})
  }

  set25()
  {
    this.setState({numSpots: 25})
  }
  
    componentDidUpdate(prevProps, prevState){
    if (this.state.numSpots !== prevState.numSpots) {
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
        .then(json => this.setState({ totalLeaders: json })
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
        .then(json => this.setState({ introLeaders: json })
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
        .then(json => this.setState({ cs1Leaders: json })
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
        .then(json => this.setState({ cs2Leaders: json })
        );
    }
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



  var dummyID = getCookie('ID');
  var dummyfirstName = getCookie('firstName');
  var dummylastName = getCookie('lastName');
  var dummyintroString = getCookie('Intro');
  var dummyintroArray = JSON.parse(dummyintroString);
  var dummyCS1String = getCookie('CS1');
  var dummyCS1Array = JSON.parse(dummyCS1String);
  var dummyCS2String = getCookie('CS2');
  var dummyCS2Array = JSON.parse(dummyCS2String);
  var dummytotalString = getCookie('Total');
  var dummytotalArray = JSON.parse(dummytotalString);

//   this.setState({
//     ID: dummyID, firstName: dummyfirstName, lastName: dummylastName, 
//     introArray: dummyintroArray, CS1Array: dummyCS1Array, CS2Array: dummyCS2Array, 
//     totalArray: dummytotalArray
//   })


    

    return(
    <div className = 'App' >
        <NavigationBarLogged />

    <h1 id = 'leaderboard'>Trivia Crevice </h1> 
    <h1 id = 'leaderboard' class = 'spacer'>Leaderboards</h1>

    <h1> {this.state.testName}</h1>

    <div class = 'row'>
      
      <div id = 'statTitle' class = 'col-md-4'><h2>{this.state.category} Personal Stats</h2></div>
      
      <div id = "drop1" className = "dropDown" class = 'col-md-7' >
        <DropdownButton  id="dropdown-basic-button" title="Category" variant = 'dark'>
          <Dropdown.Item id = 'ddOption' onClick = {this.setTotal.bind(this)}>Total</Dropdown.Item>        
          <Dropdown.Item id = 'ddOption' onClick = {this.setIntro.bind(this)}>Intro to C</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.setCS1.bind(this)}>CSI</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.setCS2.bind(this)}>CSII</Dropdown.Item>
        </DropdownButton>
      </div> 



    </div>

    <RenderPersonal category = {this.state.category} name = {dummyfirstName + " " + dummylastName} 
    totalArray = {dummytotalArray} introArray = {dummyintroArray} CS1Array = {dummyCS1Array} CS2Array = {dummyCS2Array}/>

    <div class = 'row'>

    <div id = 'statTitle' class = 'aboveSpacer col-md-4'><h2>{this.state.category} Top {this.state.numSpots} Leaders</h2></div>


      <div id = "drop1" className = "dropDown" class = 'aboveSpacer col-md-7' >
        <DropdownButton  id="dropdown-basic-button" title = "Top Scores" variant = 'dark'>
          <Dropdown.Item id = 'ddOption' onClick = {this.set3.bind(this)}>3</Dropdown.Item>        
          <Dropdown.Item id = 'ddOption' onClick = {this.set5.bind(this)}>5</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.set10.bind(this)}>10</Dropdown.Item>
          <Dropdown.Item id = 'ddOption' onClick = {this.set25.bind(this)}>25</Dropdown.Item>
        </DropdownButton>
      </div> 
    </div>


    <Table hover>
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

