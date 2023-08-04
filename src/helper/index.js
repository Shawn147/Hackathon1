const fs = require("fs");
const csv = require("csv-parser");

const getFormattedData = (fileName) => {
  const products = [];
  fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
    })
    .on("end", () => {
      console.log(products);
    });
  return products;
};
module.exports = getFormattedData;
