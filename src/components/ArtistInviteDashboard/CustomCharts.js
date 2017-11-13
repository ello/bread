import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import {
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory'
import { numberToHuman } from '../../lib/number_to_human'

import styled from 'styled-components'
import { colors } from '../../constants/styled/colors'
import { ff, fs } from '../../constants/styled/font_stack'
import { media } from '../../constants/styled/mixins'

import ChartTitle from './ChartTitle'

const ChartsHolder = styled.section`
  width: 100%;

  .chart-container {
    display: block;
    margin-right: 40px;
    margin-bottom: 40px;
    float: left;

    &:nth-child(4n) {
      margin-right: 0;
    }

    &.quarter { width: calc(25% - 20px); }
    &.half { width: calc(50% - 40px); }
    &.full { width: 100%; }
    ${media.max1360`
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.quarter { width: calc(25% - 10px); }
      &.half { width: calc(50% - 20px); }
      &.full { width: 100%; }
    `}

    .chart {
      width: 100%;
      background-color: ${colors.grey};
      border-radius: 5px;
    }
  }
`

const OverlayChart = styled.div`
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

function pieChartLegend(data) {
  const x = data.map(function(datum) {
    return { name: datum.get('title') }
  })
  return x.toJS()
}

function overlayNumber(data) {
  if (Number.isInteger(data)) {
    return numberToHuman(data)
  } else {
    const fmtData = data.replace(',', '')
    const parsedInt = parseInt(fmtData, 10)
    return numberToHuman(parsedInt)
  }
}

const CustomPie = ({
  datum,
}) =>
  <div className="chart-container quarter">
    <ChartTitle title={datum.get('title')} />
    <svg viewBox="0 0 400 400" className="chart">
      <VictoryPie
        innerRadius={105}
        standalone={false}
        padding={60}
        data={datum.get('data', Immutable.List()).toJS()}
        y="title"
        x="value"
        labelComponent={<VictoryTooltip/>}
        colorScale={["lightgray", "black", "green", "orange"]}
      />
      <VictoryLegend
        x={25}
        y={350}
        style={{ labels: { fontSize: 18 }}}
        orientation="horizontal"
        gutter={25}
        standalone={false}
        colorScale={["lightgray", "black", "green", "orange"]}
        data={pieChartLegend(datum.get('data'))}
      />
    </svg>
  </div>

  CustomPie.propTypes = {
    datum: PropTypes.object.isRequired,
  }

const CustomOverlay = ({
  datum,
}) =>
  <div className="chart-container quarter">
    <ChartTitle title={datum.get('title')} />
    <OverlayChart className="chart">
      <p>
        <span className="stat">{ overlayNumber(datum.get('data')) }</span>
      </p>
    </OverlayChart>
  </div>

  CustomOverlay.propTypes = {
    datum: PropTypes.object.isRequired,
  }

export default class CustomCharts extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  static defaultTypes = {
    data: null,
  }

  render() {
    const { data } = this.props
    return (
      <ChartsHolder>
        { data && data.map((datum, index) =>
          datum.get('type') === 'pie' ?
          <CustomPie key={`CustomChart_${index + 1}`} datum={datum} />
          : <CustomOverlay key={`CustomChart_${index + 1}`} datum={datum} />
        )}
      </ChartsHolder>
    )
  }
}
