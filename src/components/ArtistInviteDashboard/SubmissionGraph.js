import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryGroup,
  VictoryScatter,
} from 'victory'

export default class SubmissionGraph extends Component {
  static propTypes = {
    totalDailySubmissions: PropTypes.array,
  }

  static defaultTypes = {
    totalDailySubmissions: null,
  }

  render() {
    const { totalDailySubmissions } = this.props
    return (
      <div style={{width: "400px", height: "200px"}}>
        <svg viewBox="0 0 400 400">
          <VictoryChart
            standalone={false}
            containerComponent={<VictoryVoronoiContainer/>}
          >
            <VictoryGroup
              color="#c43a31"
              labels={(d) => d.y}
              labelComponent={
                <VictoryTooltip
                  style={{fontSize: 10}}
                />
              }
              data={totalDailySubmissions}
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
            </VictoryGroup>
          </VictoryChart>
        </svg>
      </div>
    )
  }
}
