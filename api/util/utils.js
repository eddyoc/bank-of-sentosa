// Insert something after every n characters in the string
const chunker = (el, step, string) => {
  const regExp = new RegExp(`.{${step}}`, 'g');
  return el
    .toString()
    .match(regExp)
    .join(string);
};

const getShortAccount = ({ sortcode, number }) => `${ chunker(sortcode, 2, '-') } / ${ number }`;

const flatten = arr => arr.reduce((a, b) => a.concat(b), []);

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

module.exports = {
  getShortAccount,
  flatten,
  waitFor,
};