FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application code
COPY . .

# Expose the port your app uses
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
