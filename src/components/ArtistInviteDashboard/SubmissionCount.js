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
        <div className="chart-structure">
          <svg viewBox="0 0 400 400" className="chart">
            <VictoryPie
              innerRadius={105}
              labelRadius={123}
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
              labelComponent={<VictoryTooltip pointerLength={8} pointerWidth={14} cornerRadius={0} height={50} width={104} orientation='top' flyoutStyle={{fill: colors.black}} style={{fill: colors.white, fontSize: "16px", fontFamily: typeface.regular}}/>}
              colorScale={[colors.mediumGrey, colors.red, colors.green, colors.yellow]}
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
              text={totalSubmissions}
            />
            <VictoryLegend
              y={370}
              x={8}
              style={{ labels: { fontSize: 16, fontFamily: typeface.regular }}}
              orientation="horizontal"
              gutter={25}
              symbolSpacer={10}
              standalone={false}
              colorScale={[colors.yellow, colors.green, colors.red]}
              data={[
                {name: "Selected"},
                {name: "Approved"},
                {name: "Declined"},
              ]}
            />
          </svg>
        </div>
      </div>
    )
  }
}
