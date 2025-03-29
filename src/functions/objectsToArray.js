const objectToArray = (arrayOfObjects) => {
  return arrayOfObjects.map(object => {
    const data = {};
    const values = Object.values(object)
    data.name = values[0];
    if (values.length === 2) { 
      data.code = values[1];
      return data;
    }
    data.code = values[0];
    return data;
  });
  }

  export default objectToArray;