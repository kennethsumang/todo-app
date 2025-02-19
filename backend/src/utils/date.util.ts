import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const getUtcDate = (): Date => {
  return dayjs.utc().toDate();
}

export {
  getUtcDate
};