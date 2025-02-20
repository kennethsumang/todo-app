import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const getUtcDate = (): Date => {
  return dayjs.utc().toDate();
}

const addToCurrentDate = (add: number): Date => {
  return dayjs.utc().add(add, 'days').toDate();
}

export {
  getUtcDate,
  addToCurrentDate
};