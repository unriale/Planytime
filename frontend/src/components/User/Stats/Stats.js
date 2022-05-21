import Sidebar from "../Sidebar/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

const Stats = () => {
  let [gotData, setGotData] = useState(false);
  let [data, setData] = useState([]);

  let { authTokens } = useContext(AuthContext);

  const loadMonthEvents = async () => {
    let response = await fetch("http://localhost:8000/api/getmonthevents/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
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
      <Sidebar />
      {gotData && (
        <BarChart
          width={730}
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
    </>
  );
};

export default Stats;
