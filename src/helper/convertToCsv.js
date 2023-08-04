function convertToCSV(data) {
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((obj) => Object.values(obj).join(",") + "\n");
  return header + rows.join("");
}

module.exports = convertToCSV;
