// ------------------------------------------------------------------
// Interface for the UseDateProps that defines optional date components.
// Parameters:
// - month: Optional number of months to add to the current date (default: 0).
// - hour: Optional number of hours to set (default: 0).
// - min: Optional number of minutes to set (default: 0).
// - sec: Optional number of seconds to set (default: 0).
// - ms: Optional number of milliseconds to set (default: 0).

import { ConvertToUTCTime } from "../../common/common";

// ------------------------------------------------------------------
interface UseDateProps {
  month?: number;
  hour?: number;
  min?: number;
  sec?: number;
  ms?: number;
}

// ------------------------------------------------------------------
// useDate custom hook for handling and manipulating date and time.
// Parameters:
// - month: Optional number of months to add to the current date (default: 0).
// - hour: Optional number of hours to set (default: 0).
// - min: Optional number of minutes to set (default: 0).
// - sec: Optional number of seconds to set (default: 0).
// - ms: Optional number of milliseconds to set (default: 0).
// ------------------------------------------------------------------
const useDate = ({ month = 0, hour, min, sec, ms }: UseDateProps) => {
  // Get the current local and UTC timestamps.
  const local_now = new Date().getTime();
  const utc_now = ConvertToUTCTime(local_now);

  // Create a Date object for the current date and time.
  const now = new Date();

  // Adjust the date based on the provided options.
  now.setMonth(now.getMonth() + month);

  now.setHours(8);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  const local_start = now.getTime();
  const utc_start = ConvertToUTCTime(local_start);

  if (hour || min || sec || ms) {
    now.setHours(hour || 0);
    now.setMinutes(min || 0);
    now.setSeconds(sec || 0);
    now.setMilliseconds(ms || 0);
  }

  // Get the modified local and UTC timestamps.
  const local_end = now.getTime();
  const utc_end = ConvertToUTCTime(local_end);

  // Return the local and UTC timestamps of the original and modified dates.
  return { local_now, utc_now, local_end, utc_end, local_start, utc_start };
};

// Export the useDate custom hook for use in other parts of your application.
export default useDate;
