function convertArrayToObject(array) {
  return array.reduce((acc, item) => {
    acc[item.info_key] = item.info_value;
    return acc;
  }, {});
}

export default convertArrayToObject;