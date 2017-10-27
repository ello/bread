import React, { Component } from 'react'
import { VictoryLabel, VictoryLegend, VictoryPie } from 'victory'


export default class SubmissionCount extends Component {
  render() {
    return (
      <div style={{width: "300px", height: "300px"}}>
        <svg viewBox="0 0 400 400">
          <VictoryPie
            innerRadius={105}
            standalone={false}
            padding={60}
            data={[
              {submissions: 100, type: "Submitted"},
              {submissions: 3, type: "Declined"},
              {submissions: 2, type: "Approved"},
              {submissions: 1, type: "Selected"},
            ]}
            x="submissions"
            y="type"
            labels={(data) => ""}
            colorScale={["lightgray", "red", "green", "orange"]}
          />
          <VictoryLabel
            textAnchor="middle"
            standalone={false}
            style={{ fontSize: 48, fontWeight: 600 }}
            x={200}
            y={200}
            text={165}
          />
          <VictoryLegend
            x={25}
            y={350}
            style={{ labels: { fontSize: 18 }}}
            orientation="horizontal"
            gutter={25}
            standalone={false}
            colorScale={["red", "green", "orange"]}
            data={[
              {name: "Selected"},//, symbol: {type: "circle", fill: "orange"}},
              {name: "Approved"},//, symbol: {type: "circle", fill: "green"}},
              {name: "Declined"},//, symbol: {type: "circle", fill: "red"}},
            ]}
          />
        </svg>
      </div>
    )
  }
}
