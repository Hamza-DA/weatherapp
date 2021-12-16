import Document, { Html, Head, Main, NextScript } from 'next/document';

class myDoc extends Document {
  render() {
    return (
      <>
        <Html>
          <Head>
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link
              rel='preconnect'
              href='https://fonts.gstatic.com'
              crossOrigin
            />
            {/* <link
              href='https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;700;800&display=swap'
              rel='stylesheet'
            /> */}
          </Head>
          <body className='blue-bg bg-no-repeat min-h-screen'>
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}

export default myDoc;
