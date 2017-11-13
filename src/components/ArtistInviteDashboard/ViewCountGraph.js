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
          <svg viewBox="0 0 660 310" className="chart">
            <VictoryChart
              domainPadding={{y: 30}}
              standalone={false}
              height={400}
              width={300}
              groupComponent={<g transform="translate(0, -60)" />}
              containerComponent={<VictoryVoronoiContainer/>}
            >
              <VictoryLine
                data={this.dailyImpressions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('impressions', '')}
              />
              <VictoryAxis
                dependentAxis={true}
                tickValues={[0,100,200,300]}
                style={{
                  axis: {stroke: "translucent"},
                  axisLabel: {fontSize: 20, padding: 30},
                  grid: {stroke: "#ACACAC"},
                  tickLabels: {fontSize: 15, padding: 5},
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
                labelComponent={<VictoryTooltip cornerRadius={0} height={50} width={65} orientation='top' flyoutStyle={{fill: "black"}} style={{fill: "white"}} />}
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
