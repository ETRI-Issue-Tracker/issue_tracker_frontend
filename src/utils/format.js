export function formatDate(inputDateTime) {
  const inputDate = new Date(inputDateTime);

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const seconds = String(inputDate.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
