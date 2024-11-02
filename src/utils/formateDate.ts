import moment from "moment";

function formateDate(date: string) {
  const dateMoment = moment(date);
  const formattedDate = dateMoment.format("MMMM DD, YYYY");
  return formattedDate;
}

export default formateDate;
