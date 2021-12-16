const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const needle = require('needle');
const url = require('url');

app.prepare().then(() => {
  const API_BASE_URL = process.env.API_BASE_URL;
  const API_KEY_NAME = process.env.API_KEY_NAME;
  const API_KEY_VALUE = process.env.API_KEY_VALUE;

  const server = express();

  server.get('/api/:stat', async (req, res) => {
    try {
      const params = new URLSearchParams({
        ...url.parse(req.url, true).slashes,
        ...url.parse(req.url, true).query,
        [API_KEY_NAME]: API_KEY_VALUE,
      });
      const apiRes = await needle(
        'get',
        `${API_BASE_URL}/${req.params.stat}?${params}`
      );
      const data = apiRes.body;
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
