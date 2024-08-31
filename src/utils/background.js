export function getRandomColor() {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-pink-500",
    "bg-brown-500",
    "bg-yellow-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
