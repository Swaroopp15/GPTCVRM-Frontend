const objectToArray = (arrayOfObjects) => {
  return arrayOfObjects.map(object => Object.values(object));
  }

  export default objectToArray;