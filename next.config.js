// next.config.js
module.exports = {
  async rewrites() {
    return [
      { source: '/advantages', destination: '/migwebsite/advantages' },
      { source: '/hardware', destination: '/migwebsite/hardware' },
      { source: '/software', destination: '/migwebsite/software' },
      { source: '/talents', destination: '/migwebsite/talents' },
      { source: '/aboutus', destination: '/migwebsite/aboutus' },
      { source: '/joinourteam', destination: '/migwebsite/joinourteam' }, 
      { source: '/sitemap', destination: '/migwebsite/sitemap' }, 
      { source: '/term', destination: '/migwebsite/termofuse' }, 
      { source: '/privacy', destination: '/migwebsite/privacy' }, 
      { source: '/contactus', destination: '/migwebsite/contactus' }, 
    ]
  }
}
