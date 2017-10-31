import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory'
import moment from 'moment'

export default class SubmissionGraph extends Component {
  static propTypes = {
    totalDailySubmissions: PropTypes.array,
  }

  static defaultTypes = {
    totalDailySubmissions: null,
  }

  lineData() {
    return [...Array(10).keys()].map((daysAgo) => {
      return {
        submissions: Math.floor(Math.random() * 15) + 1,
        date: moment().subtract(daysAgo, 'd').valueOf(),
      }
    })
  }

  render() {
    const { totalDailySubmissions } = this.props
    return (
      <div style={{width: "400px", height: "200px"}}>
        <svg viewBox="0 0 400 400">
          <VictoryChart
            standalone={false}
          >
            <VictoryLine
              // Line
              standalone={false}
              data={totalDailySubmissions}
              x={(data) => data.get('date', '')}
              y={(data) => data.get('submissions', '')}
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
