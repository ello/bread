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

  maxImpressions = () => {
    const submissions = this.dailyImpressions().map(function(datum) {
      const submissionsEntry = datum._root.entries[1][1]
      if ((submissionsEntry !== undefined)) {
        return submissionsEntry
      }
      return 0
    })

    let max = Math.max.apply(null, submissions)
    max = Number.parseInt(max, 10)
    return max
  }

  render() {
    console.log()
    return (
      <div className="chart-container half">
        <ChartTitle title="Total Views Over Time" />
        <div className="chart-structure">
          <svg className="chart" viewBox="0 0 660 310">
            <VictoryChart
              domain={{y: [0, this.maxImpressions()]}}
              domainPadding={{ x: [0, 80], y: 0 }}
              standalone={false}
              width={660}
              height={310}
              padding={{ top: 20, bottom: 20, left: 0, right: 0 }}
              containerComponent={<VictoryVoronoiContainer/>}
            >
              <VictoryAxis
                dependentAxis={true}
                tickCount={12}
                tickFormat={(t, i) => i % 2 === 0 ? `${numberToHuman(t, false)}` : ''}
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
                groupComponent={<g transform="translate(60)"/>}
              />
              <VictoryScatter
                data={this.dailyImpressions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('impressions', '')}
                size={6}
                style={{data: {fill: colors.black}}}
                groupComponent={<g transform="translate(60)"/>}
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
