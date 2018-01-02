import getMeanOfColors from './get-mean-of-colors.js';

describe('getMeanOfColors(color1, color2)', () => {
  it('Should return "ERR" because colors provided are not string type', () => {
    chai.expect(getMeanOfColors(1,2)).to.equal('ERR');
  });
  it('Should return "ERR" because colors provided are not 6 charecters', () => {
    chai.expect(getMeanOfColors('12345678', '123')).to.equal('ERR');
  });
  it('Should return "ERR" because one of the color cannot be converted to base 10', () => {
    chai.expect(getMeanOfColors('AABBCC', '00EEzz')).to.equal('ERR');
  });
  it('Should return "000000" when colors provided are "000000" and "000000"', () => {
    chai.expect(getMeanOfColors('000000', '000000')).to.equal('000000');
  });
  it('Should return "000000" when colors provided are "000000" and "000000"', () => {
    chai.expect(getMeanOfColors('000000', '000000')).to.equal('000000');
  });
  it('Should return "FFFFFF" when colors provided are "FFFFFF" and "ffffff"', () => {
    chai.expect(getMeanOfColors('FFFFFF', 'ffffff')).to.equal('FFFFFF');
  });
  it('Should return "0F0F0F" when colors provided are "0F0F0F" and "0F0F0F"', () => {
    chai.expect(getMeanOfColors('0F0F0F', '0F0F0F')).to.equal('0F0F0F');
  });
  it('Should return "BBD5D5" when colors provided are "AABBCC" and "CCEEDD"', () => {
    chai.expect(getMeanOfColors('AABBCC', 'CCEEDD')).to.equal('BBD5D5');
  });
});


import {
  isString,
  isLengthOfSixChar,
  hexColorsAreString,
  hexColorsAreStringOfSixChar,
  partsInAllVectorsAreValidNum,
  hexColorToVectorHexColor,
  vectorHexColorToHexColor,
  convertParts_hexToDec,
  convertParts_decToHex,
  flowRight,
  calculateMeanOfVectorsPart,
} from './get-mean-of-colors.js';

