import Mori from 'mori';

let {count} = Mori;

export const nextIndex = (list, index) => {
  const newIndex = index + 1;
  if (newIndex < count(list)) {
    return newIndex;
  } else {
    return 0;
  }
};

export const previousIndex = (list, index) => {
  const newIndex = index - 1;
  if (newIndex >= 0) {
    return newIndex;
  } else {
    return count(list) - 1;
  }
};