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
    totalNormalParticipants: PropTypes.object,
    totalInfluentialParticipants: PropTypes.object,
  }

  static defaultTypes = {
    totalNormalParticipants: null,
    totalInfluentialParticipants: null,
  }

  normalParticipants = () => {
    const { totalNormalParticipants } = this.props
    return totalNormalParticipants.toJS()
  }

  influentialParticipants = () => {
    const { totalInfluentialParticipants } = this.props
    return totalInfluentialParticipants.toJS()
  }

  totalParticipantCount = () => {
    const { totalNormalParticipants, totalInfluentialParticipants } = this.props
    return totalNormalParticipants.get('participants', 0) + totalInfluentialParticipants.get('participants', 0)
  }

  render() {
    return (
      <div>
        <ChartTitle title="Total Participants" />
        <div style={{width: "300px", height: "300px"}}>
          <svg viewBox="0 0 400 400">
            <VictoryPie
              innerRadius={105}
              standalone={false}
              padding={60}
              data={[
                this.normalParticipants(),
                this.influentialParticipants(),
              ]}
              y="participants"
              x="type"
              labelComponent={<VictoryTooltip/>}
              colorScale={["lightgray", "black"]}
            />
            <VictoryLabel
              textAnchor="middle"
              standalone={false}
              style={{ fontSize: 48, fontWeight: 600 }}
              x={200}
              y={200}
              text={this.totalParticipantCount()}
            />
            <VictoryLegend
              x={25}
              y={350}
              style={{ labels: { fontSize: 18 }}}
              orientation="horizontal"
              gutter={25}
              standalone={false}
              colorScale={["lightgray", "black"]}
              data={[
                {name: "Normal"},
                {name: "Influential"},
              ]}
            />
          </svg>
        </div>
      </div>
    )
  }
}
