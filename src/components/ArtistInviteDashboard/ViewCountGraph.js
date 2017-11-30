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
  VictoryLabel,
} from 'victory'
import { numberToHuman } from '../../lib/number_to_human'
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
          <svg className="chart" viewBox="0 0 660 310">
            <VictoryChart
              domainPadding={{ x: [150, 10], y: 0 }}
              standalone={false}
              width={660}
              height={310}
              padding={{ top: 25, bottom: 25, left: 0, right: 0 }}
              containerComponent={<VictoryVoronoiContainer/>}
            >
              <VictoryAxis
                dependentAxis={true}
                tickFormat={(t) => `${numberToHuman(t, false)}`}
                tickLabelComponent={ <VictoryLabel dx="28" verticalAnchor="end" textAnchor="end" lineHeight="1.75" /> }
                style={{
                  axis: {stroke: "translucent"},
                  grid: {stroke: colors.mediumGrey},
                  tickLabels: {fontSize: 11, fontFamily: typeface.regular, fill: colors.mediumGrey, padding: -10},
                }}
              />
              <VictoryAxis
                tickFormat={(t) => ''}
                style={{
                  axis: {stroke: colors.mediumGrey},
                }}
              />
              <VictoryLine
                data={this.dailyImpressions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('impressions', '')}
                style={{data: {stroke: colors.black}}}
              />
              <VictoryScatter
                data={this.dailyImpressions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('impressions', '')}
                size={6}
                style={{data: {fill: colors.black}}}
                labelComponent={<VictoryTooltip pointerLength={8} pointerWidth={14} cornerRadius={2} height={50} width={100} orientation='top' flyoutStyle={{fill: colors.black}} style={{fill: colors.white, fontSize: 12, fontFamily: typeface.regular}} />}
                labels={(d) => `${this.formattedDate(d.x)}\n${numberToHuman(d.y, false)}`}
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
                            return { size: 5 };
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
