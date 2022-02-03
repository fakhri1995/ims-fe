const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig } */
const nextConfig = {
  rewrites: async () => [
    { source: "/advantages", destination: "/migwebsite/advantages" },
    { source: "/hardware", destination: "/migwebsite/hardware" },
    { source: "/software", destination: "/migwebsite/software" },
    { source: "/talents", destination: "/migwebsite/talents" },
    { source: "/aboutus", destination: "/migwebsite/aboutus" },
    { source: "/joinourteam", destination: "/migwebsite/joinourteam" },
    { source: "/sitemap", destination: "/migwebsite/sitemap" },
    { source: "/term", destination: "/migwebsite/termofuse" },
    { source: "/privacy", destination: "/migwebsite/privacy" },
    { source: "/contactus", destination: "/migwebsite/contactus" },
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
