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

  render() {
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
              data={this.dailyImpressions()}
              x={(data) => data.get('date', '')}
              y={(data) => data.get('impressions', '')}
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