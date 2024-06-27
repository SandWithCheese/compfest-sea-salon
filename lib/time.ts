export function convertTo12HourFormat(time: string) {
  const [hours, minutes, seconds] = time.split(":");
  let hoursInt = parseInt(hours);
  const period = hoursInt >= 12 ? "PM" : "AM";
  hoursInt = hoursInt % 12 || 12; // Convert to 12-hour format
  return `${hoursInt.toString().padStart(2, "0")}:${minutes} ${period}`;
}
