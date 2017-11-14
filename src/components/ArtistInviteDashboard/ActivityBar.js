import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryAxis,
} from 'victory'
import { colors } from '../../constants/styled/colors'
import { typeface } from '../../constants/styled/font_stack'
import ChartTitle from './ChartTitle'

export default class ActivityBar extends Component {
  static propTypes = {
    totalCommentActivity: PropTypes.object,
    totalFollowerActivity: PropTypes.object,
    totalLoveActivity: PropTypes.object,
    totalMentionActivity: PropTypes.object,
    totalRepostActivity: PropTypes.object,
  }

  static defaultTypes = {
    totalCommentActivity: null,
    totalFollowerActivity: null,
    totalLoveActivity: null,
    totalMentionActivity: null,
    totalRepostActivity: null,
  }

  commentActivity = () => {
    const { totalCommentActivity } = this.props
    return totalCommentActivity.toJS()
  }

  followerActivity = () => {
    const { totalFollowerActivity } = this.props
    return totalFollowerActivity.toJS()
  }

  loveActivity = () => {
    const { totalLoveActivity } = this.props
    return totalLoveActivity.toJS()
  }

  mentionActivity = () => {
    const { totalMentionActivity } = this.props
    return totalMentionActivity.toJS()
  }

  repostActivity = () => {
    const { totalRepostActivity } = this.props
    return totalRepostActivity.toJS()
  }

  capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  render() {
    return (
      <div className="chart-container full">
        <ChartTitle title="On Network Activity" />
        <div className="chart-structure">
          <svg className="chart bar">
            <VictoryChart
              standalone={false}
              width={1360}
              height={310}
              padding={{ top: 20, bottom: 40, left: 0, right: 0 }}
            >
              <VictoryAxis
                dependentAxis={true}
                tickValues={[0,1,2,3,4,5]}
                style={{
                  axis: {stroke: "translucent"},
                  axisLabel: {fontSize: 20, fontFamily: typeface.regular, padding: 30},
                  grid: {stroke: colors.mediumGrey},
                  tickLabels: {fontSize: 12, fontFamily: typeface.regular, fill: colors.mediumGrey, padding: -34},
                }}
              />
              <VictoryAxis
                role={'yolo'}
                offsetY={40}
                domain={{ x: [0, 6] }}
                tickFormat={(t) => this.capitalize(t)}
                style={{
                  axis: {stroke: "translucent"},
                  tickLabels: {fontSize: 12, fontFamily: typeface.regular, fill: colors.black},
                }}
              />
              <VictoryBar
                standalone={false}
                labelComponent={<VictoryTooltip pointerLength={8} pointerWidth={14} cornerRadius={0} height={50} width={100} orientation='top' flyoutStyle={{fill: colors.black}} style={{fill: colors.white, fontSize: 12, fontFamily: typeface.regular}} />}
                data={[
                  this.commentActivity(),
                  this.followerActivity(),
                  this.loveActivity(),
                  this.mentionActivity(),
                  this.repostActivity(),
                ]}
                x="type"
                y="activities"
              />
            </VictoryChart>
          </svg>
        </div>
      </div>
    )
  }
}
