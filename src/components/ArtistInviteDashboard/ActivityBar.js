import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryBar,
} from 'victory'

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

  render() {
    return (
      <div style={{width: "800px", height: "300px", marginTop: "200px"}}>
        <svg viewBox="0 0 800 400">
          <VictoryChart
            standalone={false}
            domainPadding={20}
          >
            <VictoryBar
              standalone={false}
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
    )
  }
}
