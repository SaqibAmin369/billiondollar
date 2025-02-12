export const calculateFontSize = (width, height) => {
  const text = `${width} X ${height}<br>Your Logo Here`;

  // Create a temporary div for measurement
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  tempDiv.style.width = `${width}px`;
  tempDiv.style.height = `${height}px`;
  tempDiv.style.fontSize = "1px"; // Start with the smallest font size
  tempDiv.style.lineHeight = "1";
  tempDiv.style.whiteSpace = "nowrap"; // Prevent wrapping
  tempDiv.innerHTML = text;

  document.body.appendChild(tempDiv);

  let fontSize = 1;
  while (
    tempDiv.scrollWidth <= width &&
    tempDiv.scrollHeight <= height &&
    fontSize <= 100
  ) {
    fontSize++;
    tempDiv.style.fontSize = `${fontSize}px`;
  }

  document.body.removeChild(tempDiv);

  // Subtract 1 to ensure the text fits perfectly
  return fontSize - 1;
};
