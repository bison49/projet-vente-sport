export default function GetDate(date: Date) {
  const dateTime = new Date(date);
  const month: number = dateTime.getMonth() + 1;
  const shortDate =
    (dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()) +
    '/' +
    (month < 10 ? '0' + month : month) +
    '/' +
    dateTime.getFullYear().toString().substring(2);

  return shortDate;
}

export function GetLongDate(date: Date) {
  const dateTime = new Date(date);
  const month: number = dateTime.getMonth() + 1;
  const longDate =
    (dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()) +
    '/' +
    (month < 10 ? '0' + month : month) +
    '/' +
    dateTime.getFullYear().toString();

  return longDate;
}

export function substractYears(date: Date, years: number) {
  date.setFullYear(date.getFullYear() - years);
  return date;
}

export function subtractMonths(date: Date, months: number) {
  date.setMonth(date.getMonth() - months);
  return date;
}
