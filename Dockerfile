#   ____                                 ____         __ _
#  |  _ \ ___   __ _ _ __ ___   ___ _ __/ ___|  ___  / _| |_
#  | |_) / _ \ / _` | '_ ` _ \ / _ \ '__\___ \ / _ \| |_| __|
#  |  _ < (_) | (_| | | | | | |  __/ |   ___) | (_) |  _| |_
#  |_| \_\___/ \__,_|_| |_| |_|\___|_|  |____/ \___/|_|  \__|
#  ---------------------------------------------------------------
#  Backend App - NestJS - Multi-Stage Build
#  ---------------------------------------------------------------

# Stage 1: Build an NestJS Docker Image
FROM node:alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build NestJS app
RUN npm run build
#  ---------------------------------------------------------------

# Stage 2: Use only the compiled app for production
FROM node:alpine as production

# Set Node variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ormconfig.json ./
RUN npm install --only=production

# Copy only the needed files from the build
COPY --from=build /usr/src/app/dist ./dist

# Start server
CMD ["node", "dist/main"]
