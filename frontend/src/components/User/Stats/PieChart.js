import React, { useEffect, useContext, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import AuthContext from "../../../context/AuthContext";
import ColorIndex from "../Calendar/utils/colorIndex";
import googleColors from "../Calendar/data/googleColors";

const WrapContainer = styled.div`
  width: 50%;
  height: 650px;
  display: inline-block;

  @media screen and (max-width: 820px) {
    display: block;
    width: 100%;
    height: 350px;
    padding: 1.75rem;
  }
`;

const PieChartStat = () => {
  let colors;
  let { authTokens } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [eventsColors, setEventsColors] = useState([]);

  useEffect(() => {
    colors = ColorIndex(googleColors);
    loadColorEvents();
  }, []);

  const loadColorEvents = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/getcolorevents/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let responseData = await response.json();
    if (responseData) {
      setData(getDataArr(responseData));
    }
  };

  const getDataArr = (responseData) => {
    let data = [];
    let colors_arr = [];
    responseData.forEach((pair) => {
      data.push({ name: pair[0], value: pair[1] });
      colors_arr.push(colors[pair[0]].color);
    });
    setEventsColors(colors_arr);
    return data;
  };

  return (
    <>
      <WrapContainer>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} fill="#8884d8" dataKey="value" label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={eventsColors[index % eventsColors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </WrapContainer>
    </>
  );
};

export default PieChartStat;
