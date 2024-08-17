import moment from 'moment';
require('moment/locale/id'); // Import the Indonesian locale
moment.locale('id'); // Set locale to Indonesian
const timeAgo = (date: Date) => {
  const now = moment();
  const diffDays = now.diff(date, 'days');

  if (diffDays === 0) {
    return moment(date).fromNow(true); // true flag to omit the "ago" part
  }

  return moment(date).fromNow();
};

export default timeAgo;
