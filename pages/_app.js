import '../styles/globals.css';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta
          name='description'
          content='Weather App, created using express.js, nexts.js, openWeather API, tailwindCSS'
        />
        <link rel='icon' href='/favicon.jpg' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700;800&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
