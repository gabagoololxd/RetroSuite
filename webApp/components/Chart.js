import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import d3 from 'd3';
import _ from 'lodash';

import './style.scss';


const Chart = React.createClass({
  getInitialState: function() {
    return {
      windowWidth: 0,
      showBarLabel: false
    }
  },

  componentDidMount: function() {
    window.setTimeout(()=>this.handleResize(), 200);
    window.setTimeout(()=>this.setState({showBarLabel:true}), 1200); //render labels slightly after bar fills up
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    if(window.innerWidth > 600) {
      this.setState({windowWidth: window.innerWidth * 0.18});
    } else {
      this.setState({windowWidth: window.innerWidth * 0.28});
    }
  },

  _getButtonLabel: function(index) {
    switch (index) {
      case 0:
          return 'A';
      case 1:
          return 'B';
      case 2:
          return 'Up';
      case 3:
          return 'Right';
      case 4:
          return 'Down';
      case 5:
          return 'Left';
      case 6:
          return 'Start';
      case 7:
          return 'Select';
      default:
          break;
    }
  },

  _getBarLabelColor: function(x, n) {
    return 'black';
  },

  _getBarLabelPosition: function(x, n) {
    if(n===0) {
      return +5;
    } else {
      return 5 + (5 * n.toString().length);
    }
  },

  render: function() {
    const data = this.props.data || []
    const width = this.state.windowWidth
    console.log('windowheight', window.innerHeight)
    const barHeight = window.innerHeight / 58;
    const margin = 0;
    const leftLabelSpace = 40;

    const x = d3.scale.linear()
                .domain([0, _.max(data)])
                .range([0, width-leftLabelSpace-27])

    const colorScaleBar = d3.scale.linear()
                         .domain(data)
                         .range(["#311b92","#311b92","#311b92","#311b92","#311b92","#311b92","#311b92", "#311b92"])

    return (
      <svg
        className="chart csstrans"
        width={width}
        height={barHeight * data.length}
      >
        <ReactCSSTransitionGroup
          transitionName="addBar"
          component="g"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={3000}
          >
        {
          data.map((n, i) => (
            <g key={i}>
              <g
                transform={`translate(${margin},${barHeight*i})`}>
                <rect
                  fill={'transparent'}
                  width={leftLabelSpace}
                  height={barHeight-1}
                 />
                <text
                  x="30"
                  y="9"
                  dy=".005em"
                  style={{fill:'Black'}}
                >
                  {this._getButtonLabel(i)}
                </text>
              </g>
              <g
                transform={`translate(${leftLabelSpace},${barHeight*i})`}>
                <rect
                  fill={colorScaleBar(n)}
                  width={x(n)}
                  height={barHeight-1}
                 />
                <text
                  x={x(n)+this._getBarLabelPosition(x, n)}
                  y="9"
                  dy=".005em"
                  style={{fill:this._getBarLabelColor(x, n)}}
                >
                  {this.state.showBarLabel ? n : null}
                </text>
              </g>
            </g>
          ))
        }
        </ReactCSSTransitionGroup>
      </svg>
    )
  }
})

export default Chart
