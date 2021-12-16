export const KelvinToCelcius = ({ k }) => (k - 273.15).toFixed(0);
export const UnixHours = ({ time }) =>
  new Date(time * 1000).getHours() < 18
    ? `${new Date(time * 1000).getHours()}pm`
    : `${new Date(time * 1000).getHours()}am`;
export const UnixDays = ({ time }) =>
  [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ][new Date(time * 1000).getDay()];
export const UnixDate = ({ time }) =>
  new Date(time * 1000).getHours() + ':' + new Date(time * 1000).getMinutes();