describe('helpers:', () => {
  describe('isString(arg)', () => {
    it('Should return false if arg provided is not type string', () => {
      chai.expect(isString(1)).to.equal(false);
    });
    it('Should return true if arg provided is type string', () => {
      chai.expect(isString('string')).to.equal(true);
    });
  });

  describe('isLengthOfSixChar(arg)', () => {
    it('Should return false if arg provided is not type string', () => {
      chai.expect(isLengthOfSixChar(1)).to.equal(false);
    });
    it('Should return false if arg provided is type string of not 6 charactors', () => {
      chai.expect(isLengthOfSixChar('abcdefgh')).to.equal(false);
    });
    it('Should return false if arg provided is type string of not 6 charactors', () => {
      chai.expect(isLengthOfSixChar('abc')).to.equal(false);
    });
    it('Should return true if arg provided is type string of 6 charactors', () => {
      chai.expect(isLengthOfSixChar('abcdef')).to.equal(true);
    });
  });

  describe('hexColorsAreString([hexColor1, hexColor2, .... ])', () => {
    it('Should return false if one of hexColors provided is not type string', () => {
      chai.expect(hexColorsAreString([123, 'FFFFFF', '1223AD'])).to.equal(false);
    });
    it('Should return true only if all hexColors provided are type string', () => {
      chai.expect(hexColorsAreString(['AABBCC', 'FFFFFF', '1223AD'])).to.equal(true);
    });
  });

  describe('hexColorsAreStringOfSixChar([hexColor1, hexColor2, ... ])', () => {
    it('Should return false if one of hexColors provided is not type string', () => {
      chai.expect(hexColorsAreStringOfSixChar([123, 'FFFFFF', '1223AD'])).to.equal(false);
    });
    it('Should return false if all hexColors provided are type string but not six charectors', () => {
      chai.expect(hexColorsAreStringOfSixChar(['AABBCC', 'FFF', '1223ADED'])).to.equal(false);
    });
    it('Should return true only if all hexColors provided are type string and are six charectors', () => {
      chai.expect(hexColorsAreStringOfSixChar(['AABBCC', 'FFFFFF', '1223AD'])).to.equal(true);
    });
  });

  describe('partsInAllVectorsAreValidNum([ [num1, num2, num3], [num4, num5, num6] ... ])', () => {
    it('Should return false if at lease one of vector\'s components is NaN', () => {
      chai.expect(partsInAllVectorsAreValidNum([ [NaN,187,204], [204,238,221]])).to.equal(false);
    });
    it('Should return false if at lease one of vector\'s components is NaN', () => {
      chai.expect(partsInAllVectorsAreValidNum([ [NaN,187,NaN], [NaN,238,221]])).to.equal(false);
    });
    it('Should return true if none of vector\'s components is NaN', () => {
      chai.expect(partsInAllVectorsAreValidNum([ [124,187,204], [204,238,221]])).to.equal(true);
    });
  });

  describe('hexColorToVectorHexColor(hexColor)', () => {
    it('Should break hexColor into its RGB vector parts', () => {
      chai.expect(hexColorToVectorHexColor('AABBCC')).to.deep.equal(['AA', 'BB', 'CC']);
    });
  });

  describe('vectorHexColorToHexColor([hexRed, hexGreen, hexBlue])', () => {
    it('Should group RGB vector hexColor parts into hexColor', () => {
      chai.expect(vectorHexColorToHexColor(['AA', 'BB', 'CC'])).to.equal('AABBCC');
    });
  });

  describe('convertParts_hexToDec([hexRed, hexGreen, hexBlue])', () => {
    it('Should convert RGB vector components from base16 into base10', () => {
      chai.expect(convertParts_hexToDec(['00', 'A0', 'FF'])).to.deep.equal([0, 160, 255]);
    });
  });

  describe('convertParts_decToHex([decRed, decGreen, decBlue])', () => {
    it('Should convert RGB vector components from base10 into base16', () => {
      chai.expect(convertParts_decToHex([0, 160, 255])).to.deep.equal(['00', 'A0', 'FF']);
    });
    it('Should left pad zero if base 16 only has one char', () => {
      chai.expect(convertParts_decToHex([0, 10, 9])).to.deep.equal(['00', '0A', '09']);
    });
  });

  describe('flowRight(fn1, fn2, fn3, ...)', () => {
    it('Should compose functions from left to right', () => {
      const f1 = (v) => `${v}1`;
      const f2 = (v) => `${v}2`;
      const f3 = (v) => `${v}3`;
      chai.expect(flowRight(f1, f2, f3)(0)).to.equal('0123');
    });
  });

  describe('calculateMeanOfVectorsPart([decR1, decG1, decB1], [decR1, decG1, decB1])', () => {
    const m = (a, b) => Math.round((a+b)/2);
    it('Should calculates the mean of vector components', () => {
      chai.expect(calculateMeanOfVectorsPart([[255, 255, 255], [255, 255, 255]])).to.deep.equal([255, 255, 255]);
    });
    it('Should calculates the mean of vector components', () => {
      chai.expect(calculateMeanOfVectorsPart([[255, 200, 100], [0, 55, 155]])).to.deep.equal([m(255,0), m(200,55), m(100, 155)]);
    });
    it('Should calculates the mean of vector components and do rounding internally', () => {
      chai.expect(calculateMeanOfVectorsPart([[255.0, 200.5, 100], [0, 55, 155.7]])).to.deep.equal([m(255,0), m(200,55), m(100, 155)]);
    });
    it('Should return the vector of same elements if only one vector provdeded', () => {
      chai.expect(calculateMeanOfVectorsPart([[255, 200, 100]])).to.deep.equal([[255, 200, 100]]);
    });
  });
});
