FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port (change to your backend port)
EXPOSE 5000

# Start command
CMD ["npm", "start"]
