import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const data = [
  { name: "Group A", value: 2 },
  { name: "Group B", value: 1 },
  { name: "Group C", value: 3 },
  { name: "Group D", value: 4 },
  { name: "Group E", value: 1 },
  { name: "Group F", value: 10 },
  { name: "Group G", value: 21 },
  { name: "Group r", value: 11 },
  { name: "Group q", value: 9 },
  { name: "Group qs", value: 4 },
  { name: "Group ps", value: 2 },
];

const COLORS = [
  "#5484ed",
  "#a4bdfc",
  "#7ae7bf",
  "#dbadff",
  "#ff887c",
  "#fbd75b",
  "#ffb878",
  "#46d6db",
  "#e1e1e1",
  "#51b749",
  "#dc2127",
];

const WrapContainer = styled.div`
    width: 50%;
    height: 650px;
    display: inline-block;

    @media screen and (max-width: 820px){
        display: block;
        width: 100%;
        height: 350px;
        padding: 1.75rem;
    } 
`;

export default class PieChartStat extends PureComponent {
  render() {
    return (
      <>
        <WrapContainer>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} fill="#8884d8" dataKey="value" label>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </WrapContainer>
      </>
    );
  }
}
