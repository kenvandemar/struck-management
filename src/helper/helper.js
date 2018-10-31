class Helper {
  formatMoney(n, c, d, t) {
    var c = isNaN((c = Math.abs(c))) ? 2 : c,
      d = d === undefined ? '.' : d,
      t = t === undefined ? ',' : t,
      s = n < 0 ? '-' : '',
      i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t)
    );
  }

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
