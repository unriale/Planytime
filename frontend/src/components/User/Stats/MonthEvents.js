import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import styled from "styled-components";

const WrapContainer = styled.div`
  width: 45%;
  height: 500px;
  display: inline-block;

  @media screen and (max-width: 820px) {
    display: block;
    width: 100%;
    height: 300px;
  }
`;

const MonthEvents = () => {
  let [gotData, setGotData] = useState(false);
  let [data, setData] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let { authTokens } = useContext(AuthContext);

  const loadMonthEvents = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/getmonthevents/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let responseData = await response.json();
    let result = [];
    console.log(responseData);
    if (responseData) {
      responseData.map((arr) => {
        result.push({ month: convertNumToMonth(arr[0]), events: arr[1] });
      });
      setData(result);
      setGotData(true);
    }
  };

  const convertNumToMonth = (number) => {
    return Intl.DateTimeFormat("en", { month: "long" }).format(
      new Date(number.toString())
    );
  };

  useEffect(() => {
    loadMonthEvents();
  }, []);

  return (
    <>
      <WrapContainer>
        <p style={{ textAlign: "center" }}>
          Number of events per each month, {new Date().getFullYear()}
        </p>
        {gotData && (
          <BarChart
            width={
              windowSize.width > 820 ? windowSize.width / 2.1 : windowSize.width
            }
            height={250}
            data={data}
            style={{ margin: "3rem auto" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="events" fill="#64dadf" />
          </BarChart>
        )}
      </WrapContainer>
    </>
  );
};

export default MonthEvents;
