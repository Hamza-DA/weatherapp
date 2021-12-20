const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
// module.exports = {
//   reactStrictMode: true,
//   env: {
//     API_KEY: process.env.APP_WEATHER_API_KEY,
//   },
// };
