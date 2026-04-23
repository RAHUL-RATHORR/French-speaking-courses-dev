module.exports = {
  apps: [
    {
      name: "french-skills",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1, // Changed from 'max' to 1 to prevent DB connection exhaustion
      autorestart: true,
      watch: false, // Disabled watch in production
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ],

  // Optional deployment configuration
  // deploy: {
  //   production: {
  //     user: "username",
  //     host: "your-server-ip",
  //     ref: "origin/main",
  //     repo: "git@github.com:yourusername/upi-fraud-solution.git",
  //     path: "/var/www/upi-fraud-solution",
  //     "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.js --env production"
  //   }
  // }
};
