import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { numberToHuman } from '../../lib/number_to_human'

export default class ViewCountAverageOverlay extends Component {
  static propTypes = {
    totalImpressions: PropTypes.object,
    totalSubmissions: PropTypes.number,
  }

  static defaultTypes = {
    totalImpressions: null,
    totalSubmissions: null,
  }

  avgImpressionsPerSubmission = () => {
    const { totalImpressions, totalSubmissions } = this.props
    const impressions = totalImpressions.toJS().impressions
    const average = impressions / totalSubmissions
    return numberToHuman(average)
}

  render() {
    return (
      <div style={{width: "100px", height: "100px", margin: "100px 0px 0px 0px"}}>
        <p>Average Views Per Submission</p>
        <div style={{backgroundColor: "grey", textAlign: "center", padding: "70px"}}>
          { this.avgImpressionsPerSubmission() }
        </div>
      </div>
    )
  }
}
