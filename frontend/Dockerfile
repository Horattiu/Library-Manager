# Dockerfile-frontend

# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 5173

# Define environment variable
ENV REACT_APP_BACKEND_URL https://backend-librarymanager.onrender.com

# Run app when the container launches
CMD npm run dev
