# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app/backend
COPY . .        

# Install any needed packages specified in package.json
RUN npm install

# Make port 5000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NODE_ENV production

# Run node server.js when the container launches
CMD npm start
