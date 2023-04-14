const Time = (date: Date) => {
  const dateTime = new Date(date);
  let day;
  let period;
  const month: number = dateTime.getMonth() + 1;
  const now = new Date(Date.now());
  const diffTime = Math.abs(now.getTime() - dateTime.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 2 && now.getDate() === dateTime.getDate()) {
    period =
      "Aujourd'hui," +
      ' ' +
      dateTime.getHours() +
      ':' +
      (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes());
  } else if (
    (diffDays < 3 && now.getDay() - dateTime.getDay() === 1) ||
    now.getDay() - dateTime.getDay() === -6
  ) {
    period = 'hier';
  } else if (diffDays < 4) {
    day = dateTime.toLocaleString('default', { weekday: 'long' });
    period = day;
  } else {
    period =
      (dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()) +
      '/' +
      (month < 10 ? '0' + month : month) +
      '/' +
      dateTime.getFullYear().toString().substring(2);
  }
  return period;
};

export default Time;
