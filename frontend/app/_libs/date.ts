import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function convertUtcToUserTimezone(
  date: Date | string,
  format: string = "MM/DD/YYYY"
): string {
  const userTz = dayjs.tz.guess();
  const utcDate = dayjs.utc(date).tz(userTz);
  return utcDate.format(format);
}

export function getUtcDate(): Date {
  return dayjs.utc().toDate();
}

export function toDayjs(date: Date | string): Dayjs {
  return dayjs(date);
}
