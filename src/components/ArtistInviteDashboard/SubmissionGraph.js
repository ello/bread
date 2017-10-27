import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import moment from 'moment'


export default class SubmissionGraph extends Component {

  lineData() {
    return [...Array(10).keys()].map((daysAgo) => {
      return {
        submissions: Math.floor(Math.random() * 15) + 1,
        date: moment().subtract(daysAgo, 'd').valueOf(),
      }
    })
  }


  render() {
    return (
      <div style={{width: "400px", height: "200px"}}>
        <svg viewBox="0 0 400 400">
          <VictoryChart
            standalone={false}
          >
            <VictoryLine
              // Line
              standalone={false}
              data={this.lineData()}
              x={(data) => data.date}
              y={(data) => data.submissions}
            />
            <VictoryAxis
              // X Axis
              standalone={false}
              tickFormat={(value) => moment(value).format('YYYY-MM-DD')}
            />
            <VictoryAxis
              // Y Axis
              standalone={false}
              dependentAxis={true}
            />
          </VictoryChart>
        </svg>
      </div>
    )
  }
}
