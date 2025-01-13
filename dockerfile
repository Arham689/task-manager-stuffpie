# Use the official Node.js Alpine image as a base
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on (this will be overridden in docker-compose)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]