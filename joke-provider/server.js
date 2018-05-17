'use strict';

const express = require('express');
const rp = require('request-promise');
const app = express();

app.get('/joke', async (req, res) => {

  let joke;
  try {
    joke = await getNewJoke();
  } catch (e) {
    console.log(e);
    console.log('cant access to joke service');
    return res.json({error: e.message})
  }

  res.json({joke, host: `${process.env.HOSTNAME}`});

});

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Express server is running at: http://localhost:${PORT}`);
});


const getNewJoke = async () => {

  console.log(`joke server: '${process.env.JOKE_SERVICE_URL}'`);

  const res = await rp({
    uri: `${process.env.JOKE_SERVICE_URL}`,
    json: true
  });

  console.log(`got joke: ${JSON.stringify(res)}`);
  console.log(`joke value: ${res.value}`);

  return res.value;

};
