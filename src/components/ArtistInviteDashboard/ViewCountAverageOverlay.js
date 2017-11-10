import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { numberToHuman } from '../../lib/number_to_human'
import styled from 'styled-components'
import { colors } from '../../constants/styled/colors'
import { ff, fs } from '../../constants/styled/font_stack'

import ChartTitle from './ChartTitle'

const Chart = styled.div`
  position: relative;
  padding-bottom: 100%;

  p {
    position: absolute;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .stat {
      display: block;
      ${ff.black.full}
      ${fs.h3.size}
      color: ${colors.black};
    }
  }
`

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
      <div className="chart-container quarter">
        <ChartTitle title="Average Views Per Submission" />
        <Chart className="chart">
          <p>
            <span className="stat">{ this.avgImpressionsPerSubmission() }</span>
          </p>
        </Chart>
      </div>
    )
  }
}
