import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory'
import { colors } from '../../constants/styled/colors'
import { typeface } from '../../constants/styled/font_stack'
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
      <div className="chart-container quarter">
        <ChartTitle title="Total Participants" />
        <div className="chart-structure">
          <svg viewBox="0 0 400 400" className="chart">
            <VictoryPie
              innerRadius={105}
              labelRadius={123}
              standalone={false}
              padding={60}
              data={[
                this.normalParticipants(),
                this.influentialParticipants(),
              ]}
              y="participants"
              x="type"
              labelComponent={<VictoryTooltip pointerLength={8} pointerWidth={14} cornerRadius={2} height={50} width={100} orientation='top' flyoutStyle={{fill: colors.black}} style={{fill: colors.white, fontSize: "16px", fontFamily: typeface.regular}}/>}
              colorScale={[colors.mediumGrey, colors.black]}
              events={[{
                target: "data",
                eventHandlers: {
                  onMouseEnter: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          return {
                            slice: { ...props.slice, startAngle: props.slice.startAngle + .04, endAngle: props.slice.endAngle - .04 },
                            style: { fill: props.style.fill, stroke: props.style.fill, strokeWidth: 10 }};
                        }
                      }
                    ];
                  },
                  onMouseLeave: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          return { strokeWidth: 0 };
                        }
                      }
                    ];
                  },
                }
              }]}
            />
            <VictoryLabel
              textAnchor="middle"
              standalone={false}
              style={{ fontSize: 48, fontWeight: 'normal', fontFamily: typeface.black }}
              x={200}
              y={200}
              text={this.totalParticipantCount()}
            />
            <VictoryLegend
              y={370}
              x={8}
              style={{ labels: { fontSize: 16, fontFamily: typeface.regular }}}
              orientation="horizontal"
              gutter={25}
              symbolSpacer={10}
              standalone={false}
              colorScale={[colors.black]}
              data={[
                {name: "Influencers"},
              ]}
            />
          </svg>
        </div>
      </div>
    )
  }
}
