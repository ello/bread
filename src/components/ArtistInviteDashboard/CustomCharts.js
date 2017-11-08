import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import {
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory'
import { numberToHuman } from '../../lib/number_to_human'

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
  <div style={{width: "300px", height: "300px", margin: "100px 0px 0px 0px"}}>
    <svg viewBox="0 0 400 400">
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
  <div style={{width: "100px", height: "100px", margin: "100px 0px 0px 0px"}}>
    <p>{datum.get('title')}</p>
    <div style={{backgroundColor: "grey", textAlign: "center", padding: "70px"}}>
      { overlayNumber(datum.get('data')) }
    </div>
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
    console.log(data.toJS())
    return (
      <div>
        { data && data.map((datum, index) =>
          datum.get('type') === 'pie' ?
          <CustomPie key={`CustomChart_${index + 1}`} datum={datum} />
          : <CustomOverlay key={`CustomChart_${index + 1}`} datum={datum} />
        )}
      </div>
    )
  }
}
