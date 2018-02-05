const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { output } = require('./webpack.config');
const { scripts: { build } } = require('./package.json');

const port = process.env.PORT || 3000;

const app = express();

exec(build, () => {
  app
    .use(express.static(output.path))
    .get('/', (req, res) => res.sendFile(path.join(output.path, 'index.html')))
    .listen(port);
});
