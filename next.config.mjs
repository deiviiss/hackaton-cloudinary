/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'cdn-icons-png.flaticon.com',
			},
      {
        hostname: 'res.cloudinary.com',
      }
		],
	},
}

export default nextConfig
