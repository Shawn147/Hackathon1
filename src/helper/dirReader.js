const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const csvFolderPath = "./scrapping";
const getFolderFilesData = (callBack) => {
  const all = [];
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
          all.push(row);
        })
        .on("end", (row) => {
          console.log("Finished reading", file);
          callBack(all);
        });
    });
  });
};
module.exports = getFolderFilesData;
