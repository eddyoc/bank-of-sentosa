import format from "date-fns/format";

export const formatDate = (date, dateFormat= 'dd/MM/yyyy HH:mm') => {
  return format(new Date(date), dateFormat);
};

// Insert something after every n characters in the string
export const chunker = (el, step, string) => {
  const regExp = new RegExp(`.{${step}}`, 'g');
  return el
    .toString()
    .match(regExp)
    .join(string);
};

export const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

export const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);
