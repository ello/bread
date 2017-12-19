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

    if (Number.isNaN(impressions)) {
      return 0
    }
    return numberToHuman(impressions)
}

  render() {
    return (
      <div className="chart-container quarter">
        <ChartTitle title="Total Views" />
        <div className="chart-structure">
          <Chart className="chart">
            <p>
              <span className="stat">{ this.totalImpressionsFmt() }</span>
            </p>
          </Chart>
        </div>
      </div>
    )
  }
}
