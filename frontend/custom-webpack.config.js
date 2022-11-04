const { DefinePlugin } = require('webpack');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Export a configuration object
// See [Wepack's documentation](https://webpack.js.org/configuration/) for additional ideas of how to
// customize your build beyond what Angular provides.
module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env.BACKEND_HOST': JSON.stringify(process.env.BACKEND_HOST),
      'process.env.BACKEND_PORT': JSON.stringify(process.env.FLASK_RUN_PORT),
    })
  ]
}
