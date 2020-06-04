import moment from "moment";

// -date- is represents the day that will pass on some calculations.
// -text- is represents calculated dates text value like days to d or weeks to w etc.
// text arguement comes from constants/text.js
export const timeDifference = (date) => {
  const initialDate = moment.unix(date);
  const now = moment();

  // get the difference between the moments
  const diff = now.diff(initialDate);

  //express as a duration
  const diffDuration = moment.duration(diff);

  if (diffDuration.years() !== 0 || diffDuration.months() !== 0) {
    return moment(initialDate).format("DD-MM-YYYY");
  } else if (diffDuration.weeks() !== 0) {
    return diffDuration.weeks() + "w";
  } else if (diffDuration.days() !== 0) {
    return diffDuration.days() + "d";
  } else if (diffDuration.hours() !== 0) {
    return diffDuration.hours() + "h";
  } else if (diffDuration.minutes() !== 0) {
    return diffDuration.minutes() + "min";
  } else {
    return diffDuration.seconds() + "sec";
  }
};

export const getDate = (date) => {
  const formattedDate = moment(date).local().format("hh:mm - DD/MM/YYYY");

  return formattedDate;
}