const pxToVW = require('postcss-px-to-viewport')

module.exports = {
  babel: {
    plugins: [['babel-plugin-styled-components']]
  },
  style: {
    postcss: {
      plugins: [
        new pxToVW({
          viewportWidth: 1920
        })
      ]
    }
  }
}
