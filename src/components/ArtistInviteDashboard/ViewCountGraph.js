import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryScatter,
  VictoryAxis,
} from 'victory'
import { colors } from '../../constants/styled/colors'
import { typeface } from '../../constants/styled/font_stack'
import ChartTitle from './ChartTitle'

export default class ViewCountGraph extends Component {
  static propTypes = {
    totalDailyImpressions: PropTypes.object,
  }

  static defaultTypes = {
    totalDailyImpressions: null,
  }

  dailyImpressions = () => {
    const { totalDailyImpressions } = this.props
    return totalDailyImpressions.valueSeq().toArray()
  }

  formattedDate = (date) => {
    return moment(date).format('MM/DD/YY')
  }

  render() {
    return (
      <div className="chart-container half">
        <ChartTitle title="Total Views Over Time" />
        <div className="chart-structure">
          <svg className="chart">
            <VictoryChart
              domainPadding={{y: 30}}
              standalone={false}
              width={660}
              height={310}
              padding={{ top: 30, bottom: -30, left: 0, right: 0 }}
              groupComponent={<g transform="translate(0, -60)" />}
              containerComponent={<VictoryVoronoiContainer/>}
            >
              <VictoryLine
                data={this.dailyImpressions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('impressions', '')}
                style={{data: {stroke: colors.black}}}
              />
              <VictoryAxis
                dependentAxis={true}
                tickValues={[0,100,200,300]}
                style={{
                  axis: {stroke: "translucent"},
                  axisLabel: {fontSize: 20, fontFamily: typeface.regular, fill: colors.mediumGrey, padding: 30},
                  grid: {stroke: colors.mediumGrey},
                  tickLabels: {fontSize: 12, fontFamily: typeface.regular, fill: colors.mediumGrey, padding: -34},
                }}
              />
              <VictoryAxis
                tickFormat={(t) => ''}
                style={{
                  axis: {stroke: "translucent"},
                }}
              />
              <VictoryScatter
                data={this.dailyImpressions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('impressions', '')}
                size={6}
                style={{data: {fill: colors.black}}}
                labelComponent={<VictoryTooltip pointerLength={8} pointerWidth={14} cornerRadius={0} height={50} width={100} orientation='top' flyoutStyle={{fill: colors.black}} style={{fill: colors.white, fontSize: 12, fontFamily: typeface.regular}} />}
                labels={(d) => `${this.formattedDate(d.x)}\n${d.y}`}
                events={[{
                  target: "data",
                  eventHandlers: {
                    onMouseEnter: () => {
                      return [
                        {
                          target: "data",
                          mutation: (props) => {
                            return { size: 7 };
                          }
                        }
                      ];
                    },
                    onMouseLeave: () => {
                      return [
                        {
                          target: "data",
                          mutation: (props) => {
                            return { size: 6 };
                          }
                        }
                      ];
                    },
                  }
                }]}
              />
            </VictoryChart>
          </svg>
        </div>
      </div>
    )
  }
}
