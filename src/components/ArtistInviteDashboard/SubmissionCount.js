import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory'
import ChartTitle from './ChartTitle'

export default class SubmissionCount extends Component {
  static propTypes = {
    totalApprovedSubmissions: PropTypes.object,
    totalUnapprovedSubmissions: PropTypes.object,
    totalDeclinedSubmissions: PropTypes.object,
    totalSelectedSubmissions: PropTypes.object,
    totalSubmissions: PropTypes.number,
  }

  static defaultTypes = {
    totalApprovedSubmissions: null,
    totalUnapprovedSubmissions: null,
    totalDeclinedSubmissions: null,
    totalSelectedSubmissions: null,
    totalSubmissions: null,
  }

  unapprovedSubmissions = () => {
    const { totalUnapprovedSubmissions } = this.props
    return totalUnapprovedSubmissions.toJS()
  }

  declinedSubmissions = () => {
    const { totalDeclinedSubmissions } = this.props
    return totalDeclinedSubmissions.toJS()
  }

  approvedSubmissions = () => {
    const { totalApprovedSubmissions } = this.props
    return totalApprovedSubmissions.toJS()
  }

  selectedSubmissions = () => {
    const { totalSelectedSubmissions } = this.props
    return totalSelectedSubmissions.toJS()
  }

  render() {
    const { totalSubmissions } = this.props
    return (
      <div className="chart-container quarter">
        <ChartTitle title="Total Submissions" />
        <div style={{width: "300px", height: "300px"}}>
          <svg viewBox="0 0 400 400">
            <VictoryPie
              innerRadius={105}
              standalone={false}
              padding={60}
              data={[
                this.unapprovedSubmissions(),
                this.declinedSubmissions(),
                this.approvedSubmissions(),
                this.selectedSubmissions(),
              ]}
              y="submissions"
              x="status"
              labelComponent={<VictoryTooltip/>}
              colorScale={["lightgray", "red", "green", "orange"]}
            />
            <VictoryLabel
              textAnchor="middle"
              standalone={false}
              style={{ fontSize: 48, fontWeight: 600 }}
              x={200}
              y={200}
              text={totalSubmissions}
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
      </div>
    )
  }
}
