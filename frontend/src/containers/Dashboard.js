import React, { Component } from 'react'
import ContestList from '../components/ContestList.js'
import NavBar from '../components/NavBar'
import {BrowserRouter as Router, Route } from "react-router-dom"
import ContestForm from '../components/ContestForm.js'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      contests:  [],
      createdContest: null,
      createdGuessable: null,
      createdPlayer: null
    }
    this.handleContestSubmit = this.handleContestSubmit.bind(this);
    this.handleGuessableSubmit = this.handleGuessableSubmit.bind(this);
    this.handlePlayerSubmit = this.handlePlayerSubmit.bind(this);
    this.handlePredictionSubmit = this.handlePredictionSubmit.bind(this);
  }

  componentDidMount(){
      const url = 'http://localhost:8080/contests'

      fetch(url)
      .then(res => res.json())
      .then(contests => this.setState({ contests: contests._embedded.contests }))
      .catch(err => console.error);
  }

  handleContestSubmit(submittedContest) {
    console.log(submittedContest);

    fetch('http://localhost:8080/contests', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: submittedContest.title
      })
    })
    .then(res => res.json())
    .then(contest =>{
          // console.log(contest)
          const updatedContests = [...this.state.contests, contest];
          this.setState({
            contests: updatedContests,
            createdContest: contest
          });
        })
  }

  handleGuessableSubmit(submittedGuessable){

    fetch('http://localhost:8080/guessables', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: submittedGuessable.title,
        contest: `http://localhost:8080/contests/${this.state.createdContest.id}`,
        result: ""
      })
    })
    .then(res => res.json())
    .then(guessable =>{
          this.setState({
            createdGuessable: guessable
          })
          });
  }

  handlePlayerSubmit(submittedPlayer){
    fetch('http://localhost:8080/players', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: submittedPlayer.name
      })
    })
    .then(res => res.json())
    .then(player =>{
          this.setState({
            createdPlayer: player
          })
        });
  }

  handlePredictionSubmit(submittedPrediction){
    fetch('http://localhost:8080/predictions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        predictionTitle: submittedPrediction.predictionTitle,
        player: `http://localhost:8080/players/${this.state.createdPlayer.id}`,
        guessable: `http://localhost:8080/guessables/${this.state.createdGuessable.id}`
      })
    })
    .then(res => res.json())
    .then(prediction =>{
          console.log(prediction)
        });
  }


  render() {
    return(
      <Router>
        <React.Fragment>
        <NavBar/>
            <Route
            path="/add-contest"
            render={() => <ContestForm onContestSubmit={this.handleContestSubmit} onGuessableSubmit={this.handleGuessableSubmit}
            createdContest={this.state.createdContest} createdGuessable={this.state.createdGuessable} createdPlayer={this.state.createdPlayer} onPlayerSubmit={this.handlePlayerSubmit} onPredictionSubmit={this.handlePredictionSubmit} />}
            />
            <Route
            exact
            path="/"
            render={() => <ContestList contests={this.state.contests} />}
            />
        </React.Fragment>
      </Router>

    )
  };
}
;
export default Dashboard;
