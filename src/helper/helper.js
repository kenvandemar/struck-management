class Helper {
  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }

    return obj;
  };

  checkEmpty = obj => {
    return Object.getOwnPropertyNames(obj).length === 0;
  };

  isCorrectObject = obj => {
    return obj !== null && obj !== undefined && typeof obj === 'object';
  };

  isCorrectString = string => {
    return (
      string !== null &&
      string !== undefined &&
      typeof string === 'string' &&
      string !== ''
    );
  };
}

export default new Helper();
