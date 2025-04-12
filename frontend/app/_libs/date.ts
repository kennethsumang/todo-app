import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

export type ValidDateType = Dayjs | Date | string;

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);

export function convertUtcToUserTimezone(
  date: Date | string,
  format: string = "MM/DD/YYYY"
): string {
  const userTz = dayjs.tz.guess();
  const utcDate = dayjs.utc(date).tz(userTz);
  return utcDate.format(format);
}

export function convertUserTimezoneToUtc(date: ValidDateType): Dayjs {
  const userTz = dayjs.tz.guess();
  const dateObj = dayjs(date).tz(userTz, true);
  return dateObj.utc();
}

export function getUtcDate(): Date {
  return dayjs.utc().toDate();
}

export function toDayjs(date: Date | string): Dayjs {
  return dayjs(date);
}

export function isValidDate(date: ValidDateType): boolean {
  return dayjs(date).isValid();
}

export function isBefore(date: ValidDateType, refDate: ValidDateType): boolean {
  return dayjs(date).isBefore(dayjs(refDate), "day");
}

export function diffFromNowInHours(date: ValidDateType): number {
  const userTz = dayjs.tz.guess();
  const now = dayjs().tz(userTz);
  const referenceDate = dayjs(date).tz(userTz);
  console.log(`Now: ${now.format("YYYY-MM-DD HH:mm:ss Z")}`);
  console.log(`Reference: ${referenceDate.format("YYYY-MM-DD HH:mm:ss Z")}`);
  return Math.abs(referenceDate.diff(now, "hour"));
}

export function isAfterNow(date: ValidDateType): boolean {
  const now = dayjs.utc().tz(dayjs.tz.guess());
  return dayjs(now).isAfter(date, "day");
}
