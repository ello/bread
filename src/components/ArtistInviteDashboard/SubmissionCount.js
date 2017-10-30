import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { VictoryLabel, VictoryLegend, VictoryPie } from 'victory'

export default class SubmissionCount extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    totalApprovedSubmissions: PropTypes.object,
    totalUnapprovedSubmissions: PropTypes.object,
    totalDeclinedSubmissions: PropTypes.object,
    totalSelectedSubmissions: PropTypes.object,
  }

  static defaultTypes = {
    totalApprovedSubmissions: null,
    totalUnapprovedSubmissions: null,
    totalDeclinedSubmissions: null,
    totalSelectedSubmissions: null,
  }

  render() {
    const {
      totalApprovedSubmissions,
      totalUnapprovedSubmissions,
      totalDeclinedSubmissions,
      totalSelectedSubmissions,
    } = this.props

    return (
      <div style={{width: "300px", height: "300px"}}>
        <svg viewBox="0 0 400 400">
          <VictoryPie
            innerRadius={105}
            standalone={false}
            padding={60}
            data={[
              totalUnapprovedSubmissions.toJS(),
              totalDeclinedSubmissions.toJS(),
              totalApprovedSubmissions.toJS(),
              totalSelectedSubmissions.toJS(),
            ]}
            x="submissions"
            y="status"
            labels={(data) => ""}
            colorScale={["lightgray", "red", "green", "orange"]}
          />
          <VictoryLabel
            textAnchor="middle"
            standalone={false}
            style={{ fontSize: 48, fontWeight: 600 }}
            x={200}
            y={200}
            text={165}
          />
          <VictoryLegend
            x={25}
            y={350}
            style={{ labels: { fontSize: 18 }}}
            orientation="horizontal"
            gutter={25}
            standalone={false}
            colorScale={["lightgray", "red", "green", "orange"]}
            data={[
              {name: "Unapproved"},//, symbol: {type: "circle", fill: "orange"}},
              {name: "Declined"},//, symbol: {type: "circle", fill: "orange"}},
              {name: "Approved"},//, symbol: {type: "circle", fill: "green"}},
              {name: "Selected"},//, symbol: {type: "circle", fill: "red"}},
            ]}
          />
        </svg>
      </div>
    )
  }
}
