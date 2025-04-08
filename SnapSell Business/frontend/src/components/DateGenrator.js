function DateGenrator() {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are 0-based
  const year = currentDate.getFullYear().toString().slice(-4); // Get last 2 digits of the year

  let tempDate = day + 5;
  let tempMonth;
  let tempYear = year;

  if (tempDate > 29 && month == 2) {
    tempMonth += 1;
    let datediff = tempDate - 28;
    tempDate = datediff;
    tempMonth = month + 1;
  }
  else if (tempDate > 28 && month == 2) {
    tempMonth += 1;
    let datediff = tempDate - day;
    tempDate = datediff;
    tempMonth = month + 1;
  } else if (tempDate > 31 && month == 12) {
    tempMonth += 1;
    let datediff = tempDate - day;
    tempDate = datediff;
    tempYear = year + 1;
    tempMonth = 1;
  }
  else if (tempDate > 31 && month != 2) {
    tempMonth += 1;
    let datediff = tempDate - day;
    tempDate = datediff;
    tempMonth = month + 1;
  } else if (tempDate > 30 && month != 2) {
    tempMonth += 1;
    let datediff = tempDate - day;
    tempDate = datediff;
    tempMonth = month + 1;
  }

  else {
    tempMonth = month;
    tempYear = year;
  }


  const formattedDate = `${tempDate}/${tempMonth}/${tempYear}`;
  // console.log(formattedDate);

  return formattedDate;
}
export default DateGenrator;