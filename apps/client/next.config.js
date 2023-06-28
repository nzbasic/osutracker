/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
    esmExternals: 'loose'
  },
  transpilePackages: ["ui"],
  reactStrictMode: true,
  images: {
    domains: ["s.ppy.sh", "flagpictures.imgix.net", "a.ppy.sh"],
  },
  modularizeImports: {
    'react-icons': {
			transform: 'react-icons/{{member}}',
		},
    lodash: {
			transform: 'lodash/{{member}}',
		},
  }
};
