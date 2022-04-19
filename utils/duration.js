const getString = (num, string) =>
  num > 1 ? `${num}${string}s` : `${num}${string}`;

/**
 * @param {number} duration amount of time in seconds
 * @returns {string} formated duration
 */
export default function formatTimeDuration(duration) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration % 60;

  return `${!hours ? '' : getString(hours, 'hr')} ${
    !minutes ? '' : getString(minutes, 'min')
  } ${!seconds ? '' : getString(seconds, 'sec')}`;
}
