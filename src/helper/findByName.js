function findProductByName(name, arr) {
  return arr.find((item) => removeSpacesFromKeys(item)["ProductName"] === name);
}

function removeSARAndSpaces(str) {
  // Remove "SAR" from the string using regular expression
  const cleanedStr = str.replace(/SAR/g, "");

  const trimmedStr = cleanedStr.replace(/\s+/g, " ").trim();

  return trimmedStr;
}
function removeSpacesFromKeys(obj) {
  const modifiedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/\s+/g, "");
      modifiedObj[newKey] = obj[key];
    }
  }
  return modifiedObj;
}

function calculatePriceDifference(arr1, arr2, file) {
  return arr2.map((item) => {
    const correspondingProduct = findProductByName(item.fullName, arr1);
    if (correspondingProduct) {
      const price1 = parseFloat(removeSARAndSpaces(correspondingProduct.Price));
      const price2 = parseFloat(item.jda122Price);
      item.priceDifference = price1 - price2;
      item.source = file;
    } else {
      item.priceDifference = "Not found in the first array";
      item.source = file;
    }
    return item;
  });
}

module.exports = calculatePriceDifference;
