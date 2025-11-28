import React from "react";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";
import { Holiday, LeaveRequest } from "../model/types";

interface LeaveCalendarProps {
  holidays: Holiday[];
  leaves: LeaveRequest[];
}

export const LeaveCalendar: React.FC<LeaveCalendarProps> = ({
  holidays,
  leaves,
}) => {
  const getListData = (value: Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");
    const listData: {
      type: "success" | "processing" | "warning";
      content: string;
    }[] = [];

    const holiday = holidays.find((h) => h.date === dateStr);
    if (holiday) {
      listData.push({ type: "success", content: holiday.title });
    }

    const leave = leaves.find((l) => {
      return dateStr >= l.startDate && dateStr <= l.endDate;
    });

    if (leave) {
      listData.push({
        type: leave.status === "approved" ? "processing" : "warning",
        content: `${leave.type} (${
          leave.status === "pending" ? "Bekliyor" : "Onaylandı"
        })`,
      });
    }

    return listData;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};
