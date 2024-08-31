export function formatDate(dateString) {
  const date = new Date(dateString);
  
  const year = date.getUTCFullYear();
  const monthNames = [
    "januari", "februari", "maret", "april", "mei", "juni",
    "juli", "agustus", "september", "oktober", "november", "desember"
  ];
  const month = monthNames[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${year} ${month} ${day} ${hours}:${minutes}`;
}
