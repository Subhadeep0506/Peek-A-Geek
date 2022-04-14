function formatDate(date) {
  console.log(date);
  return new Intl.DateTimeFormat().format(new Date(date));
}

export default formatDate;
