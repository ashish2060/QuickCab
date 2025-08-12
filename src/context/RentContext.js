"use client";

import { differenceInHours, parseISO } from "date-fns";
import { createContext } from "react";

export const RentContext = createContext();

const RentContextProvider = ({ children }) => {
  function calculateDateInHours(startDate, endDate, startTime, endTime) {
    if (!startDate || !startTime || !endDate || !endTime) {
      alert("Please select both dates and times.");
      return;
    }

    // Combine date and time into an ISO format
    const startDateTime = parseISO(`${startDate}T${startTime}`);
    const endDateTime = parseISO(`${endDate}T${endTime}`);

    if (endDateTime < startDateTime) {
      alert("End time must be after start time.");
      return;
    }

    // Calculate the difference in hours
    const hours = differenceInHours(endDateTime, startDateTime);
    console.log("hours", hours);
    return hours;
  }

  return (
    <RentContext.Provider value={{ calculateDateInHours }}>
      {children}
    </RentContext.Provider>
  );
};

export default RentContextProvider;
