// next.config.js
module.exports = {
  async rewrites() {
    return [
      { source: '/advantages', destination: '/migwebsite/advantages' },
      { source: '/hardware', destination: '/migwebsite/hardware' },
    ]
  }
}
