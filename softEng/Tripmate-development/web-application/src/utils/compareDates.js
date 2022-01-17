const compareDates = (date1, date2) => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  if (firstDate.getTime() < secondDate.getTime()) return -1;
  if (firstDate.getTime() > secondDate.getTime()) return 1;

  return 0;
};

export default compareDates;
