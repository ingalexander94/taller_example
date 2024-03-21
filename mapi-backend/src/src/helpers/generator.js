function generateUniqueCode(word = "", codes = []) {
  word = word.replace(/\s/g, "").toUpperCase();
  let newCode = word.substring(0, 1);
  if (!codes.includes(newCode)) {
    return newCode;
  } else {
    let index = 1;
    while (codes.includes(newCode)) {
      let next = word.substring(0, index + 1);
      index++;
      if (index >= word.length) {
        let finalLetter = word.charAt(word.length - 1);
        newCode =
          finalLetter + String.fromCharCode(finalLetter.charCodeAt(0) + 1);
        break;
      } else {
        newCode = next;
      }
    }
    return newCode.toUpperCase();
  }
}

module.exports = generateUniqueCode;
