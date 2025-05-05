# Base image
FROM node:20-alpine

# Working directory 
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

#  Copy everything els 
COPY . .

# Expose Port 
EXPOSE 5050

# Sturtup comand
CMD ["node", "server.js"]
