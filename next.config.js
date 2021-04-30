// next.config.js
module.exports = {
  async rewrites() {
    return [
      { source: '/advantages', destination: '/migwebsite/advantages' },
      { source: '/hardware', destination: '/migwebsite/hardware' },
      { source: '/software', destination: '/migwebsite/software' },
      { source: '/people', destination: '/migwebsite/people' },
      { source: '/aboutus', destination: '/migwebsite/aboutus' },
    ]
  }
}
