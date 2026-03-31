import oldEmoji from '../assets/oldEmoji.svg';
import hotEmoji from '../assets/hotEmoji.svg';
import newEmoji from '../assets/newEmoji.svg';

const getGameEmoji = (year: number) => {
  const currentYear = new Date().getFullYear();

  if (year >= currentYear - 1) return newEmoji;
  if (year >= currentYear - 6) return hotEmoji;

  return oldEmoji;
};

export default getGameEmoji;
