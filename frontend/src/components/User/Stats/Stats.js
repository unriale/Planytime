import Sidebar from "../Sidebar/Sidebar";
import PieChartStat from "./PieChart";
import MonthEvents from "./MonthEvents";
import RestStats from "./RestStats";
import styled from "styled-components";

const Title = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
  font-size: 24px;
`;

const Stats = () => {
  return (
    <>
      <Sidebar />
      <Title>Statistics</Title>
      <RestStats />
      <PieChartStat />
      <MonthEvents />
    </>
  );
};

export default Stats;
