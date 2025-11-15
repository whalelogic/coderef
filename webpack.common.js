const path = require('path');

module.exports = {
  entry: {
    // point webpack at the app source inside public/static
    app: './public/static/js/app.js',
  },
  output: {
    // emit into dist/, with static assets placed under dist/static
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'static/js/app.js',
  },
};
