import {Environment} from '../../src/utils/environment';

export const url = Environment.BASE_URL;

export function handleParseDate(date, delimiter) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join(delimiter);
}
