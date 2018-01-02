  // Helpers (START) ////////////////////////////////////////

    // Valiadation helpers
    export const isString = arg => (typeof arg === 'string');
    export const isLengthOfSixChar = arg => isString(arg) && arg.length === 6;
    export const hexColorsAreString = hexColors => hexColors.reduce((acc, hexColor ) => acc && isString(hexColor), true);
    export const hexColorsAreStringOfSixChar = hexColors => hexColors.reduce((acc, hexColor) => acc && isLengthOfSixChar(hexColor), true);

    // Given an array whose elements are vector, the next validation helper
    // returns true if they are no NaN in vector's component, other wise return false.
    // For example given [ [NaN,187,204], [204,238,221], ... ],
    // the helper returns false because one of the vector has its first component being NaN.
    export const partsInAllVectorsAreValidNum = vectors => vectors.reduce((acc, vector)=>{
      return acc && vector.reduce((_acc, part) =>  _acc && !isNaN(part), true);
    }, true);

    // Helper to split a hex color into a color vector (RGB components): 'AABBCC' ---> ['AA', 'BB', 'CC']
    export const hexColorToVectorHexColor = colorHex => [0,2,4].map(index => colorHex.substr(index, 2));

    // Helper to group components of a color vector into a hex color string: ['AA', 'BB', 'CC'] ---> 'AABBCC'
    export const vectorHexColorToHexColor = partsHex => partsHex.join('');

    // Given a color vector, the following helper converts its base16 components to base10.
    export const convertParts_hexToDec = partsHex => partsHex.map(partHex => parseInt(partHex, 16));

    // Given a color vector, the following helper converts its base10 components to base16.
    export const convertParts_decToHex = partsDec => partsDec.map(partDec => {
      const partHex = partDec.toString(16).toUpperCase();
      return (partHex.length === 1) ? `0${partHex}` : partHex; // Left pad a literal zero if parts is one char in length.
    });

    // Usage: flowRight(f1, f2, f3)(value) is equivalent to f3(f2(f1(value)))
    export const flowRight = (...fns) => initialValue => fns.reduce(
      (fnAcc, fnNxt) => fnNxt(fnAcc), initialValue
    );

    // The following helper calculates the mean of vector component
    // For eg: given 2 vectors:
    //   ( [r1,g1,b1], [r2,g2,b2] ) => [ (r1+r2)/2, (g1+g2)/2, (b1+b2)/2 ]
    //   • If more than two vectors is provided, their mean is calculated according.
    //   • The vector can be of nth dimension.
    export const calculateMeanOfVectorsPart = (vectors) => { // vectors = [ [r1,g1,b1], [r2,g2,b2], ... ]
      const vectorsLength = vectors.length;  // Count the number of vector provides.
      if (vectorsLength === 1) return vectors; // If there is only one vector, no need to proceeed

      // Initializing the reducer's accumulator to [0,0,0,..]
      const accVectorInit = [];
      let i = vectors[0].length;
      while(i--) accVectorInit.push(0);

      // vectorSum = [ r1+r1+..., g1+g2+..., b1+b2+... ]
      const vectorSum = vectors.reduce(
        (accVector, vector) => {
          // want [ accVectorPart1+vectorPart1, accVectorPart2+vectorPart2, ... ]
          // in otherwords:  [ (r1+r2) + r3, (g1+g2) + g3, ... ]
          return accVector.map( (accVectorPart, indexOfPart) => accVectorPart + vector[indexOfPart] );
        }, accVectorInit
      );

      // Finally we calculate the mean for each components (with rounding)
      return vectorSum.map( parts => Math.round(parts/vectorsLength));
    };

  // Helpers (END) //////////////////////////////////////////


export default function getMeanOfColors (...hexColors) {

  // Validate to make sure hex colors received are strings like: hexColors = [ 'String', 'String', 'String', ... ]
  if (!hexColorsAreString(hexColors)) { return console.error('[Error] at least one of the color is not string type'), 'ERR'; }
  // Validate to make sure all hex colors have 6 character like: hexColors = [ '123456', '123456', '123456', ... ]
  if (!hexColorsAreStringOfSixChar(hexColors)) { return console.error('[Error] one of the color is not of length of 6'), 'ERR'; }

  // Convert hex colors into RGB components (base 10)
  // ['AABBCC', 'CCEEDD', ... ]
  //   ---> [['AA','BB','CC'], ['CC','EE','DD'], ... ]
  //     ---> [[170,187,204], [204,238,221], ... ]
  const vectors_partsInDec = hexColors.map(
    hexColor => flowRight(
      hexColorToVectorHexColor,
      convertParts_hexToDec
    )(hexColor)
  );


  // Make sure non of the part is NaN, for eg: [[NaN,187,204], [204,238,221], ... ]
  //                                             ^^^
  if (!partsInAllVectorsAreValidNum(vectors_partsInDec)) {
    return console.error('[Error] at least one of the vector part is invalid'), 'ERR';
  }

  // Calculate mean and then convert into RGB hex components, then back to hexColor
  // [[170,187,204], [204,238,221], ... ]
  //   ---> [(170+204)/2, (187+238)/2, (204+221)/2, ... ] = [187,213,213, ...]
  //     ---> ['BB','D5','D5']
  //       ---> 'BBD5D5'
  return flowRight(
    calculateMeanOfVectorsPart,
    convertParts_decToHex,
    vectorHexColorToHexColor
  )(vectors_partsInDec);

};
