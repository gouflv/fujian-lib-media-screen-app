const pxToVW = require('postcss-px-to-viewport')

module.exports = {
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

