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

const data = [
  {
    name: "Sunday",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "Monday",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "Tuesday",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "Wednesday",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "Thursday",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "Friday",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: "Saturday",
    uv: 140,
    pv: 680,
    amt: 1700,
  },
];

export default class RestStats extends PureComponent {
  render() {
    return (
      <div style={{ width: "100%", height: 300 }}>
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
              dataKey="amt"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="pv" barSize={50} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
