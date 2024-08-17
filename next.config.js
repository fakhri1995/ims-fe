const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig } */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "id"],
    defaultLocale: "en",
  },
  rewrites: async () => [
    { source: "/advantages", destination: "/migwebsite/advantages" },
    { source: "/hardware", destination: "/migwebsite/hardware" },
    {
      source: "/hardware/:hardware_id",
      destination: "/migwebsite/hardware/[hardware_id]",
    },
    {
      source: "/freeconsultation",
      destination: "/migwebsite/freeconsultation",
    },
    { source: "/software", destination: "/migwebsite/software" },
    { source: "/talents", destination: "/migwebsite/talents" },
    { source: "/aboutus", destination: "/migwebsite/aboutus" },
    { source: "/joinourteam", destination: "/migwebsite/joinourteam" },
    {
      source: "/joinourteam/:job_slug",
      destination: "/migwebsite/joinourteam/[job_slug]",
    },
    { source: "/blog", destination: "/migwebsite/blog" },
    {
      source: "/migwebsite/blog/:blog_id",
      destination: "/migwebsite/blog/[blog_id]",
    },
    { source: "/customerstories", destination: "/migwebsite/customerstories" },
    {
      source: "/migwebsite/customerstories/:stories_id",
      destination: "/migwebsite/customerstories/[stories_id]",
    },
    { source: "/sitemap", destination: "/migwebsite/sitemap" },
    { source: "/term", destination: "/migwebsite/termofuse" },
    { source: "/privacy", destination: "/migwebsite/privacy" },
    { source: "/contactus", destination: "/migwebsite/contactus" },
    { source: "/dashboard/clients", destination: "/company/clients" },

    {
      source: "/admin/recruitment/talent-pool/:talent_id",
      destination: "/admin/recruitment/talent-pool/:talent_id",
    },

    {
      source: "/admin/recruitment/:recruitment_id/:resume_id",
      destination: "/admin/candidates/:resume_id",
    },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
