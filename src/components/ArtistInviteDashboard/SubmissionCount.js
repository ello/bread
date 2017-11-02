import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory'

export default class SubmissionCount extends Component {
  static propTypes = {
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

  //TODO: Move labels to reducer
  unapprovedSubmissions = () => {
    const { totalUnapprovedSubmissions } = this.props
    const total = totalUnapprovedSubmissions.toJS()
    return Object.assign(total, { label: `Unapproved\n${total.submissions}` })
  }

  declinedSubmissions = () => {
    const { totalDeclinedSubmissions } = this.props
    const total = totalDeclinedSubmissions.toJS()
    return Object.assign(total, { label: `Declined\n${total.submissions}` })
  }

  approvedSubmissions = () => {
    const { totalApprovedSubmissions } = this.props
    const total = totalApprovedSubmissions.toJS()
    return Object.assign(total, { label: `Approved\n${total.submissions}` })
  }

  selectedSubmissions = () => {
    const { totalSelectedSubmissions } = this.props
    const total = totalSelectedSubmissions.toJS()
    return Object.assign(total, { label: `Selected\n${total.submissions}` })
  }

  totalSubmissionCount = () => {
    const {
      totalUnapprovedSubmissions,
      totalDeclinedSubmissions,
      totalApprovedSubmissions,
      totalSelectedSubmissions,
    } = this.props
    return totalDeclinedSubmissions.get('submissions', 0)
      + totalUnapprovedSubmissions.get('submissions', 0)
      + totalApprovedSubmissions.get('submissions', 0)
      + totalSelectedSubmissions.get('submissions', 0)
  }

  render() {
    return (
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
            x="submissions"
            y="status"
            labelComponent={<VictoryTooltip/>}
            colorScale={["lightgray", "red", "green", "orange"]}
          />
          <VictoryLabel
            textAnchor="middle"
            standalone={false}
            style={{ fontSize: 48, fontWeight: 600 }}
            x={200}
            y={200}
            text={this.totalSubmissionCount()}
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
