const mainData = require("./src/helper/getMainSKU");
const calculatePriceDifference = require("./src/helper/findByName");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const convertToCSV = require("./src/helper/convertToCsv");
const csvFolderPath = "./src/scrapping";
var count = 0;

mainData((err, products) => {
  if (err) {
    console.error("Error reading the CSV file:", err);
  } else {
    const pro2 = [];
    fs.readdir(csvFolderPath, (err, files) => {
      if (err) {
        console.error("Error reading folder:", err);
        return;
      }
      files.forEach((file) => {
        const filePath = path.join(csvFolderPath, file);
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (row) => {
            pro2.push(row);
          })
          .on("end", (row) => {
            if (!count) {
              count++;
              const res = calculatePriceDifference(pro2, products, file);
              fs.writeFile("output.csv", convertToCSV(res), (err) => {
                if (err) {
                  console.error("Error writing to the CSV file:", err);
                } else {
                  console.log("CSV file created successfully.");
                }
              });
            }
          });
      });
    });
  }
});
