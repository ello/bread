import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryGroup,
  VictoryScatter,
} from 'victory'
import ChartTitle from './ChartTitle'

export default class SubmissionGraph extends Component {
  static propTypes = {
    totalDailySubmissions: PropTypes.object,
  }

  static defaultTypes = {
    totalDailySubmissions: null,
  }

  dailySubmissions = () => {
    const { totalDailySubmissions } = this.props
    return totalDailySubmissions.valueSeq().toArray()
  }

  render() {
    return (
      <div className="chart-container half">
        <ChartTitle title="Total Submissions Over Time" />
        <div style={{width: "400px", height: "200px"}}>
          <svg viewBox="0 0 400 400">
            <VictoryChart
              standalone={false}
              containerComponent={<VictoryVoronoiContainer/>}
            >
              <VictoryGroup
                color="#c43a31"
                labels={(d) => `${d.x}\n${d.y}`}
                labelComponent={
                  <VictoryTooltip
                    style={{fontSize: 10}}
                  />
                }
                data={this.dailySubmissions()}
                x={(data) => data.get('date', '')}
                y={(data) => data.get('submissions', '')}
              >
                <VictoryLine />
                <VictoryScatter
                  events={[{
                    target: "data",
                    eventHandlers: {
                      onMouseEnter: () => {
                        return [
                          {
                            target: "data",
                            mutation: (props) => {
                              return { size: 8 };
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
                <VictoryAxis
                  dependentAxis={true}
                  tickFormat={(t) => ''}
                />
                <VictoryAxis
                  tickFormat={(t) => ''}
                />
              </VictoryGroup>
            </VictoryChart>
          </svg>
        </div>
      </div>
    )
  }
}
