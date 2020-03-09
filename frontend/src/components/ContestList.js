import React, {Component} from 'react';
import Contest from './Contest'
import ContestSelector from './ContestSelector'


class ContestList extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedContest: null
    }
    this.handleContestSelected = this.handleContestSelected.bind(this)
    this.getContestById = this.getContestById.bind(this)
  }


  handleContestSelected(id){
    const intId = parseInt(id)
    this.setState({selectedContest: intId})
  }

  getContestById(){
    const selectedContest = this.props.contests.find(contest => {
      console.log(contest)
      return contest.id === this.state.selectedContest
    })
    return selectedContest
  }

  render(){
    return(
      <>
      <h2>Your Contests</h2>
      <ContestSelector contests={this.props.contests} onContestSelected={this.handleContestSelected} />
      <Contest selectedContest={this.getContestById()} />
      </>
    )
  }

}

export default ContestList;
