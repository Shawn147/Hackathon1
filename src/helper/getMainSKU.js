const fs = require("fs");
const csvParser = require("csv-parser");

const getMainSKU = (callback) => {
  const products = [];
  fs.createReadStream("./src/helper/167_SKUs.csv")
    .pipe(csvParser())
    .on("data", (row) => {
      const product = {
        S: parseInt(row["S#"]),
        SKU: parseInt(row["SKU"]),
        fullName: row["Full Name"],
        requestedQuantityNew: parseFloat(row["Requested Quantity New"]),
        totalRevenueNet: parseFloat(
          row["Total Revenue Net "].replace(/,/g, "")
        ),
        totalRevenueGrossSAR: row["Total Revenue Gross SAR"].replace(/,/g, ""),
        jda122Price: parseFloat(row["JDA 122 Price 13/07/2023"] || 0),
      };
      products.push(product);
    })
    .on("end", () => {
      callback(null, products);
    })
    .on("error", (error) => {
      callback(error);
    });
  return products;
};
module.exports = getMainSKU;
