# API Typescript With Prisma and Postgres
FROM node:alpine

# Create app directory
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
# COPY tsconfig.json ./

# COPY
COPY . .

# Install app dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Run and expose the server on port 8080
EXPOSE 8080

# A command to start the server
CMD npm run dockstart