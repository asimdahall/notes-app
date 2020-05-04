import moment from "moment";

const dateObj = ["years", "months", "days", "hours", "minutes"];

export const getExactDifference = (then, now = Date.now()) => {
  const ms = moment(new Date(now), "DD/MM/YYYY HH:mm:ss").diff(
    moment(new Date(then), "DD/MM/YYYY HH:mm:ss")
  );
  const { _data } = moment.duration(ms);
  return dateObj.reduce(
    (acc, key) =>
      _data[key] ? acc + Math.abs(_data[key]) + key + " " : acc,
    ""
  );
};
