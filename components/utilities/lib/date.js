import moment from 'moment';
import 'moment/locale/id';

const FormatDate = (mydate, format = 'date') => {
  let myformat;
  if (format == 'date') {
    myformat = 'Do MMM YYYY';
  } else if (format == 'time') {
    myformat = 'a - HH:mm';
  } else if (format == 'datetime') {
    myformat = 'Do MMM YYYY - HH:mm:ss';
  }
  return moment(mydate).format(myformat);
};
export {FormatDate};
