const withPWA = require('next-pwa');
const pwaParams = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
module.exports = { pwaParams, reactStrictMode: true };
// module.exports = {
//   reactStrictMode: true,
//   env: {
//     API_KEY: process.env.APP_WEATHER_API_KEY,
//   },
// };
