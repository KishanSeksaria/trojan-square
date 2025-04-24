import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    'api/**': ['./local_models/all-MiniLM-L6-v2/**']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.externals)) {
        config.externals = [
          ...config.externals,
          { 'onnxruntime-node': 'commonjs onnxruntime-node' }
        ]
      } else {
        config.externals = ['onnxruntime-node']
      }
    }
    return config
  }
}

export default nextConfig
