'use strict';

const express = require('express');
const rp = require('request-promise');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', async (req, res) => {

  let jokeRes;
  try {
    jokeRes = await getNewJoke();
  } catch (e) {
    console.log(e);
    console.log('cant access to joke service');
    return res.json({error: e.message})
  }

  return res.json({
    joke: jokeRes.joke,
    bffHost: `${process.env.HOSTNAME}`,
    jokeHost: `${jokeRes.host}`
  });

});

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Express server is running at: http://localhost:${PORT}`);
});


const getNewJoke = async () => {

  const jokeGeneratorUrl = process.env.JOKE_GENERATOR;

  console.log(`joke server: '${jokeGeneratorUrl}'`);

  const res = await rp({
    uri: `${jokeGeneratorUrl}`,
    json: true
  });

  console.log(`got joke: ${JSON.stringify(res)}`);

  return res;

};
