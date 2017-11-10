import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { numberToHuman } from '../../lib/number_to_human'
import ChartTitle from './ChartTitle'

export default class ViewCountOverlay extends Component {
  static propTypes = {
    totalImpressions: PropTypes.object,
  }

  static defaultTypes = {
    totalImpressions: null,
  }

  totalImpressionsFmt = () => {
    const { totalImpressions } = this.props
    const impressions = totalImpressions.toJS().impressions
    return numberToHuman(impressions)
}

  render() {
    return (
      <div className="chart-container quarter">
        <ChartTitle title="Total Views" />
        <div style={{width: "100px", height: "100px", margin: "100px 0px 0px 0px"}}>
          <div style={{backgroundColor: "grey", textAlign: "center", padding: "70px"}}>
            { this.totalImpressionsFmt() }
          </div>
        </div>
      </div>
    )
  }
}
