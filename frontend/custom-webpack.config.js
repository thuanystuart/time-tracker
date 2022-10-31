const { EnvironmentPlugin } = require('webpack');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Export a configuration object
// See [Wepack's documentation](https://webpack.js.org/configuration/) for additional ideas of how to
// customize your build beyond what Angular provides.
module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'BACKEND_HOST',
      'BACKEND_PORT'
    ])
  ]
}
