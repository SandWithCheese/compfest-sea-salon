export function convertTo12HourFormat(time: string) {
  const [hours, minutes, seconds] = time.split(":");
  let hoursInt = parseInt(hours);
  const period = hoursInt >= 12 ? "PM" : "AM";
  hoursInt = hoursInt % 12 || 12; // Convert to 12-hour format
  return `${hoursInt.toString().padStart(2, "0")}:${minutes} ${period}`;
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hours ${remainingMinutes} minutes`;
  }
}
