import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import styled from "styled-components";

const WrapContainer = styled.div`
  width: 100%;
  height: 300px;

  @media screen and (max-width: 820px) {
    padding-right: 1rem;
  }
`;

const data = [
  {
    name: "Sunday",
    diff: 4,
    res: 6,
    init: 10,
  },
  {
    name: "Monday",
    diff: 1,
    res: 6,
    init: 7,
  },
  {
    name: "Tuesday",
    diff: 4,
    res: 8,
    init: 12,
  },
  {
    name: "Wednesday",
    diff: -2,
    res: 6,
    init: 4,
  },
  {
    name: "Thursday",
    diff: 3,
    res: 8,
    init: 11,
  },
  {
    name: "Friday",
    diff: 0,
    res: 5,
    init: 5,
  },
  {
    name: "Saturday",
    diff: -3,
    res: 6,
    init: 3,
  },
];

export default class RestStats extends PureComponent {
  render() {
    return (
      <WrapContainer>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="init"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="res" barSize={50} fill="#413ea0" />
            <Line type="monotone" dataKey="diff" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </WrapContainer>
    );
  }
}
