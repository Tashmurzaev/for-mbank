import { useEffect, useState } from "react";
import styled from "styled-components";
import { getContributionsApi } from "../../api/contributions.api";
import { createYear } from "../../utils/date";
import Calendar from "../UI/Calendar";

import { Tooltip as ReactTooltip } from "react-tooltip";

export const SQUARE_SIZE = 20;
export const SQUARE_GAP = 5;

const Container = styled.main`
  padding: 20px;
  margin: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  font-size: 12px;
  color: #959494;

  gap: 10px;
`;

const Days = styled.div`
  display: grid;
  grid-template-rows: repeat(7, ${(_) => SQUARE_SIZE}px);
`;

const MonthList = styled.div`
  display: flex;
  grid-gap: ${(_) => SQUARE_GAP}px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 0 15px;
  gap: 5px;
`;

const Text = styled.p`
  font-size: 8px;
  margin-left: 10px;
  margin-right: 10px;
  color: #959494;
`;

const Color = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color};
`;

const COLORS = [
  { color: "#ededed", info: "No contributions" },
  { color: "#acd5f2", info: "1-9 contribution" },
  { color: "#7fa8c9", info: "10-19  contribution" },
  { color: "#527ba0", info: "20-29 contribution" },
  { color: "#254e77", info: "30+ contribution" },
];

const DAYS_OF_WEEK = ["Mon.", "", "Tue.", "", "Fri.", "", ""];

function DateHeatMap() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const getContributions = async () => {
      try {
        const { data } = await getContributionsApi();

        const currentYear = new Date().getFullYear();
        const yearData = createYear(currentYear, data);
        setContributions(yearData);
      } catch (e) {}
    };

    getContributions();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Days>
          {DAYS_OF_WEEK.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </Days>
        <MonthList>
          {contributions.map((item) => {
            return <Calendar key={item.name} monthData={item} />;
          })}
        </MonthList>
      </Wrapper>

      <Details>
        <Text>Less</Text>
        {COLORS.map((color) => {
          return (
            <Color
              key={color.color}
              color={color.color}
              data-tooltip-id="color-tooltip"
              data-tooltip-content={color.info}
            />
          );
        })}
        <Text>More</Text>
      </Details>

      <ReactTooltip id="color-tooltip" place="bottom" />
    </Container>
  );
}

export default DateHeatMap;
