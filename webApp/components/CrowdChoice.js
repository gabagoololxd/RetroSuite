import React, { Component } from 'react';
import Chart from './Chart.js'

class CrowdChoice extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     connections: 0
  //   }
  // }

  // componentDidMount() {
  //   const { socket } = this.props;

  //   socket.on('connections', (total) => {
  //     this.setState({
  //       connections: total
  //     });
  //   });
  // }

  render() {
    return (
      <div className="col s4" >
        <div className="row no-bottom-margin" >
          <b className="left-align">Votes:</b>
        </div>
        <Chart data={this.props.votes}/>
      </div>
    );
  }
}

 // ['a', 'b', 'Up', 'Right', 'Down', 'Left', 'Start', 'Select']    [35, 15, 4, 20, 9, 2, 0, 1]

export default CrowdChoice;
