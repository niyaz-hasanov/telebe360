# Dockerfile for serving a pre-built Next.js app using the default `.next` folder

# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the entire Next.js app including the `.next` folder
COPY . .

# Build the Next.js app to create the `.next` folder
RUN npm run build

# Expose the port that Next.js server listens to
EXPOSE 3000

# Use Next.js' own server for the built app
CMD ["npm", "run", "start"]
