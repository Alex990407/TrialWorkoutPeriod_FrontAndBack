# Base Image
FROM node:20-alpine

# Working direktory 
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies 
RUN npm install

# Copy everithing else
COPY . .

# Build the Application
RUN npm run build

# Use nginx to serve static files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
