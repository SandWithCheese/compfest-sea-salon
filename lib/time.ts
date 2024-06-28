/**
 * Converts a 24-hour time string to a 12-hour time string with AM/PM notation.
 *
 * @param {string} time - A time string in 24-hour format (e.g., "13:45:30").
 * @returns {string} The time string in 12-hour format with AM/PM notation (e.g., "01:45 PM").
 */
export function convertTo12HourFormat(time: string): string {
  const [hours, minutes, seconds] = time.split(":");
  let hoursInt = parseInt(hours);
  const period = hoursInt >= 12 ? "PM" : "AM";
  hoursInt = hoursInt % 12 || 12; // Convert to 12-hour format
  return `${hoursInt.toString().padStart(2, "0")}:${minutes} ${period}`;
}

/**
 * Formats a number of minutes into a human-readable string.
 *
 * @param {number} minutes - The number of minutes to format.
 * @returns {string} A string representing the time in hours and minutes (e.g., "2 hours 30 minutes").
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} minutes`;
  }
}
