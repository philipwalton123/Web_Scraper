# syntax=docker/dockerfile:1

FROM node:18.9.0

ENV NODE_ENV=production

# Specify the working directory INSIDE the container
WORKDIR /filmscrape_be

# Move the package.json and package-lock.json into the container to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the node server
CMD ["npm", "start"]