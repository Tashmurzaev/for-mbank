import React from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";
import CalendarDay from "./CalendarDay";
import { DAYS_OF_WEEK } from "../../utils/date";

const Calendar = ({ monthData }) => {
  // this code generates calendar-format array with days in month
  const generateCalendar = () => {
    const calendar = [];

    for (let i = 0; i < Math.ceil(monthData.days.length / 7); i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        const dayIndex = i * 7 + j;
        const dayValue = monthData.days[dayIndex]?.value || 0;
        const dayOfMonth = monthData.days[dayIndex]?.name || "";

        if (+dayIndex < +monthData.days.length) {
          week.push({ value: dayValue, dayOfMonth, dayIndex });
        }
      }

      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <DaysContainer className="days-container">
      <MonthName>{monthData.name}</MonthName>
      {DAYS_OF_WEEK.map((_, index) => (
        <Row key={index}>
          {calendar.map((week, weekIndex) => {
            // Example: without statement on top it will display 7 * n days in month
            // instead of actual amount of days in month
            if (!week[index]) return null;
            const dayOfWeek = week[index];
            return (
              <CalendarDay
                key={weekIndex}
                dataTooltipId="my-tooltip"
                dataTooltipContent={`${dayOfWeek?.value} contributions at ${
                  dayOfWeek?.dayIndex + 1
                } ${dayOfWeek?.dayOfMonth}, ${monthData?.name}`}
                value={dayOfWeek.value}
              />
            );
          })}
        </Row>
      ))}
      <ReactTooltip id="my-tooltip" place="bottom" />
    </DaysContainer>
  );
};

export default Calendar;

const DaysContainer = styled.div`
  display: grid;
  align-items: center;

  position: relative;
`;

const Row = styled.div`
  display: flex;
  column-gap: 5px;
`;

const MonthName = styled.div`
  position: absolute;
  top: -20px;
  text-align: center;
  width: 100%;
`;
