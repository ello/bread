import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from 'victory'
import { numberToHuman } from '../../lib/number_to_human'
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

  isLoaded = () => {
    const {
      totalCommentActivity,
      totalFollowerActivity,
      totalLoveActivity,
      totalMentionActivity,
      totalRepostActivity,
    } = this.props
    return !totalCommentActivity.isEmpty() &&
      !totalFollowerActivity.isEmpty() &&
      !totalLoveActivity.isEmpty() &&
      !totalMentionActivity.isEmpty() &&
      !totalRepostActivity.isEmpty()
  }

  isEmpty = () => {
    return this.commentActivity().activities === 0 &&
      this.followerActivity().activities === 0 &&
      this.loveActivity().activities === 0 &&
      this.mentionActivity().activities === 0 &&
      this.repostActivity().activities === 0
  }

  render() {
    return (
      <div className="chart-container full">
        <ChartTitle title="On Network Activity" />
        {this.isLoaded() && !this.isEmpty() ?
          <div className="chart-structure">
            <svg className="chart bar" viewBox="0 0 1360 310">
              <VictoryChart
                domainPadding={{ x: [250, 250], y: [0, 0] }}
                standalone={false}
                width={1360}
                height={310}
                padding={{ top: 25, bottom: 40, left: 0, right: 0 }}
              >
                <VictoryAxis
                  dependentAxis={true}
                  tickCount={6}
                  tickFormat={(t, i) => i % 2 === 0 ? `${numberToHuman(t, false)}` : ''}
                  tickLabelComponent={ <VictoryLabel dx="-5" verticalAnchor="end" textAnchor="end" lineHeight="1.75" /> }
                  style={{
                    axis: {stroke: "translucent"},
                    grid: {stroke: colors.mediumGrey},
                    tickLabels: {fontSize: 12, fontFamily: typeface.regular, fill: colors.mediumGrey, padding: -44},
                  }}
                />
                <VictoryAxis
                  tickFormat={(t) => this.capitalize(t)}
                  style={{
                    axis: {stroke: colors.mediumGrey},
                    tickLabels: {fontSize: 12, fontFamily: typeface.regular, fill: colors.black},
                  }}
                />
                <VictoryBar
                  standalone={false}
                  labelComponent={<VictoryTooltip pointerLength={8} pointerWidth={14} cornerRadius={2} height={50} width={100} orientation='top' flyoutStyle={{fill: colors.black}} style={{fill: colors.white, fontSize: 12, fontFamily: typeface.regular}} />}
                  labels={(d) => `${d.x}\n${numberToHuman(d.y, false)}`}
                  data={[
                    this.commentActivity(),
                    this.followerActivity(),
                    this.loveActivity(),
                    this.mentionActivity(),
                    this.repostActivity(),
                  ]}
                  style={{ data: { width: 40 } }}
                  x="type"
                  y="activities"
                />
              </VictoryChart>
            </svg>
          </div> :
          <div className="chart-structure loading">
            <div className="chart">
              <h4>{(this.isLoaded() && this.isEmpty()) ? 'Not enough data yet…' : 'Loading…'}</h4>
            </div>
          </div>
        }
      </div>
    )
  }
}
